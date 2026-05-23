import mongoose from 'mongoose';

export async function connectDB(uri) {
  try {
    if (!uri) throw new Error('MONGODB_URI is not set');

    mongoose.set('strictQuery', true);

    await mongoose.connect(uri);

    console.log('[db] connected');
  } catch (err) {
    console.error('[db error]', err);
    process.exit(1);
  }
}