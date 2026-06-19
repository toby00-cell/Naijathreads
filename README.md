# Naija Threads 🇳🇬

A full-stack e-commerce platform for Nigerian fashion — shirts, trousers, shoes, headwears, and underwear. Built with a modern TypeScript stack and deployed on Cloudflare Workers + Render + MongoDB Atlas.

**Live site:** [naijathreads.name.ng](https://naijathreads.name.ng)

<img width="1440" height="900" alt="Screenshot 2026-06-19 at 23 25 36" src="https://github.com/user-attachments/assets/990d7dde-cf81-482e-b1f0-e46a5823f042" />

---

## Features

### Customer-facing
- Product catalog with search, category filters, price range, and size filters
- Product detail pages with multi-image gallery
- Cart with persistent local storage
- Checkout with **Paystack** payment integration
- User authentication (sign up, sign in, sign out)
- Email verification on signup
- Order history on account page
- Order confirmation emails
- Static info pages: Shipping & Delivery, Returns & Exchanges, Size Guide, Contact Us
- Privacy Policy & Terms and Conditions
- Cookie notice banner

### Admin
- Secure admin-only dashboard (role-based access)
- Full product CRUD (create, read, update, delete)
- Multiple product image uploads (up to 5 per product) via Cloudinary
- Order management — view all orders, update order status (Processing → Shipped → Delivered)
- New order email alerts

---

## Tech Stack

### Frontend
| Tool | Purpose |
|---|---|
| **TypeScript** | Type-safe development |
| **React 19** | UI library |
| **TanStack Start** | Full-stack React framework with file-based routing and SSR |
| **TanStack Router** | Type-safe routing |
| **TanStack Query** | Server state management and caching |
| **Tailwind CSS v4** | Utility-first styling |
| **Zod** | Schema validation |
| **Radix UI** | Accessible UI primitives |
| **Lucide React** | Icon library |

### Backend
| Tool | Purpose |
|---|---|
| **Node.js / Express** | REST API server |
| **MongoDB Atlas** | Database (via Mongoose ODM) |
| **JWT** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **Zod** | Request validation |
| **Cloudinary** | Image hosting and optimization |
| **Resend** | Transactional email (order confirmations, admin alerts, email verification) |
| **Paystack** | Payment processing |

### Infrastructure
| Service | Purpose |
|---|---|
| **Cloudflare Workers** | Frontend hosting (SSR) |
| **Render** | Backend API hosting |
| **MongoDB Atlas** | Database hosting |
| **QServers** | Domain registrar (naijathreads.name.ng) |

---

## Project Structure

```
naijathreads/
├── src/                      # Frontend (TanStack Start)
│   ├── routes/                # File-based routes
│   │   ├── index.tsx
│   │   ├── shop.tsx
│   │   ├── product.$id.tsx
│   │   ├── cart.tsx
│   │   ├── checkout.tsx
│   │   ├── account.tsx
│   │   ├── admin.tsx
│   │   ├── shipping.tsx
│   │   ├── returns.tsx
│   │   ├── size-guide.tsx
│   │   ├── contact.tsx
│   │   ├── privacy.tsx
│   │   ├── terms.tsx
│   │   ├── verify-email.tsx
│   │   └── __root.tsx
│   ├── components/             # Reusable UI components
│   │   ├── SiteHeader.tsx
│   │   ├── SiteFooter.tsx
│   │   ├── ProductCard.tsx
│   │   └── CookieBanner.tsx
│   ├── context/                # React context providers
│   │   ├── auth.tsx
│   │   └── cart.tsx
│   ├── hooks/
│   │   └── useProducts.ts
│   ├── services/                # API client layer
│   │   ├── api.ts
│   │   ├── auth.api.ts
│   │   ├── products.api.ts
│   │   └── orders.api.ts
│   ├── data/
│   │   └── products.ts          # Static fallback product data
│   └── server.ts                # SSR entry point
│
├── backend/                   # Backend (Express API)
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   └── uploads.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── upload.js
│   │   └── error.js
│   ├── utils/
│   │   ├── email.js
│   │   └── cloudinary-upload.js
│   ├── config/
│   │   └── db.js
│   └── server.js
│
├── wrangler.jsonc              # Cloudflare Workers config
├── vite.config.ts
└── package.json
```

---

## Environment Variables

### Frontend (`.env.local`)
```env
VITE_API_URL=https://naijathreads-backend.onrender.com
VITE_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
```

### Backend (Render → Environment)
```env
PORT=4000
CLIENT_ORIGIN=https://naijathreads.name.ng,https://tanstack-start-app.naijathreads.workers.dev
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/naijathreads
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
RESEND_API_KEY=re_xxxxxxxxxxxxx
ADMIN_EMAIL=admin@naijathreads.name.ng
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxx
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB Atlas cluster
- Cloudinary account
- Resend account (with a verified sending domain)
- Paystack account

### Backend setup

```bash
cd backend
npm install
# create a .env file with the variables listed above
npm run dev
```

Backend runs on `http://localhost:4000`.

### Frontend setup

```bash
npm install
# create a .env.local file with the variables listed above
npm run dev
```

Frontend runs on `http://localhost:3000` (or the port Vite assigns).

---

## Deployment

### Frontend → Cloudflare Workers

```bash
npm run build
npx wrangler deploy --config dist/server/wrangler.json
```

### Backend → Render

Push to the connected GitHub repository — Render auto-deploys on every push to `main`.

```bash
git add .
git commit -m "your message"
git push
```

### Domain

`naijathreads.name.ng` is registered via QServers and DNS-managed through Cloudflare. The custom domain is connected directly to the Cloudflare Worker under **Workers & Pages → Domains & Routes**.

---

## API Overview

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Create a new account | — |
| POST | `/api/auth/login` | Sign in | — |
| GET | `/api/auth/me` | Get current user | ✅ |
| GET | `/api/auth/verify-email` | Verify email via token | — |
| GET | `/api/products` | List products (filters, search, pagination) | — |
| GET | `/api/products/:id` | Get single product | — |
| POST | `/api/products` | Create product | ✅ Admin |
| PATCH | `/api/products/:id` | Update product | ✅ Admin |
| DELETE | `/api/products/:id` | Delete product | ✅ Admin |
| POST | `/api/products/:id/image` | Replace main image | ✅ Admin |
| POST | `/api/products/:id/images` | Add additional image | ✅ Admin |
| DELETE | `/api/products/:id/images/:index` | Delete additional image | ✅ Admin |
| POST | `/api/orders` | Create order (triggers emails) | — |
| GET | `/api/orders/my` | Get logged-in user's orders | ✅ |
| GET | `/api/orders` | Get all orders | ✅ Admin |
| PATCH | `/api/orders/:id/status` | Update order status | ✅ Admin |
| GET | `/api/orders/verify/:reference` | Verify Paystack transaction | — |

---

## Admin Access

To create an admin account, manually set `role: "admin"` on a user document in MongoDB Atlas, or seed one via a one-time script during initial setup.

Admin dashboard is available at `/admin` once logged in with an admin account.

---

## Known Limitations / Roadmap

- [ ] Category pages (`/shirts`, `/trousers`, etc.) still use static fallback data — needs migration to live API
- [ ] Render free tier spins down after inactivity, causing a ~50s delay on first request after idle
- [ ] No automated tests yet
- [ ] No image optimization/lazy-loading beyond browser defaults

---

## Author

Built by **Bright Joel** — Software Developer.

Portfolio: [tobijoel.com.ng](https://tobijoel.com.ng)
