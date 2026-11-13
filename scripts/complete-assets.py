"""Complete runtime-generated widget URLs and any remaining local references."""
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
import importlib.util
import json

root = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('mirror', root / 'scripts' / 'mirror.py')
mirror = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mirror)
inventory = json.loads((root / 'asset-manifest.json').read_text())
inventory['failed'] = []
checked = set()
while True:
    pending = set()
    for file in mirror.OUT.rglob('*'):
        if file.suffix not in ['.js', '.css', '.html'] or file in checked:
            continue
        checked.add(file)
        path = '/' + file.relative_to(mirror.OUT).as_posix()
        for ref in mirror.references(file.read_text(), path):
            if not (mirror.OUT / ref.lstrip('/')).exists():
                pending.add(ref)
    if not pending:
        break
    with ThreadPoolExecutor(max_workers=12) as pool:
        futures = {pool.submit(mirror.fetch, path): path for path in pending}
        for future in as_completed(futures):
            path, data, kind = future.result()
            target = mirror.OUT / path.lstrip('/')
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(data)
            inventory['files'][path] = len(data)
    print('Completed', len(pending), 'assets', flush=True)
(root / 'asset-manifest.json').write_text(json.dumps(inventory, indent=2))
