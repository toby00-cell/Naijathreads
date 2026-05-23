import streamifier from 'streamifier';
import cloudinary from '../config/cloudinary.js';

export function uploadBufferToCloudinary(buffer, folder = 'naija-threads/products') {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (err, result) => (err ? reject(err) : resolve(result)),
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
}

export async function deleteFromCloudinary(publicId) {
  if (!publicId) return;
  try { await cloudinary.uploader.destroy(publicId); } catch (e) { console.warn('[cloudinary] destroy failed', e.message); }
}