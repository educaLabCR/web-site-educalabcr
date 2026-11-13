"""Prepare product visuals from the owner's supplied EducaLabCR references."""
from pathlib import Path
import re, math
from PIL import Image, ImageOps, ImageDraw, ImageFont
ROOT=Path(__file__).resolve().parents[1]
DIST=ROOT/'dist';BRAND=DIST/'brand';BRAND.mkdir(exist_ok=True)
SOURCE=Path('/workspace/scratch/c7cdaf368a60/educalab-materials')
sources={
 'sigma':'2a0e85aa-67db-493e-b281-35137896c5b1.png',
 'luma':'Editor Luma de presentaciones digitales.png',
 'relay':'6311d24e-ae44-4719-b542-bc308e5b830a.png',
 'lapiz':'362aa917-036f-4884-83cf-e91a117b38c4.png',
 'relay-ventas':'bd0f1ff5-0a23-47f1-a7a7-16ff52ba5b09.png',
 'lapiz-materiales':'{2D1E1B56-F787-4EC2-8CFA-1258BAD8124A}.png'
}
images={}
for key,name in sources.items():
 im=Image.open(SOURCE/name).convert('RGB')
 if key in ['sigma','relay','lapiz','relay-ventas']:
  top=round(im.height*.055) if key=='sigma' else round(im.height*.018)
  im=im.crop((0,top,im.width,im.height))
 images[key]=im
 im.save(BRAND/(key+'.webp'),'WEBP',quality=91)

raw=Path('/tmp/educalab-reference.html').read_text()
mark=re.search(r'<header.*?(<svg.*?</svg>)',raw,re.S).group(1)
mark=re.sub(r' class="[^"]*"','',mark)
mark=mark.replace('<svg ','<svg stroke="#1a2924" stroke-width="2.5" fill="none" ',1)
mark=(ROOT/'design/educalab-mark.svg').read_text() if (ROOT/'design/educalab-mark.svg').exists() else mark
(BRAND/'educalab-mark.svg').write_text(mark)
inside=re.sub(r'^<svg[^>]*>|</svg>$','',mark)
wordmark='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 48"><g transform="translate(0,3) scale(.42)" stroke="#1a2924" stroke-width="2.5" fill="none">'+inside+'</g><text x="51" y="34" font-family="Manrope,Arial,sans-serif" font-size="29" font-weight="700" letter-spacing="-1.2" fill="#1a2924">EducaLab<tspan fill="#147d70">CR</tspan></text></svg>'
wordmark=(ROOT/'design/educalab-wordmark.svg').read_text() if (ROOT/'design/educalab-wordmark.svg').exists() else wordmark
(BRAND/'educalab-wordmark.svg').write_text(wordmark)

def padded(im,size,bg='#f3f4f1'):
 target=Image.new('RGB',size,bg)
 inset=max(2,int(min(size)*.045))
 thumb=ImageOps.contain(im,(max(1,size[0]-2*inset),max(1,size[1]-2*inset)),Image.Resampling.LANCZOS)
 target.paste(thumb,((size[0]-thumb.width)//2,(size[1]-thumb.height)//2))
 return target

cycle=list(images)
original_files=list((DIST/'assets').glob('*.webp'))+list((DIST/'template-previews').glob('*.webp'))
for i,path in enumerate(original_files):
 size=Image.open(path).size
 if max(size)<=160:
  label={'maya':'S','ota':'S','isabel':'L','abel':'R','alex':'E','akriti':'E'}
  letter=next((v for k,v in label.items() if k in path.name),'E')
  im=Image.new('RGB',size,'#f8faf7');d=ImageDraw.Draw(im)
  font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',max(14,int(size[0]*.52)))
  d.text((size[0]/2,size[1]/2),letter,font=font,fill='#1e6853',anchor='mm')
 elif 'walkthrough-bg' in path.name:
  # A neutral material backdrop keeps the original glass composition legible.
  im=Image.new('RGB',size);pix=im.load()
  for y in range(size[1]):
   for x in range(size[0]):
    n=(x*13+y*31)%7-3
    v=int(223+13*math.sin(x/size[0]*5)+8*math.cos(y/size[1]*4))
    pix[x,y]=(max(0,min(255,v+n)),max(0,min(255,v+3+n)),max(0,min(255,v+n)))
 else:
  if 'video-script' in path.name or 'moodboard' in path.name:key='luma'
  elif any(t in path.name for t in ['app-plan','automation-loop','app-flow']):key='relay'
  elif any(t in path.name for t in ['weekly-planner','website-plan','video-brief']):key='sigma'
  else:key=cycle[i%len(cycle)]
  im=padded(images[key],size)
 im.save(path,'WEBP',quality=87)
print('Prepared',len(original_files),'product visuals and',len(images),'reference images.')
