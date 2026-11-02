# Visual validation

`tests/visual.spec.ts` records evidence without asserting exact pixel equality. Normal motion remains enabled. Captures use isolated headless Chrome, one worker, `127.0.0.1:3000` locally.

Run the local server, then in PowerShell:

```powershell
$env:VISUAL='1'
npx playwright test tests/visual.spec.ts --workers=1
```

Refresh local captures while keeping reference evidence:

```powershell
$env:VISUAL='1'
$env:LOCAL_ONLY='1'
npx playwright test tests/visual.spec.ts --workers=1
```

The eight main routes cover 1920×1080, 1440×900, 1280×800, 1024×768, 768×1024, 390×844, and 375×812. Five collection detail routes additionally cover 1440×900 and 390×844. Each side produces 66 top/full pairs, five home motion frames, four matched scroll positions, a metrics manifest, and motion metrics under `artifacts/visual/reference` or `artifacts/visual/local`.

Pages progressively scroll in 600px steps, waiting 100ms per step; settle 600ms at the bottom and again at the top. Font readiness precedes capture. Metrics include headings, major section/image bounds, font sizes, document height, horizontal overflow, HTTP status, image load state, and page errors. Reference responsive duplicates remain in metrics when they occupy layout space; compare visible elements by text and bounds rather than array index.

Motion timestamps start after DOMContentLoaded and font readiness. Screenshot encoding can exceed the requested interval, so `motion.json` records actual elapsed times. These frames establish animation behavior, not frame-perfect synchronization. The Framer badge remains in reference captures; exclude it during any future image-difference calculation.

## Results

Reference and local captures completed for all 66 route/viewport pairs. Each side reported no horizontal overflow or page errors during capture. Initial comparison exposed missing About imagery, incorrect service cards, tablet pricing columns, FAQ colors, footer details, and an animation trigger that hid the mobile service list; these were corrected. The service screenshots at 390px and 1440px were refreshed after the animation fix.

Representative initial-viewport comparisons show close alignment for the home, About, and service pages. Full-page heights still differ, especially on phones; some lower-page spacing, typography, card proportions, and motion timing remain approximate. Framer's viewport-triggered content can be hidden in a full-page capture even when it appears during normal scrolling, so full-page screenshots alone do not establish animation equivalence. The motion frames are not synchronized closely enough to claim frame-perfect timing.

Pagination revealed four more detail pages after the original capture set. Their routes and images were checked in functional tests, but they are not included in the 66-pair visual set. The reference's floating Framer promotion is intentionally omitted. Local form feedback states that no message was sent; there is no submission backend.
