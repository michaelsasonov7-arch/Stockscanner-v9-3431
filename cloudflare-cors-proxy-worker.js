// Personal CORS proxy — deploy this as-is in a Cloudflare Worker (free tier:
// 100,000 requests/day, no credit card required).
//
// Setup:
// 1. dash.cloudflare.com/sign-up → Workers & Pages → Create → Create Worker
// 2. Edit code → paste this file entirely → Deploy
// 3. Copy your Worker's URL (https://<name>.<you>.workers.dev)
// 4. In the app's Settings tab, under "CUSTOM CORS PROXY", paste:
//      https://<name>.<you>.workers.dev/?url={url}
//    tick "Use my proxy", click SAVE PROXY, then TEST MY PROXY.
//
// This is the exact same script embedded inside index.html's Settings tab
// (Settings → Custom CORS Proxy → "COPY WORKER SCRIPT") — kept here too as a
// plain file for convenience.

export default {
  async fetch(request) {
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS',
      'Access-Control-Allow-Headers': '*',
    };
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: cors });
    }
    const reqUrl = new URL(request.url);
    const target = reqUrl.searchParams.get('url');
    if (!target) {
      return new Response('Missing ?url= parameter', { status: 400, headers: cors });
    }
    let targetUrl;
    try { targetUrl = new URL(target); }
    catch (e) { return new Response('Invalid url parameter', { status: 400, headers: cors }); }

    try {
      const upstream = await fetch(targetUrl.toString(), {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PersonalCorsProxy/1.0)' }
      });
      const body = await upstream.arrayBuffer();
      const headers = new Headers(upstream.headers);
      Object.entries(cors).forEach(([k, v]) => headers.set(k, v));
      headers.delete('content-encoding');
      headers.delete('content-length');
      return new Response(body, { status: upstream.status, headers });
    } catch (e) {
      return new Response('Upstream fetch failed: ' + e.message, { status: 502, headers: cors });
    }
  }
};
