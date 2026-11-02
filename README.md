# 10X Shop

**Live demo:** https://10x-shop-zazabaramidze.vercel.app

## About

10X Shop is a single-page online store built with React, TypeScript and Tailwind CSS. Products come from the public [DummyJSON](https://dummyjson.com) API. Login and checkout are local simulations: there is no real authentication, no backend and no payment.

## Features

**CORE (all implemented)**

- Catalog: products loaded from DummyJSON with loading, error and empty states, shown in a responsive grid (1 / 2 / 3 columns).
- Product page (`/products/:id`): image, description, discounted price, rating, remaining stock, quantity selector and Add to cart. Invalid or unknown IDs show the 404 page.
- Cart: change quantity (limited by stock), remove an item, clear the cart, subtotal. The cart is shared through React Context (Header icon badge and Cart page stay in sync) and persisted in `localStorage` (`shop_cart`).
- Login (local simulation): controlled form with validation, state in `AuthContext`, username persisted in `localStorage` (`shop_user`).
- Checkout: guests are redirected to `/login` and returned to `/checkout` after login. Controlled form (Full name, Email, Address, City) with validation, order summary, local order confirmation ("Thank you!") and cart reset.
- Responsive layout (checked at 375px and on desktop), burger menu on small screens, hover / focus / disabled states, semantic HTML and accessible labels.
- Error Boundary and a 404 page.

**FULL (implemented extras)**

- Route-level code splitting with `React.lazy` and `Suspense`.
- Dark / light theme (Tailwind v4 colour variables), saved in `localStorage` (`shop_theme`).
- Lighthouse before / after reports in [`docs/lighthouse`](docs/lighthouse).

Not implemented (FULL): search, filtering, sorting, pagination, Orders, Profile, Reviews, Related products, promo codes, Formik + Yup.

## Tech Stack

React 19 · TypeScript (`strict`, no `any`) · Vite · React Router 7 · Tailwind CSS v4 · ESLint (typescript-eslint, react-hooks) · DummyJSON API · Vercel.

## Architecture

```
src/
  api/          ApiError, products.api.ts (fetch wrapper for DummyJSON)
  types/        Product, CartItem, AuthUser, ShippingInfo, OrderSummary, FormErrors
  utils/        formatPrice, discountedPrice, cart totals, form validation
  context/      AuthContext + AuthProvider, CartContext + CartProvider
  hooks/        useAuth, useCart, useTheme
  components/   Header, ProductCard, Button, FormField, ProtectedRoute, ErrorBoundary, ScrollToTop
  layouts/      BaseLayout (Header + Outlet + Footer)
  pages/        Catalog, Product, Cart, Login, Checkout, OrderConfirmation, NotFound
```

Data flow: a user action (for example *Add to cart*) calls a function exposed by a Context provider, the provider updates its state immutably with `useState`, and React re-renders every component that reads that context (Header badge, Cart page, product stock). Data from the API is loaded in `useEffect` and rendered through explicit loading, error, empty and success states. Pages are loaded lazily, and `/checkout` and `/order-confirmation` are wrapped in `ProtectedRoute`.

## How to Run

Requires Node.js 22 LTS (or 20.19+).

```bash
git clone https://github.com/zazabaramidze3-afk/10x-shop-zazabaramidze.git
cd 10x-shop-zazabaramidze
npm install
cp .env.example .env     # sets VITE_API_BASE_URL=https://dummyjson.com
npm run dev
```

Open http://localhost:5173.

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and create the production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | TypeScript check (0 errors required) |
| `npm run lint` | ESLint |

## Test Account

Login is a local simulation, so there is no real account. Use any non-empty username and any password with at least 6 characters (for example `emilys` / `emilyspass`). Nothing is sent to a server.

## Deployment

Deployed on Vercel. `vercel.json` rewrites every path to `index.html`, so direct links and refreshes such as `/products/5` work. The environment variable `VITE_API_BASE_URL` is set in the Vercel project settings.

## Documentation

- [PLAN.md](PLAN.md): plan, WBS, milestones and risks
- [REPORT.md](REPORT.md): planned vs delivered, metrics and lessons
- [DEBUG-LOG.md](DEBUG-LOG.md): real bugs found and how they were fixed
- [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md): chunk-by-chunk implementation plan

## Limitations

- Login and checkout are simulations; credentials are not verified and orders are not stored.
- Only the first 12 products are shown (pagination is a FULL feature).
- The app has no automated tests.

## Credits

Built by Zaza Baramidze as the 10X Front-end graduation project. An AI assistant (Claude) was used as a coach: it proposed the plan, explained concepts and reviewed code, and the code was typed, run, tested and committed by the author.
