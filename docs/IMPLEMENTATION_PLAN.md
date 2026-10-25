# 10X Shop — Implementation Plan (ჩანკებად დაყოფილი)

> წყარო: `10X-Shop-Graduation-Project-PRD.docx` (v1.1) + `დანართი A.docx` (სრული ტექნიკური სპეციფიკაცია).
> შედგენილია: 2026-10-25. ჩაბარების deadline: **2026-11-06, 23:59**. დაცვა: 07–08 ნოემბერი.

---

## 0. მთავარი რამ, რაც PRD-დან უნდა გვახსოვდეს

| თემა | რას ამბობს PRD |
|---|---|
| **პროექტის ტიპი** | Front-end **SPA** — React 19 + TypeScript (strict) + Vite + React Router + **Tailwind CSS v4**. |
| **Backend** | **არ არის.** მონაცემები მოდის **DummyJSON**-დან (`https://dummyjson.com`). Node/Express/PostgreSQL ამ პროექტში **არ გამოიყენება** (PRD წესი #8: დოკუმენტით გაუთვალისწინებელი ბიბლიოთეკები/ფუნქციები არ დაემატოს). |
| **Login** | ლოკალური **simulation** `AuthContext`-ით. ნებისმიერი არაცარიელი username + password (≥ 6). credentials არსად ინახება და არსად იგზავნება → password hashing აქ არ არის რელევანტური, რადგან პაროლი საერთოდ არ ინახება. |
| **Checkout** | controlled form + ლოკალური order simulation. რეალური payment **არ არის**, ბარათის ველები **არ არის**. |
| **TypeScript** | `strict: true`, **`any` აკრძალულია** (ESLint `no-explicit-any: error`); `unknown` მხოლოდ type guard-ით. `npm run typecheck` = **0 error** — ჩაბარების პირობაა. |
| **Scripts** | `dev`, `build`, `preview`, `typecheck`, `lint`. |
| **Deploy** | Vercel ან Netlify, SPA rewrite (`/products/5` refresh უნდა მუშაობდეს). |
| **Docs რეპოში** | `README.md` (EN), `PLAN.md`, `REPORT.md`, `DEBUG-LOG.md` (≥ 3 ნამდვილი ბაგი). |
| **პრიორიტეტი** | **ჯერ მთელი CORE**, მერე FULL. FULL არ კეთდება, სანამ CORE არ დასრულდება. |
| **UI ენა** | ინტერფეისის ტექსტები — ინგლისურად (შეცდომის ტექსტები PRD-ში ზუსტადაა მოცემული). |

### PRD-ში აღმოჩენილი წინააღმდეგობები (გადაწყვეტილება PRD წესი #3-ით: CORE/FULL განმარტება იგებს)

1. **Checkout ველები** — P5.2 ცხრილში ძველი სქემის ნარჩენებია (Phone, Postal code, Country, card). **CORE = მხოლოდ 4 ველი:** Full name, Email, Address, City.
2. **Cart badge / Add to cart toast** — რეესტრში წერია `dispatch ADD_ITEM` და toast; CORE-ში საკმარისია `useState`-ზე დაფუძნებული CartContext და inline შეტყობინება. reducer + toast = FULL.
3. **ProtectedRoute** — დოკუმენტში "დაცული" წერია, მაგრამ ეს არის მარტივი სასწავლო redirect (React state), არა რეალური security.
4. **README Test Account (emilys / emilyspass)** — Login ლოკალურია, ამიტომ README-ში უბრალოდ აღვნიშნავთ, რომ ნებისმიერი username + ≥ 6-სიმბოლოიანი password მუშაობს (შეგიძლია ეს მაგალითიც ჩაწერო).

---

## 1. როგორ მუშაობს აპლიკაცია (ერთ სურათად)

```
 User action ──► event handler ──► setState / Context fn ──► new immutable state ──► React re-render
                                                                       │
 Page mount / param change ──► useEffect ──► products.api.ts ──► fetch(DummyJSON)
                                                     │
                                   loading │ error │ empty │ success  (conditional rendering)
```

**ფენები (Clean Architecture-ის პრინციპით, PRD-ის რეკომენდებული სტრუქტურა):**

```
src/
  types/        ← დომენის მოდელები (Product, CartItem, AuthUser, ShippingInfo…) — ერთადერთი წყარო
  utils/        ← სუფთა ფუნქციები: formatPrice, discountedPrice, validation (UI-ს გარეშე)
  api/          ← DummyJSON-თან კომუნიკაცია (products.api.ts) — კომპონენტები fetch-ს პირდაპირ არ იძახებენ
  context/      ← გლობალური state: AuthContext, CartContext
  components/   ← reusable UI: ui/, layout/, product/, cart/
  pages/        ← გვერდები: აერთიანებს components + context + api
  routes/       ← AppRoutes.tsx, ProtectedRoute.tsx
```

დამოკიდებულების მიმართულება: `pages → components/context → api/utils → types`. `types/` არაფერზეა დამოკიდებული.

---

## 2. ჩანკების რუკა

| # | ჩანკი | ფაზა | დონე | დამოკიდებულია | სავარაუდო დრო |
|---|---|---|---|---|---|
| C0 | Repo + PLAN.md | Foundation | CORE | — | 1 სთ |
| C1 | Vite + TS strict + Tailwind v4 + ESLint | Foundation | CORE | C0 | 2 სთ |
| C2 | Types layer | Foundation | CORE | C1 | 1 სთ |
| C3 | Utils + API layer | Foundation | CORE | C2 | 2 სთ |
| C4 | Routing + Layout + Header + 404 | App Shell | CORE | C1 | 3 სთ |
| C5 | Error Boundary | App Shell | CORE | C4 | 1 სთ |
| C6 | AuthContext + Login page | Auth | CORE | C4 | 3 სთ |
| C7 | ProtectedRoute (Checkout guard) | Auth | CORE | C6 | 1 სთ |
| C8 | CartContext (state + localStorage) | Cart state | CORE | C2, C3 | 3 სთ |
| C9 | Catalog: fetch + Loading/Error/Empty | Catalog | CORE | C3, C4 | 2 სთ |
| C10 | ProductCard + ProductGrid | Catalog | CORE | C8, C9 | 3 სთ |
| C11 | Product Details page | Product | CORE | C8, C10 | 4 სთ |
| C12 | Cart page | Cart | CORE | C8 | 3 სთ |
| C13 | Checkout form + validation | Checkout | CORE | C7, C12 | 3 სთ |
| C14 | Order confirmation | Checkout | CORE | C13 | 1 სთ |
| C15 | Responsive + interactive states + a11y | Quality | CORE | C4–C14 | 4 სთ |
| C16 | E2E happy-path QA + typecheck/build | Quality | CORE | C15 | 2 სთ |
| C17 | Deploy (Vercel/Netlify) + SPA rewrite | Delivery | CORE | C16 | 1 სთ |
| C18 | README, REPORT, DEBUG-LOG | Delivery | CORE | C17 | 3 სთ |
| F1–F9 | FULL ფუნქციები (სექცია 4) | Extension | FULL | CORE დასრულება | არჩევით |

**CORE ჯამში ≈ 43 სთ.** დღეს 25 ოქტომბერია, ანუ კვირა 2 უკვე დაწყებულია, ფოლდერში კი კოდი ჯერ არ არის — ამიტომ C0–C10 უნდა დაიხუროს ~28 ოქტომბრამდე.

---

## 3. CORE ჩანკები დეტალურად

თითო ჩანკი = ერთი (ან რამდენიმე) შინაარსიანი commit. Commit message-ის მაგალითი თითოეულს აქვს.

### Phase A — Foundation

#### C0 — Repo + PLAN.md
- **Goal:** პროექტის "პროცესის მტკიცებულება" თავიდანვე არსებობდეს.
- **Scope:** `git init`; საჯარო GitHub repo `10x-shop-{სახელი}`; `.gitignore` (`node_modules`, `dist`, `.env*`); მოკლე `PLAN.md` (მიზანი, CORE/FULL scope, 3 კვირის ეტაპები, ≥ 3 რისკი + mitigation, DoD). ეს დოკუმენტი შეგიძლია PLAN.md-ის საფუძვლად გამოიყენო.
- **AC:** PLAN.md commit-ის თარიღი ფუნქციონალურ კოდზე ადრეა.
- **Commit:** `docs: add project plan`

#### C1 — Vite + React 19 + TypeScript strict + Tailwind v4 + ESLint
- **Goal:** სამუშაო "ჩონჩხი", რომელიც build-დება და typecheck-ს 0 შეცდომით გადის.
- **Scope:**
  - `npm create vite@latest` → `react-ts` template.
  - `tsconfig`: `strict`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `jsx: react-jsx`. (ბონუსი: `@/*` alias → `vite.config.ts`-შიც.)
  - Tailwind v4: `@tailwindcss/vite` plugin `vite.config.ts`-ში + `src/index.css`-ში `@import "tailwindcss";`.
  - ESLint: `typescript-eslint`, `eslint-plugin-react-hooks` (`rules-of-hooks: error`, `exhaustive-deps: warn`), **`@typescript-eslint/no-explicit-any: error`**.
  - `package.json` scripts: `dev`, `build`, `preview`, `typecheck` (`tsc --noEmit`), `lint` (`eslint .`).
  - `react-router-dom` დაყენება.
  - `.env.example` → `VITE_API_BASE_URL=https://dummyjson.com` (base URL hardcode-ის ნაცვლად `import.meta.env`-დან). შენიშვნა: `VITE_` ცვლადები bundle-ში საჯაროდ ხვდება, ამიტომ იქ საიდუმლო არასდროს იწერება — აქ მხოლოდ საჯარო URL-ია.
- **AC:** `npm run typecheck`, `npm run lint`, `npm run build` — უშეცდომოდ; ერთი Tailwind class (მაგ. `bg-red-500`) UI-ს ხილულად ცვლის.
- **Commit:** `chore: scaffold vite react-ts with tailwind v4 and strict eslint`

#### C2 — Types layer (`src/types/`)
- **Goal:** ყველა დომენის მოდელი ერთ ადგილას — სხვაგან `interface Product` მეორედ არ იწერება.
- **Scope (მხოლოდ CORE-ში რეალურად საჭირო):**
  - `product.ts` → `Product`, `ProductsResponse`
  - `cart.ts` → `CartItem`, `CartState`
  - `user.ts` → `AuthUser`, `LoginFormValues`
  - `order.ts` → `ShippingInfo` (Checkout ფორმა) + მარტივი `OrderSummary`
  - `forms.ts` (ან იგივე ფაილები) → `FormErrors<T> = Partial<Record<keyof T, string>>`
- **AC:** ტიპები ემთხვევა DummyJSON-ის რეალურ პასუხს; ზედმეტი FULL ტიპები (Review, OrderStatus, AsyncState) ჯერ არ იქმნება.
- **Commit:** `feat(types): add core domain models`

#### C3 — Utils + API layer
- **Goal:** ბიზნეს-ლოგიკა და HTTP კომპონენტებისგან გამოყოფილი, სუფთა და ტიპიზებული.
- **Scope:**
  - `utils/format.ts` → `formatPrice(amount, currency = "USD"): string` (`Intl.NumberFormat`, `$1,299.00`), `discountedPrice(price, pct): number` (2 ათწილადი).
  - `utils/validation.ts` → `validateLogin(values): FormErrors<LoginFormValues>`, `validateShipping(values): FormErrors<ShippingInfo>` — PRD-ის **ზუსტი** შეცდომის ტექსტებით.
  - `utils/cart.ts` → `getCartSubtotal(items)`, `getCartCount(items)`.
  - `api/products.api.ts` → `fetchProducts(limit, skip): Promise<ProductsResponse>`, `fetchProductById(id): Promise<Product>`; `!res.ok` → სტატუსიანი შეცდომა (404 ცალკე გასარჩევად).
- **AC:** ყველა ფუნქციას აქვს ექსპლიციტური return type; `catch (e: unknown)` + narrowing; `any` არსად.
- **Commit:** `feat: add price/validation utils and products api`

### Phase B — App Shell

#### C4 — Routing + Layout + Header + NotFound + ScrollToTop
- **Goal:** ნავიგაცია მუშაობს reload-ის გარეშე; Header ერთხელ იწერება.
- **Scope:**
  - `routes/AppRoutes.tsx`: ერთი `BrowserRouter`, ერთი Layout route (`Header` + `<Outlet />` + `Footer`). მარშრუტები: `/`, `/login`, `/products/:id`, `/cart`, `/checkout`, `*`. (გვერდები ჯერ placeholder-ებია.)
  - `components/layout/Header.tsx`: "10X Shop" ლოგო, `NavLink` Catalog / Cart (+ badge-ის ადგილი) / Log in–Log out; active კლასი.
  - `pages/NotFoundPage.tsx`: "Page not found" / "The page you are looking for does not exist." / "Go to catalog" → `/`.
  - `components/layout/ScrollToTop.tsx`: `useLocation` + `useEffect` + `window.scrollTo(0, 0)`.
  - **`props.children` კომპოზიცია** (CORE მოთხოვნა): მაგ. `Container` ან `Card` კომპონენტი `children`-ით.
- **AC:** 6-ვე მარშრუტი იხსნება; უცნობი URL → NotFound; active ბმული გამოკვეთილია.
- **Commit:** `feat(routing): add layout, header, 404 and scroll restoration`

#### C5 — Error Boundary
- **Goal:** render-ის შეცდომა მთელ აპს არ "აქრობს" (O2 — CORE).
- **Scope:** `components/ErrorBoundary.tsx` — class component, `static getDerivedStateFromError` + `componentDidCatch`; fallback "Something went wrong." + "Reload" ღილაკი. ახვევს `<Outlet />`-ს Layout-ში.
- **AC:** კომპონენტში ხელით `throw` → fallback ჩანს, Header რჩება.
- **Commit:** `feat: add error boundary`

### Phase C — Auth (სიმულაცია)

#### C6 — AuthContext + Login page
- **Goal:** controlled form → validation → Context state → navigate.
- **Scope:**
  - `context/AuthContext.tsx`: state `AuthUser` (`username`, `isLoggedIn`); `login(username)`, `logout()`; `useAuth()` hook, რომელიც Provider-ის გარეშე გამოყენებისას შეცდომას აგდებს.
  - `pages/LoginPage.tsx`: Username/Password `value` + `onChange` → `useState`; `onSubmit` → `preventDefault()` → `validateLogin`; შეცდომები შესაბამის ველთან: `Username is required`, `Password is required`, `Password must be at least 6 characters`. "← Back to catalog".
  - წარმატება → `login()` → `navigate(location.state?.from ?? "/")`.
  - Header: Log out → `logout()` + `navigate("/")`; **კალათა არ იშლება**.
  - პაროლი **არსად ინახება** (არც Context-ში, არც localStorage-ში).
- **AC:** ცარიელი ველები ბლოკავს submit-ს; ვალიდური submit ცვლის Context-ს, გვერდი არ გადაიტვირთება; Logout → guest.
- **Commit:** `feat(auth): add auth context and controlled login form`

#### C7 — ProtectedRoute
- **Goal:** სტუმარი `/checkout`-დან → `/login`, შესვლის შემდეგ → უკან `/checkout`.
- **Scope:** `routes/ProtectedRoute.tsx`: `!isLoggedIn` → `<Navigate to="/login" state={{ from: location.pathname }} replace />`; ახვევს `/checkout`-ს.
- **AC:** Guest → Checkout → Login → Checkout ფლოუ მუშაობს.
- **Commit:** `feat(auth): guard checkout route`

### Phase D — Cart state

#### C8 — CartContext
- **Goal:** კალათის ერთი საერთო state, რომელსაც Header badge, Catalog, Product და Cart გვერდი ერთნაირად ხედავენ.
- **Scope:**
  - `context/CartContext.tsx`: `CartState { items }`; ფუნქციები `addItem(product, qty)`, `removeItem(productId)`, `setQuantity(productId, qty)`, `clearCart()`.
  - **immutable updates** (`map` / `filter` / spread — არასდროს `push`/mutation).
  - წესები: იგივე productId → quantity-ს ზრდა; ჯამი ≤ `stock` (ზედმეტი არ ემატება, ფუნქცია აბრუნებს `boolean`-ს inline შეტყობინებისთვის); quantity ≥ 1.
  - persistence: lazy initial state `shop_cart`-დან (`JSON.parse` try/catch-ში + მარტივი shape-check), `useEffect` წერს ყოველ ცვლილებაზე.
  - Header badge = Σ quantity; 0-ზე იმალება.
- **AC:** badge ცოცხლად ახლდება; refresh-ის შემდეგ კალათა ადგილზეა; Logout კალათას არ შლის.
- **Commit:** `feat(cart): add cart context with immutable updates and persistence`

### Phase E — Catalog

#### C9 — Catalog: data fetching + states
- **Goal:** "ოქროს ციკლის" API ნაწილი — useEffect → fetch → conditional rendering.
- **Scope:** `pages/CatalogPage.tsx`: `useEffect` → `fetchProducts(12, 0)`; state: `loading` / `error` / `products`. "Catalog" სათაური + რაოდენობა. Loading → "Loading…", Error → გასაგები ტექსტი, ცარიელი → "No products found.". `ignore` flag cleanup-ში (unmount-ის შემდეგ setState არ მოხდეს).
- **AC:** პროდუქტები ჩანს; DevTools → Offline → Error ტექსტი, აპი არ ტყდება.
- **Commit:** `feat(catalog): load products with loading/error/empty states`

#### C10 — ProductCard + ProductGrid
- **Goal:** props + `map()` + სტაბილური `key` + responsive grid.
- **Scope:**
  - `components/product/ProductCard.tsx` — `interface ProductCardProps { product: Product; onAdd: (p: Product) => void }`. thumbnail (`loading="lazy"`, `width`/`height`, `alt`), სათაური, category · brand, ფასდაკლებული ფასი მსხვილად + ძველი გადახაზული + "−9%" ბეჯი (`discountPercentage ≥ 1`), "★ 4.7", stock ბეჯი ("In stock" / "Only N left!" ნარინჯისფერი / "Out of stock" წითელი), "Add to cart" (stock = 0 → disabled "Out of stock").
  - ბარათზე click → `navigate("/products/" + id)`; ღილაკზე `e.stopPropagation()`.
  - `components/product/ProductGrid.tsx` — `products.map(p => <ProductCard key={p.id} … />)`; Tailwind `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`.
- **AC:** ბარათიდან დეტალებზე გადასვლა და Add to cart მუშაობს, badge იზრდება.
- **Commit:** `feat(catalog): add product card and responsive grid`

### Phase F — Product Details

#### C11 — Product page
- **Goal:** `useParams` + დინამიური fetch + ლოკალური ინტერაქტიული state.
- **Scope:** `pages/ProductPage.tsx`:
  - `id` validation: `Number(id)` არაა მთელი დადებითი → NotFound **რექვესთის გარეშე**.
  - `useEffect([id])` → `fetchProductById`; 404 → NotFound; სხვა შეცდომა → ტექსტი; loading → "Loading…".
  - Layout: desktop 2 სვეტი (gallery | info), mobile 1. სათაური, brand · category, ფასის ბლოკი, rating, stock სტატუსი, description.
  - Gallery: thumbnail-ზე click → მთავარი ფოტო (`useState`).
  - Quantity stepper `− / +`: `1 ≤ qty ≤ stock`, კიდეებზე disabled; stock = 0 → stepper + ღილაკი disabled.
  - "Add to cart" → `addItem(product, qty)` → inline შეტყობინება ("Added to cart" / "Not enough stock").
  - "← Back to catalog" → `navigate(-1)`.
- **AC:** `/products/1` სწორად ჩანს, ფასი = `price × (1 − pct/100)`; `/products/999999` და `/products/abc` → NotFound, კონსოლში unhandled error არ არის.
- **Commit:** `feat(product): add product details page with gallery and quantity`

### Phase G — Cart page

#### C12 — Cart page
- **Goal:** კალათის სრული მართვა UI-დან.
- **Scope:** `pages/CartPage.tsx` + `components/cart/CartItemRow.tsx` + `components/cart/CartSummary.tsx`:
  - ხაზი: thumbnail, სათაური (Link → `/products/:id`), ერთეულის ფასდაკლებული ფასი, stepper (`1 ≤ qty ≤ stock`), ხაზის ჯამი, Remove.
  - "Clear cart" (CORE-ში უბრალო ღილაკი; `confirm()` სურვილისამებრ).
  - Summary: Subtotal, Total + "Proceed to checkout" → `/checkout` (guard თავად გადაიყვანს login-ზე — მეორე შემოწმება აქ **არ** იწერება).
  - ცარიელი: "Your cart is empty." + "Browse products" → `/`; summary არ ჩანს.
  - desktop: სია მარცხნივ, summary მარჯვნივ; mobile: summary ქვემოთ.
- **AC:** quantity/remove ცვლილება მაშინვე ცვლის ჯამს და badge-ს.
- **Commit:** `feat(cart): add cart page with quantity, remove and totals`

### Phase H — Checkout

#### C13 — Checkout form
- **Goal:** ოთხველიანი controlled form + validation.
- **Scope:** `pages/CheckoutPage.tsx` + `components/checkout/CheckoutForm.tsx`:
  - ცარიელი კალათა → `<Navigate to="/cart" />` + შეტყობინება.
  - ველები (`label htmlFor` + `id`): Full name (≥ 3 → `Full name must be at least 3 characters`), Email (მარტივი regex → `Please enter a valid email address`), Address (≥ 5 → `Address must be at least 5 characters`), City (required → `City is required`).
  - Full name შეიძლება წინასწარ შეივსოს `auth.username`-ით.
  - `onSubmit` + `preventDefault`; შეცდომები ველთან; "Place order" submit-ის დროს disabled (ორმაგი click-ის დაცვა).
  - გვერდზე ჩანს Order summary (იგივე `CartSummary` კომპონენტის reuse).
- **AC:** ცარიელი/არავალიდური ფორმა არ გადის; submit გვერდს არ ტვირთავს.
- **Commit:** `feat(checkout): add controlled checkout form with validation`

#### C14 — Order confirmation
- **Goal:** ლოკალური შეკვეთის simulation.
- **Scope:** ვალიდური submit → React state-ში `OrderSummary { items, shipping, total, placedAt }` → `clearCart()` → "Thank you! Your order has been placed." + ჯამი + "Continue shopping". სერვერზე არაფერი იგზავნება.
- **AC:** confirmation ჩანს, badge მაშინვე ქრება, refresh-ის შემდეგ კალათა ცარიელია.
- **Commit:** `feat(checkout): add local order confirmation`

### Phase I — Quality

#### C15 — Responsive, interactive states, a11y
- **Goal:** TW2–TW4 + O3 მოთხოვნები.
- **Scope:**
  - 375px-ზე ყველა გვერდი გამოსადეგი, **ჰორიზონტალური scroll არ არის**; mobile-first; breakpoint-ები (`sm:`/`md:`/`lg:`).
  - Header ≤ 480px-ზე burger მენიუ (ან მეორე რიგი).
  - ყველა ღილაკსა და input-ზე `hover:`, `focus-visible:`, `disabled:` variant-ები; დასაჭერი ელემენტები ≥ 44px.
  - სემანტიკური ტეგები (`header`/`nav`/`main`/`footer`), `alt` ყველგან, `label` ყველა ველზე.
- **AC:** Catalog, Product, Cart, Login, Checkout — 375px-ზე და desktop-ზე სწორად ჩანს.
- **Commit:** `style: finalize responsive layout and interactive states`

#### C16 — Happy-path QA + typecheck/build
- **Goal:** CORE ჩეკლისტის ხელით შემოწმება.
- **Scope:** Catalog → Product → Add 2 → Cart (qty / remove) → Checkout (guest → Login → back) → Place order → Thank you. Edge-ები: `/products/abc`, `/products/999999`, `/random`, Offline. Chrome + Firefox. `npm run typecheck && npm run lint && npm run build` — 0 შეცდომა. production კოდში `console.log` არ რჩება.
- **AC:** ყველა ნაბიჯი მუშაობს; ნაპოვნი ბაგები ფიქსირდება `DEBUG-LOG.md`-ში (სიმპტომი → რეპროდუქცია → ინსტრუმენტი → მიზეზი → ფიქსი (commit) → რა ვისწავლე).
- **Commit:** `fix: …` (თითო ბაგზე ცალკე)

### Phase J — Delivery

#### C17 — Deploy
- **Scope:** Vercel (`vercel.json` rewrite → `/index.html`) ან Netlify (`public/_redirects`: `/* /index.html 200`). env var `VITE_API_BASE_URL` პლატფორმის settings-ში.
- **AC:** live ბმული მუშაობს; `/products/5` პირდაპირ იხსნება და refresh-დება.
- **Commit:** `chore: add spa rewrite for deploy`

#### C18 — README, REPORT, DEBUG-LOG
- **Scope:**
  - `README.md` (EN): About, Features (CORE/FULL), Tech Stack, Architecture (ფოლდერების ხე + data flow 3–4 წინადადებით), How to Run, Scripts, Live Demo, Login შენიშვნა, Credits.
  - `REPORT.md`: დაგეგმილი vs მიწოდებული, რა არ გაკეთდა და რატომ, 3 ყველაზე რთული პრობლემა, "რას გავაკეთებდი სხვანაირად", AI-ის გამოყენების შეჯამება (5–6 ხაზი).
  - `DEBUG-LOG.md`: ≥ 3 ნამდვილი ბაგი commit-ის ბმულებით.
- **AC:** `npm install && npm run typecheck && npm run build` სუფთა clone-ზე გადის; repo გაგზავნილია 06.11 23:59-მდე.
- **Commit:** `docs: add readme, report and debug log`

---

## 4. FULL ჩანკები (მხოლოდ CORE-ის დასრულების შემდეგ, ღირებულების მიხედვით დალაგებული)

| # | ჩანკი | რას მოიცავს | დამოკიდებულია |
|---|---|---|---|
| F1 | **TS არქიტექტურა** | `ApiClient` (generic `get<T>`), `ApiError extends Error` (status), `AsyncState<T>` discriminated union, `isApiError` / `isCartState` type guards, `STORAGE_KEYS as const` | C3 |
| F2 | **Catalog URL-state** | `useSearchParams` (q, category, sort, page), `useDebounce(400)`, AbortController cleanup-ში, categories select, 5 sort option, `Pagination` კომპონენტი, "Showing 13–24 of 194", Skeleton + Retry | F1, C9 |
| F3 | **Cart reducer + Promo** | `useReducer` + `CartAction` union + `never` exhaustive check; promo `10X10` (−10%, "Invalid promo code"); shipping ($10, free ≥ $100); `Cart` class; `StorageService<T>`; Toast | C8 |
| F4 | **Formik + Yup Login** | `useFormik` + Yup schema (required, min 6) | C6 |
| F5 | **Orders** | `/orders`, `/orders/:id`, `shop_orders`, `getOrderStatus(order, now)` (Processing → Shipped → Delivered), `setInterval(30s)` cleanup-ით, Reorder | F3, C14 |
| F6 | **Reviews + Related** | ტაბები Description/Reviews, review ფორმა (`shop_reviews`), საშუალო `useMemo`-თი; Related — იგივე `ProductCard` reuse | C11 |
| F7 | **Theme / Tailwind FULL** | `@theme` design tokens, dark mode, `ThemeContext`, `shop_theme` | C15 |
| F8 | **Optimization** | `React.lazy` + `Suspense` route-ებზე, Lighthouse before/after (`docs/lighthouse/`), `React.memo(ProductCard)` Profiler-ით გაზომვის შემდეგ, `COMPATIBILITY.md` | C17 |
| F9 | **Profile** | `/profile` controlled form, Clear local data | F5, F7 |

---

## 5. Timeline (დარჩენილი 12 დღე)

| თარიღი | ჩანკები | მიზანი დღის ბოლოს |
|---|---|---|
| 25–26 ოქტ. | C0 – C5 | build-დება, ნავიგაცია და 404 მუშაობს, deploy-ის პირველი ვერსია |
| 27 ოქტ. | C6 – C8 | Login/Logout, Checkout guard, Cart state + badge |
| 28 ოქტ. | C9 – C10 | Catalog API-დან, ბარათები, Add to cart |
| 29–30 ოქტ. | C11 – C12 | Product page, Cart page |
| 31 ოქტ. – 1 ნოემ. | C13 – C14 | Checkout + confirmation → **CORE ფუნქციონალი დასრულებულია** |
| 2 ნოემ. | C15 – C17 | responsive, QA, production deploy |
| 3 ნოემ. | C18 | docs — **CORE ჩაბარებისთვის მზადაა** |
| 4–6 ნოემ. | F1 → F2 → F3 … | FULL, რამდენიც მოესწრება (05.11 — თეორიული ტესტი!) |

**წესი:** deploy ახლდება მინიმუმ კვირაში ერთხელ; ყოველი ჩანკი ცალკე commit-ით, რომ Git ისტორია რეალურ მუშაობას ასახავდეს.

---

## 6. რისკები

| რისკი | Mitigation |
|---|---|
| DummyJSON დროებით მიუწვდომელია | Error state + (FULL) Retry; სურვილისამებრ ლოკალური JSON fallback |
| დროის ნაკლებობა (კოდი ჯერ არ არის, 12 დღეა დარჩენილი) | მკაცრად ჯერ CORE; FULL მხოლოდ C18-ის შემდეგ |
| SPA refresh 404 deploy-ზე | rewrite კონფიგი C17-ში, ადრეული deploy C5-ის შემდეგ |
| `useEffect`-ის dependency ბაგი (`id` იცვლება, მონაცემი არა) | `[id]` dependency + `exhaustive-deps` ESLint წესი |
| დაცვაზე საკუთარი კოდის ვერ ახსნა | თითო ჩანკის შემდეგ მოკლე შენიშვნა "რატომ ასე" (საფუძველი REPORT/DEBUG-LOG-ისთვის) |

---

## 7. დაცვისთვის მოსამზადებელი კითხვები (PRD-დან)

- რა მოხდება AbortController-ის / `setInterval` cleanup-ის გარეშე?
- რატომ არის `id` `useEffect`-ის dependency-ში?
- interface vs type — შენს კოდში სად და რატომ?
- ერთი generic და ერთი type guard შენი კოდიდან.
- რატომ არის ეს `useMemo` / `React.memo` აქ (გაზომე Profiler-ით)?
- როგორ იპოვე და გაასწორე ბაგი (DEBUG-LOG)?
