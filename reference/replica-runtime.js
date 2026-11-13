/* Keep the marketing reference independent of the original site's telemetry. */
(() => {
  const nativeFetch = window.fetch.bind(window);
  window.fetch = (input, init) => {
    const url = typeof input === 'string' ? input : input?.url || '';
    // Roadmap content is public; its account-backed actions remain on Causal.
    // Serve a local read-only snapshot rather than contacting its backend.
    if (/\/api\/roadmap(?:[/?]|$)/.test(url)) {
      if (init?.method && init.method !== 'GET') {
        return Promise.resolve(new Response(JSON.stringify({ error: 'signed_out' }), { status: 401, headers: { 'Content-Type': 'application/json' } }));
      }
      return Promise.resolve(new Response(JSON.stringify({ counts: { tables: 1, homepage: 2, 'background-remover': 1, 'real-time-collaboration': 2 }, voted: [], viewer: null }), { status: 200, headers: { 'Content-Type': 'application/json' } }));
    }
    if (/\/(ingest|_vercel)\//.test(url) || /posthog|vercel-insights/.test(url)) {
      return Promise.resolve(new Response('{}', { status: 200, headers: { 'Content-Type': 'application/json' } }));
    }
    return nativeFetch(input, init);
  };
  const append = Element.prototype.appendChild;
  Element.prototype.appendChild = function (node) {
    if (node.tagName === 'SCRIPT' && /ingest|_vercel|posthog|vercel-scripts/.test(node.src || '')) return node;
    return append.call(this, node);
  };
})();
