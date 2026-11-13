"""Build the three editorial images used by the Ideas para transformar cards."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
BRAND = DIST / 'brand'
BRAND.mkdir(parents=True, exist_ok=True)

images = {
    'idea-ensenar-ia': ROOT / 'design/ideas-transformar/ensenar-con-ia-source.png',
    'idea-materiales': ROOT / 'design/ideas-transformar/ideas-en-materiales-source.png',
    'idea-tecnologia': ROOT / 'design/ideas-transformar/tecnologia-educativa-source.png',
}

for name, source in images.items():
    image = Image.open(source).convert('RGB')
    image = ImageOps.fit(image, (900, 900), Image.Resampling.LANCZOS, centering=(0.5, 0.5))
    image.save(BRAND / f'{name}.webp', 'WEBP', quality=88, method=6)

# The home page's guide cards use these original asset URLs in the retained
# React bundle. Replace their contents to keep the client-side routes intact.
home_cards = {
    'frame-1-BtHQOXkF.webp': images['idea-ensenar-ia'],
    'frame-1-6cckXq65.webp': images['idea-materiales'],
    'frame-1-B4uZ93lQ.webp': images['idea-tecnologia'],
}
for filename, source in home_cards.items():
    image = Image.open(source).convert('RGB')
    image = ImageOps.fit(image, (768, 768), Image.Resampling.LANCZOS, centering=(0.5, 0.5))
    image.save(DIST / 'assets' / filename, 'WEBP', quality=88, method=6)

print('Prepared three EducaLabCR editorial guide images.')
