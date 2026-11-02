# Debug Log (English / ქართულად)

> English version first, Georgian version below / ქართული ვერსია ქვემოთ: [ქართულად](#დებაგ-ლოგი-ქართულად).

Real bugs found while building 10X Shop. Each entry: symptom, reproduction, tool, root cause, fix and lesson.

## 1. White screen after the Login form was connected to `useAuth`

- **Symptom:** after adding `useAuth` to `LoginPage`, the whole app rendered a blank white page.
- **Reproduction:** open `/login` right after adding `import { useAuth } from '../hooks/useAuth'`.
- **Tool:** browser DevTools Console. It showed a `SyntaxError` saying the module does not provide an export named `useAuth`.
- **Root cause:** `hooks/useAuth.ts` uses `export default`, but the page imported it as a named export with braces.
- **Fix:** `import useAuth from '../hooks/useAuth'` (commit `441f727`). Consistent default exports for hooks keep imports predictable.
- **Lesson:** a blank page almost always means a runtime error: read the Console first. TypeScript and ESLint caught the mismatch only after the fix, so check how a module exports before importing it.

## 2. Stock still showed the full amount after everything was in the cart

- **Symptom:** a product with 29 in stock still showed "29 in stock" and an enabled Add to cart button after all 29 pieces were already in the cart.
- **Reproduction:** add the same product repeatedly on the Catalog or Product page and watch the stock text and the button.
- **Tool:** browser testing (Header cart badge and Cart page quantities compared with the stock text) and reading the `ProductCard` code to see which value it used.
- **Root cause:** the UI compared against `product.stock` (the API value) and ignored how many pieces were already in the cart.
- **Fix:** added `getQuantityInCart(items, productId)` in `utils/cart.ts` and computed `remainingStock = product.stock - quantityInCart`; the button is disabled when it reaches 0 (commit `359283d`). The same rule is used on the Product page.
- **Lesson:** derived values (remaining stock) should be calculated from state, not copied from the source data. One helper keeps the Catalog and Product pages consistent.

## 3. The page title became a grid cell

- **Symptom:** the "Catalog" heading appeared inside the product grid, taking the place of the first card.
- **Reproduction:** open `/` on desktop width.
- **Tool:** visual check in the browser, then reading the JSX structure: the `h1` was a direct child of the element with `grid` classes.
- **Root cause:** the `h1` was placed inside the `div` with `grid grid-cols-*`, so the grid treated it as an item.
- **Fix:** wrapped the heading and the grid in an outer `div` with `space-y-6`, keeping the grid for cards only (commit `0e4eb63`).
- **Lesson:** CSS grid and flex layout apply to direct children only. Keep container elements for one purpose.

## 4. Header edits were overwritten by an old editor buffer

- **Symptom:** a change to `Header.tsx` (burger menu, later the mobile menu layout) was written to disk, but the browser still showed the old header and the file content went back to the previous version.
- **Reproduction:** keep a file open in VS Code with unsaved or stale content while another tool rewrites the same file on disk, then save the tab.
- **Tool:** comparing the content of the file on disk with what the VS Code tab showed, and `git status` / `git diff`.
- **Root cause:** the open VS Code tab held an older version of the file and wrote it over the newer version on save.
- **Fix:** close the tab without saving, reopen the file, re-apply the change and verify the content and size on disk before committing (commits `9be0486`, `7890720`).
- **Lesson:** before editing a file from outside the editor, close or revert its tab; always verify what is really on disk and use `git diff` before every commit.

## 5. Lighthouse reported "NO_FCP" and a very low performance score locally

- **Symptom:** Lighthouse on `localhost:5173` showed Performance 38 and, in one run, "The page did not paint any content (NO_FCP)" with all metrics in error.
- **Reproduction:** run Lighthouse against the Vite dev server while switching windows or tabs.
- **Tool:** Chrome DevTools Lighthouse (Mobile) and `npm run build && npm run preview`.
- **Root cause:** the dev server does not minify or bundle the code, so it is much slower than production, and the browser window must stay in the foreground during the test.
- **Fix / result:** measuring the production build gave 77, and after lazy routes, lazy-loaded images and the deploy to Vercel the live site reached **Performance 94** (screenshots in `docs/lighthouse`).
- **Lesson:** measure performance on the production build, not on the dev server.

---

# დებაგ ლოგი (ქართულად)

აქ აღწერილია 10X Shop-ის აწყობისას **რეალურად** დაშვებული ბაგები. თითო ჩანაწერში: სიმპტომი, გამეორების ნაბიჯები, გამოყენებული ინსტრუმენტი, მიზეზი (root cause), გასწორება და რა ვისწავლე.

## 1. თეთრი ეკრანი, როცა Login ფორმა `useAuth`-ს დავუკავშირეთ

- **სიმპტომი:** `LoginPage`-ში `useAuth`-ის დამატების შემდეგ მთელი აპლიკაცია თეთრ ცარიელ გვერდად იქცა.
- **გამეორება:** გახსენი `/login` მას შემდეგ, რაც დაწერე `import { useAuth } from '../hooks/useAuth'`.
- **ინსტრუმენტი:** ბრაუზერის DevTools Console. ჩანდა `SyntaxError`: მოდული არ შეიცავს `useAuth` სახელიან export-ს.
- **მიზეზი:** `hooks/useAuth.ts` იყენებს `export default`-ს, ხოლო გვერდზე ის named import-ად (ფიგურული ფრჩხილებით) ვიმპორტეთ.
- **გასწორება:** `import useAuth from '../hooks/useAuth'` (commit `441f727`). hook-ებზე ერთნაირი default export-ები import-ებს წინასწარ გასაგებს ხდის.
- **რა ვისწავლე:** თეთრი გვერდი თითქმის ყოველთვის runtime შეცდომაა: ჯერ Console უნდა წავიკითხო. import-მდე უნდა შევამოწმო, მოდული როგორ არის ექსპორტირებული.

## 2. მარაგი სრულად ჩანდა მაშინაც, როცა ყველაფერი კალათაში იყო

- **სიმპტომი:** პროდუქტი 29 მარაგით ისევ "29 in stock"-ს აჩვენებდა და Add to cart ღილაკი ჩართული იყო, მაშინაც კი, როცა ყველა 29 ცალი უკვე კალათაში იდო.
- **გამეორება:** ერთსა და იმავე პროდუქტს Catalog-ზე ან Product გვერდზე მრავალჯერ დაამატებ და უყურებ მარაგის ტექსტს და ღილაკს.
- **ინსტრუმენტი:** ბრაუზერში ტესტირება (Header-ის კალათის ბეჯი და Cart გვერდის რაოდენობები შევადარე მარაგის ტექსტს) და `ProductCard`-ის კოდის წაკითხვა, რომ დამენახა, რა მნიშვნელობას იყენებდა.
- **მიზეზი:** UI `product.stock`-ს (API-ს მნიშვნელობა) ადარებდა და არ ითვალისწინებდა, რამდენი ცალი უკვე კალათაში იყო.
- **გასწორება:** დავამატე `getQuantityInCart(items, productId)` (`utils/cart.ts`) და `remainingStock = product.stock - quantityInCart`; როცა 0-ს მიაღწევს, ღილაკი გამორთულია (commit `359283d`). იგივე წესი Product გვერდზეც გამოიყენება.
- **რა ვისწავლე:** წარმოებული მნიშვნელობა (დარჩენილი მარაგი) state-იდან უნდა დაითვალოს და არა პირდაპირ API-ს მონაცემიდან. ერთი დამხმარე ფუნქცია Catalog-სა და Product გვერდს ერთნაირად ამუშავებს.

## 3. გვერდის სათაური grid-ის უჯრად იქცა

- **სიმპტომი:** "Catalog" სათაური პროდუქტების grid-ში აღმოჩნდა და პირველი ბარათის ადგილი დაიკავა.
- **გამეორება:** გახსენი `/` დესკტოპის სიგანეზე.
- **ინსტრუმენტი:** ვიზუალური შემოწმება ბრაუზერში, შემდეგ JSX სტრუქტურის წაკითხვა: `h1` იყო `grid` კლასების მქონე ელემენტის პირდაპირი შვილი.
- **მიზეზი:** `h1` მოთავსებული იყო `grid grid-cols-*` კლასიან `div`-ში, ამიტომ grid მას ჩვეულებრივ ელემენტად ხედავდა.
- **გასწორება:** სათაური და grid გარე `div`-ში (`space-y-6`) გავაერთიანე, grid კი მხოლოდ ბარათებისთვის დავტოვე (commit `0e4eb63`).
- **რა ვისწავლე:** CSS grid და flex მხოლოდ პირდაპირ შვილებზე მუშაობს. თითო კონტეინერს ერთი დანიშნულება უნდა ჰქონდეს.

## 4. Header-ის ცვლილება VS Code-ის ძველმა ბუფერმა გადაწერა

- **სიმპტომი:** `Header.tsx`-ის ცვლილება (burger მენიუ, მოგვიანებით მობილური მენიუს განლაგება) დისკზე ჩაიწერა, მაგრამ ბრაუზერი ისევ ძველ Header-ს აჩვენებდა და ფაილი წინა ვერსიაზე დაბრუნდა.
- **გამეორება:** VS Code-ში ღია გაქვს ფაილი ძველი შიგთავსით, სანამ სხვა ინსტრუმენტი იმავე ფაილს დისკზე გადაწერს, და მერე ტაბს შეინახავ.
- **ინსტრუმენტი:** დისკზე არსებული ფაილის შიგთავსის შედარება VS Code-ის ტაბთან და `git status` / `git diff`.
- **მიზეზი:** ღია ტაბი ძველ ვერსიას ინახავდა და შენახვისას ახალი ვერსია გადაწერა.
- **გასწორება:** ტაბი დავხურე შენახვის გარეშე (Don't Save), ფაილი თავიდან გავხსენი, ცვლილება გავიმეორე და commit-მდე დისკზე შიგთავსი და ზომა გადავამოწმე (commits `9be0486`, `7890720`).
- **რა ვისწავლე:** სანამ ფაილს რედაქტორის გარეთ ვცვლი, მისი ტაბი უნდა დავხურო ან Revert ვუყო; ყოველი commit-ის წინ `git diff` უნდა ვნახო და დავრწმუნდე, რა არის რეალურად დისკზე.

## 5. Lighthouse-მა ლოკალურად "NO_FCP" და ძალიან დაბალი Performance აჩვენა

- **სიმპტომი:** `localhost:5173`-ზე Lighthouse-მა Performance 38 აჩვენა, ერთ გაშვებაზე კი "The page did not paint any content (NO_FCP)", ყველა მეტრიკა შეცდომით.
- **გამეორება:** Lighthouse გაუშვი Vite dev სერვერზე, სანამ ფანჯრებს ან ტაბებს ცვლი.
- **ინსტრუმენტი:** Chrome DevTools Lighthouse (Mobile) და `npm run build && npm run preview`.
- **მიზეზი:** dev სერვერი კოდს არ აპატარავებს და არ აერთიანებს, ამიტომ production-ზე ბევრად ნელია; ტესტის დროს ბრაუზერის ფანჯარა წინა პლანზე უნდა იყოს.
- **გასწორება / შედეგი:** production build-ზე გაზომვამ 77 აჩვენა, lazy routes-ის, lazy სურათების და Vercel-ზე deploy-ის შემდეგ live საიტზე **Performance 94** მივიღე (სქრინები `docs/lighthouse`-შია).
- **რა ვისწავლე:** წარმადობა production build-ზე უნდა იზომებოდეს და არა dev სერვერზე.
