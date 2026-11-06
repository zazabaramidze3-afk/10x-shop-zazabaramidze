# Project Report: 10X Shop

**Live:** https://10x-shop-zazabaramidze.vercel.app · **Repo:** https://github.com/zazabaramidze3-afk/10x-shop-zazabaramidze

## 1. Planned vs delivered

### CORE (all delivered)

| Area | Requirement | Status |
|---|---|---|
| Setup | Vite + React + TypeScript strict + Tailwind v4, scripts `dev` / `build` / `preview` / `typecheck` / `lint` | ✅ |
| Types | `Product`, `ProductsResponse`, `CartItem`, `AuthUser`, `ShippingInfo`, `OrderSummary` | ✅ |
| Routing | `/`, `/login`, `/products/:id`, `/cart`, `/checkout`, `*`, shared layout | ✅ |
| Auth | `AuthContext` login / logout, Login form with validation | ✅ |
| Checkout guard | Guest → `/login` → back to `/checkout` | ✅ |
| Catalog | `GET /products`, loading / error / empty states, `ProductCard`, responsive grid | ✅ |
| Product page | `useParams`, details, 404 for unknown IDs, quantity selector, Add to cart | ✅ |
| Cart | `CartContext`, add / update / remove / clear, immutable updates, subtotal, empty state, Header badge | ✅ |
| Checkout | Controlled form (4 fields), validation, order summary, local confirmation, cart reset | ✅ |
| Responsive | Works at 360px, 375px and desktop, side drawer menu, no horizontal scroll | ✅ |
| States | hover / focus / disabled, loading / error / empty | ✅ |
| Error Boundary | Fallback screen | ✅ |
| Deploy | Vercel, SPA rewrite, `/products/5` refresh works | ✅ |
| Docs | README (EN), PLAN.md, REPORT.md, DEBUG-LOG.md (5 bugs), Git history | ✅ |

### FULL (mostly delivered)

| Item | Status |
|---|---|
| Route-level lazy loading (`React.lazy` + `Suspense`) | ✅ |
| Lighthouse before / after | ✅ (`docs/lighthouse`) |
| Dark mode (Tailwind v4 colour variables) | ✅ |
| `localStorage` persistence for cart, user and theme | ✅ |
| Search and sorting in the catalog | ✅ |
| Reducer (`useReducer` in `CartProvider`) | ✅ |
| TypeScript generics (`request<T>`, `useFetch<T>`), type guards, discriminated unions | ✅ |
| Custom hook `useFetch` | ✅ (used by the catalog) |
| Formik + Yup | ✅ login form (checkout keeps hand-written validation) |
| `@theme` tokens and `@utility` classes | ✅ |
| Cross-browser check | ✅ Chrome, Edge, Arc (Chromium), Firefox (Gecko); Safari not tested |
| UI polish: image gallery, side drawer menu, compact cards, "Back to cart" link | ✅ |
| Category filter, pagination, URL state | ❌ not done |
| `ApiClient` / OOP classes | ❌ not done |
| Orders, Profile | ❌ not done |
| Reviews, Related products, promo code (BONUS) | ❌ not done |

Why not: with about two weeks and a first release of CORE on 2 November, I first finished CORE, deployed and documented it, and then added FULL items in the order in which I could understand and explain each one. Pagination, categories, Orders, Profile and the `ApiClient` class were left out because there was not enough time to build them and still be able to explain them at the defence.

Two decisions worth knowing: `ProductPage` was **not** migrated to `useFetch`, because it must distinguish a 404 (show the 404 page) from other errors and reject non-numeric IDs before fetching, which the simple hook cannot do. The checkout form was not moved to Formik either, to keep the change small and leave one clearly explained example of Formik + Yup (the login form).

## 2. Metrics

| Metric | Value |
|---|---|
| Commits | 108 (Conventional Commits) on 11 different days (25 Oct – 6 Nov) |
| Pull requests | 15 merged (each with What / Why / How to test; most with `Closes #…`) |
| Pages | 7 (Catalog, Product, Cart, Login, Checkout, Order confirmation, 404) |
| TypeScript | `strict`, `no-explicit-any`; `npm run typecheck` and `npm run lint` pass |
| Bugs documented | 5 (see DEBUG-LOG.md) |
| Browsers checked | Chrome, Edge, Arc, Firefox (Safari not tested) |

### Lighthouse (Mobile)

| Metric | Before (`localhost:5173`, dev server) | After (live on Vercel) |
|---|---|---|
| Performance | 48 (38 in an earlier run) | **93–94** |
| Accessibility | 95 | 95 |
| Best Practices | 96 | 96 |
| SEO | 92 | 92 |
| First Contentful Paint | 15.7 s | 1.3 s |
| Largest Contentful Paint | 30.7 s | 2.7 s |
| Total Blocking Time | 280 ms | 80 ms |
| Cumulative Layout Shift | 0.084 | 0.084 |

What changed: the "before" run was the unminified Vite dev server. The production build (77 on `localhost:4173`), lazy routes, lazy-loaded product images and the Vercel CDN gave the "after" result. The SEO score rose from 83 to 92 after adding a meta description. Screenshots: `docs/lighthouse/before.png` and `after.png`. The performance score varies by one point between runs (94 in the first run, 93 in a later one on 6 Nov).

## 3. Three hardest problems

1. **Understanding how state flows between files.** Auth and cart state live in Context providers, hooks expose them, and pages only read and call functions. I solved it by drawing the chain *user action → context function → state change → re-render* and testing it with the Header badge and the stock text.
2. **Stock logic across pages.** The product page, product card and cart all had to agree on how many pieces are still available (bug 2 in DEBUG-LOG.md). The fix was one helper (`getQuantityInCart`) used everywhere.
3. **Guest checkout redirect.** A guest must be sent to `/login` and then return to `/checkout`. I used `Navigate` with `state={{ from: location }}` in `ProtectedRoute` and read it in `LoginPage`. The empty-cart redirect on checkout had to ignore the moment when the cart is cleared by the order itself.

Smaller problem from the last week: in dark mode the native `<select>` popup was unreadable because Tailwind's preflight makes the select background transparent. `color-scheme: dark` was already set and did not help; the fix was to style `option` inside the `input-field` utility. The final design replaced the select with sort chips, which also removed the unstyled popup.

## 4. What I would do differently

- Start the Git history and the deploy earlier (first deploy in week 3, not week 1), and check the SPA rewrite from the start.
- Write a short test for the validation functions and the cart helpers.
- Add `useFetch` early instead of near the end: `CatalogPage` and `ProductPage` repeated the same loading / error pattern.
- Plan FULL items (search / sort / categories) from the beginning so the Catalog structure leaves room for them, and use GitHub Issues, milestones and the Projects board from day one. I created most of them late, and one issue (#22) was created by mistake and closed as "not planned".

## 5. AI usage summary

An AI assistant (Claude) was used as a coach and reviewer: it read the PRD, proposed the implementation plan and chunk order, explained React / TypeScript / Tailwind concepts, reviewed code and found PRD mismatches. I typed and committed the code, ran it in the browser, reported bugs with screenshots, and made the decisions (for example, keeping the checkout validation hand-written, choosing sort chips instead of a native select, and not migrating `ProductPage` to `useFetch`). In the last days the assistant also edited some files directly when I asked it to (for example the login refactor with Formik + Yup and the UI polish); I reviewed, ran, committed and pushed those changes myself. Some suggestions were rejected or simplified because they were too complicated to explain.
