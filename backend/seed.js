import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDB } from './config/db.js';
import User from './models/User.js';
import Product from './models/Product.js';
import { SEED_PRODUCTS } from './seed-data.js';

async function main() {
  await connectDB(process.env.MONGODB_URI);

  // --- Admin ---
  const email = (process.env.ADMIN_EMAIL || 'admin@naijathreads.ng').toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
  let admin = await User.findOne({ email });
  if (!admin) {
    admin = await User.create({
      name: process.env.ADMIN_NAME || 'Store Admin',
      email,
      passwordHash: await bcrypt.hash(password, 10),
      role: 'admin',
    });
    console.log(`[seed] admin created  →  ${email}  /  ${password}`);
  } else {
    if (admin.role !== 'admin') { admin.role = 'admin'; await admin.save(); }
    console.log(`[seed] admin already exists  →  ${email}`);
  }

  // --- Products ---
  const existing = await Product.countDocuments();
  if (existing > 0) {
    console.log(`[seed] ${existing} products already in DB — skipping product seed`);
  } else {
    await Product.insertMany(SEED_PRODUCTS);
    console.log(`[seed] inserted ${SEED_PRODUCTS.length} products`);
  }

  await import('mongoose').then((m) => m.default.connection.close());
  console.log('[seed] done');
}

main().catch((e) => { console.error(e); process.exit(1); });