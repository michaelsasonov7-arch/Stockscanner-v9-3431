# Privacy Policy — Stock Scanner Pro

**Short version: there is no server, no account, no analytics, and no tracking.**

- **Runs entirely in your browser / app.** All scoring happens on your device.
- **API keys** you enter are stored only in your browser's local storage on your device, in plain text. They are sent only to the data provider they belong to (Finnhub, Twelve Data, FMP, etc.), directly from your device. Prefer restricted / read-only keys where a provider offers them.
- **Scan progress and results** are stored in your browser's local storage and in the JSON files you choose to export. If you pick an export folder, files are written only into that folder on your device.
- **Network requests** go to: the market-data providers you configure, Yahoo Finance and Stooq (no key), Nasdaq Trader / a GitHub mirror (ticker list), Google Fonts (typefaces), and optionally the CORS proxy you configure (public proxies or your own Cloudflare Worker). Those services see your IP address and the tickers requested, as with any website.
- **No data is sent to the author** of this app.
- **Not financial advice.** This is an educational screening tool; scores are not predictions.

To erase everything: use "RESET ALL PROGRESS", then clear the site's data in your browser settings (or uninstall the app).
