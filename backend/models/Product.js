import mongoose from 'mongoose';

const CATEGORIES = ['shirts', 'trousers', 'shoes', 'headwears', 'underwear'];

const productSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 200 },
  category: { type: String, enum: CATEGORIES, required: true, index: true },
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number, min: 0, default: null },
  image: { type: String, required: true },
  imagePublicId: { type: String, default: null },
  images: { type: [String], default: [] },          // additional images
  imagePublicIds: { type: [String], default: [] },   // for Cloudinary cleanup
  brand: { type: String, default: 'Naija Threads', maxlength: 120 },
  sizes: { type: [String], default: [] },
  colors: { type: [String], default: [] },
  description: { type: String, default: '', maxlength: 4000 },
  isNew: { type: Boolean, default: false },
  stock: { type: Number, default: 100, min: 0 },
}, { timestamps: true });

productSchema.index({ name: 'text', description: 'text', brand: 'text' });
productSchema.virtual('id').get(function () { return this._id.toString(); });
productSchema.set('toJSON', { virtuals: true, versionKey: false, transform: (_d, ret) => { delete ret._id; delete ret.imagePublicId; delete ret.imagePublicIds; return ret; } });

export const CATEGORY_LIST = CATEGORIES;
export default mongoose.model('Product', productSchema);