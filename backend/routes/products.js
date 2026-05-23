import { Router } from 'express';
import { z } from 'zod';
import Product, { CATEGORY_LIST } from '../models/Product.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
import { uploadSingleImage } from '../middleware/upload.js';
import { uploadBufferToCloudinary, deleteFromCloudinary } from '../utils/cloudinary-upload.js';

const router = Router();

const productSchema = z.object({
  slug: z.string().trim().min(2).max(120).regex(/^[a-z0-9-]+$/),
  name: z.string().trim().min(1).max(200),
  category: z.enum(CATEGORY_LIST),
  price: z.coerce.number().min(0),
  originalPrice: z.coerce.number().min(0).optional().nullable(),
  image: z.string().url().optional(),
  brand: z.string().max(120).optional(),
  sizes: z.array(z.string().max(40)).max(40).optional(),
  colors: z.array(z.string().max(40)).max(40).optional(),
  description: z.string().max(4000).optional(),
  isNew: z.coerce.boolean().optional(),
  stock: z.coerce.number().int().min(0).optional(),
});

// ---------- Public ----------
router.get('/', async (req, res, next) => {
  try {
    const { q, category, min, max, sort = 'newest', limit = '60', page = '1' } = req.query;
    const filter = {};
    if (category && CATEGORY_LIST.includes(category)) filter.category = category;
    if (min || max) filter.price = { ...(min && { $gte: Number(min) }), ...(max && { $lte: Number(max) }) };
    if (q) filter.$text = { $search: String(q) };

    const sortMap = { newest: { createdAt: -1 }, priceAsc: { price: 1 }, priceDesc: { price: -1 } };
    const lim = Math.min(Number(limit) || 60, 200);
    const skip = Math.max(0, (Number(page) - 1) * lim);

    const [items, total] = await Promise.all([
      Product.find(filter).sort(sortMap[sort] ?? sortMap.newest).skip(skip).limit(lim),
      Product.countDocuments(filter),
    ]);
    res.json({ items, total, page: Number(page), limit: lim });
  } catch (e) { next(e); }
});

router.get('/slug/:slug', async (req, res, next) => {
  try {
    const p = await Product.findOne({ slug: req.params.slug });
    if (!p) return res.status(404).json({ error: 'Product not found' });
    res.json(p);
  } catch (e) { next(e); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ error: 'Product not found' });
    res.json(p);
  } catch (e) { next(e); }
});

// ---------- Admin ----------
router.post('/', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const data = productSchema.parse(req.body);
    if (!data.image) return res.status(400).json({ error: 'image URL is required (upload first via /api/uploads)' });
    const p = await Product.create(data);
    res.status(201).json(p);
  } catch (e) { next(e); }
});

router.patch('/:id', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const data = productSchema.partial().parse(req.body);
    const p = await Product.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!p) return res.status(404).json({ error: 'Product not found' });
    res.json(p);
  } catch (e) { next(e); }
});

router.delete('/:id', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const p = await Product.findByIdAndDelete(req.params.id);
    if (!p) return res.status(404).json({ error: 'Product not found' });
    await deleteFromCloudinary(p.imagePublicId);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

// Admin-only image upload that also patches a product when ?productId is provided
router.post('/:id/image', requireAuth, requireAdmin, (req, res, next) => {
  uploadSingleImage(req, res, async (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ error: 'Product not found' });
      const result = await uploadBufferToCloudinary(req.file.buffer);
      await deleteFromCloudinary(product.imagePublicId);
      product.image = result.secure_url;
      product.imagePublicId = result.public_id;
      await product.save();
      res.json(product);
    } catch (e) { next(e); }
  });
});

export default router;