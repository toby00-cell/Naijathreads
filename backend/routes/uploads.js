import { Router } from 'express';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
import { uploadSingleImage } from '../middleware/upload.js';
import { uploadBufferToCloudinary } from '../utils/cloudinary-upload.js';

const router = Router();

// Generic upload — returns { url, publicId }. Used by the admin "new product" form
// before the product row exists.
router.post('/image', requireAuth, requireAdmin, (req, res, next) => {
  uploadSingleImage(req, res, async (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
    try {
      const result = await uploadBufferToCloudinary(req.file.buffer);
      res.json({ url: result.secure_url, publicId: result.public_id });
    } catch (e) { next(e); }
  });
});

export default router;