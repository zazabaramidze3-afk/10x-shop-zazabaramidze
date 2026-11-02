# Project Report: 10X Shop

**Live:** https://10x-shop-zazabaramidze.vercel.app · **Repo:** https://github.com/zazabaramidze3-afk/10x-shop-zazabaramidze

## 1. Planned vs delivered

### CORE (all delivered)

| Area | Requirement | Status |
|---|---|---|
| Setup | Vite + React + TypeScript strict + Tailwind v4, scripts `dev` / `build` / `preview` / `typecheck` / `lint` | ✅ |
| Types | `Product`, `ProductsResponse`, `CartItem`, `AuthUser`, `ShippingInfo`, `OrderSummary` | ✅ |
| Routing | `/`, `/login`, `/products/:id`, `/cart`, `/checkout`, `*`, shared layout | ✅ |
| Auth | `AuthContext` login / logout, controlled Login form with validation | ✅ |
| Checkout guard | Guest → `/login` → back to `/checkout` | ✅ |
| Catalog | `GET /products`, loading / error / empty states, `ProductCard`, responsive grid | ✅ |
| Product page | `useParams`, details, 404 for unknown IDs, quantity selector, Add to cart | ✅ |
| Cart | `CartContext`, add / update / remove / clear, immutable updates, subtotal, empty state, Header badge | ✅ |
| Checkout | Controlled form (4 fields), validation, order summary, local confirmation, cart reset | ✅ |
| Responsive | Works at 375px and desktop, burger menu, no horizontal scroll | ✅ |
| States | hover / focus / disabled, loading / error / empty | ✅ |
| Error Boundary | Fallback screen | ✅ |
| Deploy | Vercel, SPA rewrite, `/products/5` refresh works | ✅ |
| Docs | README (EN), PLAN.md, REPORT.md, DEBUG-LOG.md (5 bugs), Git history | ✅ |

### FULL (partly delivered)

| Item | Status |
|---|---|
| Route-level lazy loading (`React.lazy` + `Suspense`) | ✅ |
| Lighthouse before / after | ✅ (`docs/lighthouse`) |
| Dark mode (Tailwind v4 colour variables) | ✅ |
| `localStorage` persistence for cart, user and theme | ✅ |
| Search, filter, sort, pagination, URL state | ❌ not done |
| Orders, Profile, Reviews, Related products, promo code | ❌ not done |
| Formik + Yup, reducer, generics / OOP classes, `@theme` tokens | ❌ not done |

Why not: the work started in week 2 and the priority was to finish CORE, deploy and document first; the remaining FULL items were left out because I would not be able to explain them well enough at the defence.

## 2. Metrics

| Metric | Value |
|---|---|
| Commits | 69 (Conventional Commits) on 8 different days (25 Oct – 2 Nov) |
| Pages | 7 (Catalog, Product, Cart, Login, Checkout, Order confirmation, 404) |
| TypeScript | `strict`, `no-explicit-any`; `npm run typecheck` and `npm run lint` pass |
| Bugs documented | 5 (see DEBUG-LOG.md) |

### Lighthouse (Mobile)

| Metric | Before (`localhost:5173`, dev server) | After (live on Vercel) |
|---|---|---|
| Performance | 48 (38 in an earlier run) | **94** |
| Accessibility | 95 | 95 |
| Best Practices | 96 | 96 |
| SEO | 92 | 92 |
| First Contentful Paint | 15.7 s | 1.3 s |
| Largest Contentful Paint | 30.7 s | 2.7 s |
| Total Blocking Time | 280 ms | 80 ms |
| Cumulative Layout Shift | 0.084 | 0.084 |

What changed: the "before" run was the unminified Vite dev server. The production build (77 on `localhost:4173`), lazy routes, lazy-loaded product images and the Vercel CDN gave the "after" result. The SEO score rose from 83 to 92 after adding a meta description. Screenshots: `docs/lighthouse/before.png` and `after.png`.

## 3. Three hardest problems

1. **Understanding how state flows between files.** Auth and cart state live in Context providers, hooks expose them, and pages only read and call functions. I solved it by drawing the chain *user action → context function → state change → re-render* and testing it with the Header badge and the stock text.
2. **Stock logic across pages.** The product page, product card and cart all had to agree on how many pieces are still available (bug 2 in DEBUG-LOG.md). The fix was one helper (`getQuantityInCart`) used everywhere.
3. **Guest checkout redirect.** A guest must be sent to `/login` and then return to `/checkout`. I used `Navigate` with `state={{ from: location }}` in `ProtectedRoute` and read it in `LoginPage`. The empty-cart redirect on checkout had to ignore the moment when the cart is cleared by the order itself.

## 4. What I would do differently

- Start the Git history and the deploy earlier (first deploy in week 3, not week 1), and check the SPA rewrite from the start.
- Write a short test for the validation functions and the cart helpers.
- Add a `useFetch` hook early: `CatalogPage` and `ProductPage` repeat the same loading / error pattern.
- Plan FULL items (search / sort) from the beginning so the Catalog structure leaves room for them.

## 5. AI usage summary

An AI assistant (Claude) was used as a coach and reviewer: it read the PRD, proposed the implementation plan and chunk order, explained React / TypeScript / Tailwind concepts, reviewed code and found PRD mismatches. I typed and committed the code, ran it in the browser, reported bugs with screenshots, and made the decisions (for example, keeping the simple manual Login form instead of Formik + Yup, and simplifying the `localStorage` login code). Some suggestions were rejected or simplified because they were too complicated to explain.
