# Stock Scanner Pro

A single-file, client-only stock screening tool (no backend). It screens ~3,400 Nasdaq Composite tickers with a free price-history pass (Stage 1), then deep-scores the survivors on 86 points (43 fundamental + 43 technical) in Stage 2. Educational use only — not financial advice.

## What's in this repo

| File | Purpose |
|---|---|
| `index.html` | The whole app (HTML + CSS + JS). |
| `cloudflare-cors-proxy-worker.js` | Optional: your own free Cloudflare Worker CORS proxy (replaces the dead public proxies). |
| `PRIVACY.md` | Privacy policy (linked from the app's About screen). |
| `.nojekyll` | Tells GitHub Pages to serve files as-is. |
| `.gitignore` | Keeps exported scan data and keys out of git. |

**Not included here — keep your existing copies:** `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`, `splash-1080x1920.png`. `index.html` references them; they were not part of this update.

> **Service worker note:** if your `sw.js` caches `index.html` under a version name (e.g. `CACHE = 'scanner-v12'`), bump that version when you publish this update, otherwise installed copies may keep serving the old page.

## Deploy on GitHub Pages
1. Put these files (plus your manifest/sw/icons) in the repo root.
2. Settings → Pages → Deploy from branch → `main` / root.
3. Open `https://<user>.github.io/<repo>/`.

## Optional: your own CORS proxy (Cloudflare Worker)
1. Free account at dash.cloudflare.com → Workers & Pages → Create Worker.
2. Paste `cloudflare-cors-proxy-worker.js`, Deploy.
3. In the app: Settings → CUSTOM CORS PROXY → paste `https://<name>.<you>.workers.dev/?url={url}` → Save → Test → tick "Use my proxy".

## Saving exports to a folder
Settings → EXPORT FOLDER → choose a folder (Chrome/Edge/Chromium WebView). The first EXPORT PROGRESS click also offers this. Firefox/Safari fall back to normal downloads.

## Scoring in one paragraph
Stage 1 promotes a ticker only if price is inside the Fibonacci Golden Zone (38.2–61.8% of the 52-week range), RSI(14) is 42–81, price ≥ 90% of MA200 and MA50 ≥ 98% of MA200. Stage 2 scores 86 points; Pass = clean data-quality gate and total ≥ threshold (default 55). Full, exact criteria are in the app's **About** screen.
