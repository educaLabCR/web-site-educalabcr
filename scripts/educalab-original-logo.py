"""Lay out the owner's original transparent logo assets without redrawing artwork."""
from pathlib import Path
import base64,json,subprocess
ROOT=Path(__file__).resolve().parents[1]
BRAND=ROOT/'dist'/'brand'

def fragment(source,box,x,y,w,h):
    data=base64.b64encode(source.read_bytes()).decode()
    return f'<svg x="{x}" y="{y}" width="{w}" height="{h}" viewBox="{box}" preserveAspectRatio="xMidYMid meet"><image width="2048" height="2048" href="data:image/png;base64,{data}"/></svg>'

def wrap(w,h,body):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-label="EducaLab CR">{body}</svg>'

for mode in ['light','dark','monochrome']:
    src=ROOT/'design'/'original-logos'/f'{mode}.png'
    mark=wrap(256,256,fragment(src,'270 220 1500 1180',8,30,240,196))
    wordmark=wrap(550,110,fragment(src,'270 220 1500 1180',0,7,120,96)+fragment(src,'280 1430 1480 250',143,23,407,69))
    full=wrap(1500,1630,fragment(src,'270 220 1500 1630',0,0,1500,1630))
    for kind,svg in [('mark',mark),('wordmark',wordmark),('full',full)]:
        (BRAND/f'educalab-original-{kind}-{mode}.svg').write_text(svg)
    if mode=='light':
        (BRAND/'educalab-mark.svg').write_text(mark)
        (BRAND/'educalab-wordmark.svg').write_text(wordmark)
        (ROOT/'design'/'educalab-mark.svg').write_text(mark)
        (ROOT/'design'/'educalab-wordmark.svg').write_text(wordmark)
        (ROOT/'dist'/'favicon.svg').write_text(mark)
        subprocess.run(['node','-e',"require('sharp')(process.argv[1]).resize(180,180).png().toFile(process.argv[2])",str(ROOT/'dist'/'favicon.svg'),str(ROOT/'dist'/'apple-touch-icon.png')],check=True)
manifest={'name':'EducaLab CR','short_name':'EducaLab','description':'Conocimiento, Innovación y Éxito','icons':[{'src':'/favicon.svg?v=original','type':'image/svg+xml','sizes':'any','purpose':'any'},{'src':'/apple-touch-icon.png?v=original','type':'image/png','sizes':'180x180'}],'theme_color':'#87bf58','background_color':'#f9f9f9','display':'browser'}
(ROOT/'dist'/'site.webmanifest').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
print('Original EducaLab CR logo variants prepared without redrawing.')

light=ROOT/'design'/'original-logos'/'light.png'
social=wrap(1200,630,'<rect width="1200" height="630" fill="#f9f9f9"/>'+fragment(light,'270 220 1500 1630',350,45,500,540))
(BRAND/'educalab-social.svg').write_text(social)
subprocess.run(['node','-e',"require('sharp')(process.argv[1]).png().toFile(process.argv[2])",str(BRAND/'educalab-social.svg'),str(ROOT/'dist'/'og.png')],check=True)
