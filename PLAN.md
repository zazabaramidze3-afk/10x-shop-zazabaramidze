# 10X Shop — Project Plan

> Single-page e-commerce app built with React, TypeScript and Tailwind CSS on top of the DummyJSON API.
> Deadline: **6 November 2026, 23:59**. Detailed chunk-by-chunk plan: [`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md).

## 1. Goal

Deliver a working, deployed and responsive online shop where a user can browse the catalog, open a product, manage a cart, log in (local simulation) and place an order (local simulation). **CORE is delivered first; FULL features only after CORE is complete.**

## 2. Tech stack

Vite · React 19 · TypeScript (strict, no `any`) · React Router · Tailwind CSS v4 · ESLint (typescript-eslint, react-hooks) · DummyJSON API · Vercel/Netlify.

No backend: login and checkout are local simulations; no real authentication or payment.

## 3. Scope per module

| Module | CORE (minimum) | FULL (stretch) |
|---|---|---|
| **React** | Functional components, props/children, `useState`/`useEffect`, `map` + stable `key`, Router, Auth & Cart Context, controlled Login/Checkout forms | Custom hooks (`useDebounce`, `useFetch`), cart reducer, Formik + Yup login, Orders, Profile, Reviews, Related products |
| **TypeScript** | Strict mode, typed props/state/API data, `typecheck` = 0 errors | Generics (`ApiClient`, `AsyncState<T>`), `ApiError`, OOP classes (`Cart`, `Order`, `StorageService<T>`), type guards, utility types |
| **Tailwind CSS** | v4 integration, utility styling, flex/grid, responsive breakpoints, hover/focus/disabled states | `@theme` tokens, dark mode, custom utilities |
| **Optimization** | Responsive pages (375px+), Error Boundary, loading/error/empty states, DEBUG-LOG (≥ 3 bugs) | Lazy routes, Lighthouse before/after, cross-browser matrix |
| **Practical project** | GitHub repo, meaningful Git history, README (EN), PLAN.md, REPORT.md, live deploy | Issues/Projects board, PRs, weekly progress notes, demo video |

## 4. Work Breakdown Structure

Estimates are in hours. Week 2 = 24–30 Oct, Week 3 = 31 Oct – 6 Nov.

| Epic | Tasks | Est. | Week |
|---|---|---|---|
| **Setup** | Repo, `.gitignore`, PLAN.md · Vite + React + TS strict · Tailwind v4 · ESLint + scripts (`dev`, `build`, `preview`, `typecheck`, `lint`) | 3 | 2 |
| **Foundation** | Domain types (`types/`) · utils (`formatPrice`, `discountedPrice`, validation) · products API layer | 3 | 2 |
| **App shell** | Router + Layout (Header/Outlet/Footer) · NotFound · ScrollToTop · Error Boundary | 4 | 2 |
| **Auth** | `AuthContext` · controlled Login form with validation · Checkout guard (redirect + return) | 4 | 2 |
| **Catalog** | Fetch products with loading/error/empty · `ProductCard` · `ProductGrid` (responsive) | 5 | 2 |
| **Product** | Details page via `useParams` · gallery · quantity stepper · Add to cart · invalid ID → NotFound | 4 | 2 |
| **Cart** | `CartContext` (immutable updates, `shop_cart` persistence) · Cart page (qty, remove, totals, empty state) · Header badge | 6 | 2 |
| **Checkout** | Controlled form (Full name, Email, Address, City) · validation · local order confirmation · cart reset | 4 | 2–3 |
| **Quality** | Responsive pass (375px / desktop) · interactive states · a11y basics · full happy-path QA · typecheck/build clean | 6 | 3 |
| **Docs & Deploy** | Deploy with SPA rewrite · README · REPORT · DEBUG-LOG | 4 | 3 |
| **FULL (optional)** | ApiClient/ApiError · catalog search/filter/sort/pagination in URL · cart reducer + promo · Formik/Yup · Orders · Reviews/Related · theme · lazy routes | as time allows | 3 |

**CORE total ≈ 43 h.**

## 5. Milestones

| Date | Milestone |
|---|---|
| 26 Oct | Project builds, routing + 404 + Error Boundary work, first deploy |
| 28 Oct | Login, cart state and catalog with product cards work |
| 1 Nov | Product, Cart and Checkout complete → **CORE features done** |
| 3 Nov | Responsive/QA pass, final deploy, README / REPORT / DEBUG-LOG → **CORE ready to submit** |
| 4–6 Nov | FULL features as time allows; final submission before 6 Nov 23:59 |

## 6. Risks

| Risk | Mitigation |
|---|---|
| DummyJSON is unavailable or slow | Clear error state that never crashes the app; optional local JSON fallback |
| Tight schedule (development starts in week 2) | Strict CORE-first order; FULL work only after CORE is submitted-ready |
| SPA routes return 404 after refresh on the host | Configure rewrite (`vercel.json` / `_redirects`) and deploy early to test it |
| Stale data when route param changes (`useEffect` dependencies) | Include `id` in dependencies; ESLint `react-hooks/exhaustive-deps` enabled |
| Type errors block the build late in the project | Run `npm run typecheck` before every commit; `no-explicit-any` as an error |

## 7. Definition of Done (per task)

- The feature works in the browser and matches its acceptance criteria in the PRD.
- `npm run typecheck`, `npm run lint` and `npm run build` pass with 0 errors.
- No `any`, no leftover `console.log`.
- Layout works at 375px and on desktop without horizontal scroll.
- Committed with a meaningful message (`feat:`, `fix:`, `docs:`, `chore:` …) and pushed.
