import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import uploadRoutes from './routes/uploads.js';
import { errorHandler, notFound } from './middleware/error.js';

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(',') ?? '*', credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.use('/api/', rateLimit({ windowMs: 60_000, max: 200, standardHeaders: true }));

app.get('/api/health', (_req, res) => res.json({ ok: true, time: new Date().toISOString() }));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/uploads', uploadRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
connectDB(process.env.MONGODB_URI).then(() => {
  app.listen(PORT, () => console.log(`[api] listening on http://localhost:${PORT}`));
}).catch((e) => {
  console.error('[api] failed to start', e);
  process.exit(1);
});