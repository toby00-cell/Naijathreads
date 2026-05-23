# Naija Threads — Backend API

Express + MongoDB + Mongoose + JWT + Cloudinary.

## 1. Requirements
- Node.js 20+
- A MongoDB connection string (free tier on MongoDB Atlas works)
- A Cloudinary account (free tier is fine) for product image uploads

## 2. Install
```bash
cd backend
npm install
cp .env.example .env
# then open .env and fill in MONGODB_URI, JWT_SECRET, CLOUDINARY_*, ADMIN_*
```

## 3. Seed the database (creates admin + 50 products)
```bash
npm run seed
```
The admin email/password printed by the seed script are the credentials you'll use to log into `/admin` on the frontend.

## 4. Run
```bash
npm run dev   # http://localhost:4000
```

## 5. Point the frontend at it
In the **frontend** project root (one level above this folder), create `.env.local`:
```
VITE_API_URL=http://localhost:4000
```
Restart the frontend dev server. Sign in at `/account` with the admin credentials, then visit `/admin` to manage products.

## API summary

### Auth — `/api/auth`
| Method | Path        | Body                                | Auth |
|--------|-------------|-------------------------------------|------|
| POST   | `/register` | `{ name, email, password }`         | —    |
| POST   | `/login`    | `{ email, password }`               | —    |
| GET    | `/me`       | —                                   | Bearer |

### Products — `/api/products`
| Method | Path             | Notes                                                       | Auth        |
|--------|------------------|-------------------------------------------------------------|-------------|
| GET    | `/`              | Query: `q, category, min, max, sort, page, limit`           | —           |
| GET    | `/:id`           |                                                             | —           |
| GET    | `/slug/:slug`    |                                                             | —           |
| POST   | `/`              | JSON product body (image url required)                      | Admin       |
| PATCH  | `/:id`           | Partial product body                                        | Admin       |
| DELETE | `/:id`           | Also deletes Cloudinary image                               | Admin       |
| POST   | `/:id/image`     | `multipart/form-data` field `image`                         | Admin       |

### Uploads — `/api/uploads`
| Method | Path     | Body                                | Auth  |
|--------|----------|-------------------------------------|-------|
| POST   | `/image` | `multipart/form-data` field `image` | Admin |

## Deployment hints
- The API is plain Node and runs anywhere (Render, Railway, Fly.io, a VPS, etc.).
- Set `CLIENT_ORIGIN` to your frontend's deployed origin (comma-separate multiple).
- Use a strong `JWT_SECRET` in production.
- Use a managed MongoDB (Atlas) — local Mongo is for development only.
