"""Prepare a self-contained marketing-site replica from its public browser assets.

Only public marketing routes and static assets are collected. No app, account,
payment, or authentication endpoints are mirrored.
"""
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote
from urllib.request import Request, urlopen
import json
import re
import time

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'dist'
ORIGIN = 'https://causal.so'
ROUTES = ['/', '/founders', '/designers', '/content-creators', '/pricing',
          '/templates', '/widgets', '/mcp', '/blog', '/roadmap', '/terms', '/privacy']
seen = set()
failed = []
downloaded = {}

def fetch(path):
    url = ORIGIN + path
    for attempt in range(3):
        try:
            request = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urlopen(request, timeout=50) as response:
                return path, response.read(), response.headers.get('content-type', '')
        except Exception:
            if attempt == 2:
                raise
            time.sleep(0.4 * (attempt + 1))

def references(text, base):
    refs = set()
    # Root-relative static assets, including values in CSS and JS strings.
    for raw in re.findall(r'(?:https://causal\.so)?(/(?:assets|template-previews|widgets)/[^\s"\'`<>\\)]+)', text):
        raw = raw.replace('&amp;', '&').split('#')[0].split('?')[0]
        if re.search(r'\.(?:js|css|woff2?|webp|png|jpe?g|svg|gif|mp4|webm|html|avif|ico)$', raw):
            refs.add(raw)
    # Bundled module imports and stylesheet URLs are relative to their asset.
    for raw in re.findall(r'["\'`(]((?:\./|\.\./)[^\s"\'`<>\\)]+)', text):
        if re.search(r'\.(?:js|css|woff2?|webp|png|jpe?g|svg|gif|mp4|webm|html|avif|ico)(?:[?#].*)?$', raw):
            refs.add(urlsplit(urljoin(ORIGIN + base, raw)).path)
    # Favicons and other document-level assets.
    for raw in re.findall(r'(?:src|href)=["\'](/[^"\']+)["\']', text):
        if re.search(r'\.(?:ico|png|svg|webmanifest)$', raw):
            refs.add(raw)
    # Vite's asset lookup contains source-path keys next to the emitted hashed
    # filenames. Only the latter exist on the public server. Template literals
    # are resolved by the page/module catalog rather than fetched literally.
    refs = {p for p in refs if '..' not in p and p.startswith('/')
            and '${' not in p and not p.startswith('/assets/images/')}
    if base.endswith('.js') and '/widgets/' in text:
        for slug in re.findall(r'slug:[`"\']([a-z][a-z-]+)[`"\']', text):
            refs.add('/widgets/' + slug + '.html')
    return refs

def destination(path):
    if path in ROUTES or path.startswith('/blog/') and not Path(path).suffix:
        return OUT / path.lstrip('/') / 'index.html'
    return OUT / path.lstrip('/')

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    pending = set(ROUTES)
    while pending:
        batch = pending - seen
        pending = set()
        if not batch:
            break
        seen.update(batch)
        with ThreadPoolExecutor(max_workers=12) as pool:
            jobs = {pool.submit(fetch, p): p for p in sorted(batch)}
            for future in as_completed(jobs):
                path = jobs[future]
                try:
                    path, data, kind = future.result()
                except Exception as error:
                    failed.append({'path': path, 'error': str(error)})
                    print('FAILED', path, str(error), flush=True)
                    continue
                is_text = any(x in kind for x in ['text/', 'javascript', 'json']) or Path(path).suffix in ['.js', '.css', '.html']
                if is_text:
                    text = data.decode('utf-8')
                    pending.update(references(text, path))
                    if path.endswith('/sectionLink-B9ZEhjQ3.js'):
                        text = re.sub(r'function Rc\(\)\{.*?\}var zc=', 'function Rc(){}var zc=', text, count=1)
                    if path.endswith('/root-CMi0GVBY.js'):
                        text = text.replace('function k(e={debug:!0},t){var n;', 'function k(e={debug:!0},t){return;var n;')
                    if kind.startswith('text/html') and not path.startswith('/widgets/'):
                        # Collect article pages, but never follow the product's app links.
                        for route in re.findall(r'href=["\'](/blog/[^"\'#?]+)["\']', text):
                            pending.add(route)
                        # This is a private visual reference, excluded from search indexes.
                        text = text.replace('<head>', '<head><meta name="robots" content="noindex,nofollow"/>', 1)
                        # A tiny local compatibility layer disables source telemetry only.
                        if '/replica-runtime.js' not in text:
                            text = text.replace('</head>', '<script src="/replica-runtime.js"></script></head>', 1)
                    data = text.encode('utf-8')
                target = destination(path)
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_bytes(data)
                downloaded[path] = len(data)
        print(f'Collected {len(downloaded)} files; {len(pending-seen)} pending', flush=True)
    (ROOT / 'asset-manifest.json').write_text(json.dumps({'origin': ORIGIN, 'files': downloaded, 'failed': failed}, indent=2))
    print(json.dumps({'files': len(downloaded), 'bytes': sum(downloaded.values()), 'failed': failed}), flush=True)
    if failed:
        raise SystemExit(1)

if __name__ == '__main__':
    main()
