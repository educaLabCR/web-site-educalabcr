"""Check that the replica's local module/stylesheet/image graph is complete."""
from pathlib import Path
import importlib.util
import json
import subprocess

root = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('mirror', root / 'scripts' / 'mirror.py')
mirror = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mirror)
dist = root / 'dist'
missing = []
for file in dist.rglob('*'):
    if not file.is_file() or file.suffix not in ['.html', '.css', '.js']:
        continue
    path = '/' + file.relative_to(dist).as_posix()
    for ref in mirror.references(file.read_text(), path):
        if not (dist / ref.lstrip('/')).is_file():
            missing.append({'from': path, 'missing': ref})
for route in mirror.ROUTES:
    if not mirror.destination(route).is_file():
        missing.append({'route': route})
manifest = json.loads((root / '.openai' / 'hosting.json').read_text())
assert manifest.get('project_id'), 'Site identity is required'
assert manifest['static']['directory'] == 'dist'
assert (dist / 'replica-runtime.js').is_file()
for route in ['docentes','instituciones','equipos','productos','asesoria','herramientas','ecosistema','guias','novedades','informacion','privacidad','guias/ensenar-con-ia','guias/ideas-en-materiales','guias/tecnologia-educativa','guias/maletin-de-profe']:
    page=dist/route/'index.html'
    assert page.is_file(),route
    assert '<html lang="es"' in page.read_text(),route
    assert 'http-equiv="refresh"' not in page.read_text(),f'{route}: Spanish routes must render directly'
for name in ['sigma.webp','luma.webp','relay.webp','lapiz.webp','idea-ensenar-ia.webp','idea-materiales.webp','idea-tecnologia.webp','educalab-mark.svg','educalab-wordmark.svg']:
    assert (dist/'brand'/name).stat().st_size>100,name
assert (dist/'og.png').is_file()
modules=list((dist/'assets').glob('*.js'))+[dist/'replica-runtime.js']
for module in modules:
    result=subprocess.run(['node','--check',str(module)],capture_output=True,text=True)
    assert result.returncode==0,result.stderr
seo=(dist/'assets/seo-CEuDsIHT.js').read_text()
assert 'priceCurrency' not in seo and 'EducaLabCR' in seo
assert not (dist/'_qa-mobile.html').exists(),'Remove the temporary QA page before packaging'
print(json.dumps({'files': len([p for p in dist.rglob('*') if p.is_file()]), 'javascript_modules_checked':len(modules),'spanish_routes':15,'missing': missing}, indent=2))
raise SystemExit(bool(missing))
