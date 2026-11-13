"""Rebrand the verified animation build without changing its animation timings."""
from pathlib import Path
from html import escape, unescape
from html.parser import HTMLParser
import json, re, subprocess, hashlib

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
REFERENCE = ROOT / 'reference'
SITE = 'https://causal-motion-replica.laboratorio-2471.chatgpt.site'
PATHS = {'/founders':'/docentes','/designers':'/instituciones','/content-creators':'/equipos','/templates':'/productos','/pricing':'/asesoria','/widgets':'/herramientas','/mcp':'/ecosistema','/blog':'/guias','/roadmap':'/novedades','/terms':'/informacion','/privacy':'/privacidad'}
SLUGS={'how-we-built-our-website-with-claude':'ensenar-con-ia','canvas-ai':'ideas-en-materiales','product-design':'tecnologia-educativa'}
COPY = {}
for line in (ROOT/'scripts/educalab-copy.txt').read_text().splitlines():
    if '|||' in line:
        a,b = line.split('|||',1)
        COPY[a.replace('\\n','\n')] = b.replace('\\n','\n')

def original(path):
    return (REFERENCE / path).read_text()

faq_source = original('assets/seo-CEuDsIHT.js')
faq_answers = [
 'EducaLabCR integra tecnología, formación e innovación aplicada. Su ecosistema reúne herramientas para la gestión docente, la creación de materiales y el trabajo de los equipos con inteligencia artificial.',
 'Sigma acompaña la gestión académica y administrativa, el planeamiento didáctico y la preparación de recursos educativos. Podés explorar la demostración oficial para conocer sus herramientas.',
 'Las opciones dependen de la herramienta y del contexto de uso. Consultá al equipo de EducaLabCR para conocer la disponibilidad, las condiciones y el acompañamiento adecuado para tu proyecto.',
 'Luma permite transformar un tema, un texto o un apunte en una presentación. Ayuda a ordenar el contenido y a darle una forma visual clara, que después podés revisar y adaptar.',
 'Relay es una solución de agentes de inteligencia artificial y comunicación. Permite explorar formas de organizar la atención y acompañar los procesos de un equipo.',
 'Sí. EducaLabCR ofrece cursos, talleres y capacitaciones en inteligencia artificial, investigación, tecnologías educativas y desarrollo profesional. Consultá la oferta oficial vigente.',
 'Podés explorar herramientas como Sigma y Luma para preparar recursos, documentos y presentaciones. Revisá siempre el contenido y adaptalo a los objetivos y características de tu grupo.',
 'Empezá por identificar la necesidad de tu comunidad educativa: organización, materiales, comunicación o formación. El equipo de EducaLabCR puede orientarte para evaluar las alternativas.',
 'Podés usar los enlaces de contacto de este sitio para conversar con EducaLabCR a través de sus canales oficiales y contar qué necesitás para tu proyecto.'
]
for match, answer in zip(re.finditer(r'answer:`((?:\\.|[^`])*)`',faq_source),faq_answers):
    COPY[match.group(1)] = answer

MORE = {
 'Get started with templates':'Productos y herramientas',
 'New templates added regularly':'El ecosistema de EducaLabCR',
 'Explore our range of templates for various creative projects.':'Explorá soluciones para la gestión docente, la creación de materiales y el trabajo de los equipos.',
 'A founder\'s board: a reference image, a note planning the onboarding flow, this week\'s tasks and the onboarding spec':'Ejemplo ilustrativo: objetivos, recursos y tareas para preparar una clase.',
 'A designer\'s board for the Ai in Design 2026 key visual: the poster, a salmon colour sampled from it, a lilac note on the direction and the report as a PDF':'Ejemplo ilustrativo de materiales educativos de EducaLabCR.',
 'The Causal app: a note and a PDF dragged from a board into a page, then the assistant answering a question about a client call':'Vista ilustrativa: de las ideas y los recursos a una propuesta de clase.',
 'A sentence selected and set in bold':'Una idea toma forma en un documento de clase.',
 'A caption opening over a picture':'Un recurso educativo acompañado por su descripción.',
 'A pasted link unfolding into a card':'Un enlace se convierte en un recurso organizado.',
 'A colour swatch cycling through orange, grey, deep brown and cream':'Una selección de colores para dar identidad a tus materiales.',
 'A voice memo playing and transcribing itself':'Una nota de voz se convierte en texto.',
 'A brush, a highlighter and an eraser drawing the Causal mark':'Herramientas de dibujo en una demostración creativa.',
 'A widget morphing from habits to skills to priorities':'Una demostración de organización y prioridades.',
 'An assistant turning a conversation into cards on the canvas':'Una demostración de un asistente que organiza una propuesta.',
 'Saving a page to a Causal canvas from Chrome':'Una demostración de guardado de recursos.',
 'A note dragged from the canvas into a page':'Un recurso se incorpora a un documento de clase.',
 'Copying the link to a shared canvas':'Una demostración de cómo compartir un recurso.',
 'Stripe checkout':'Preparar la clase','Welcome email':'Revisar materiales','Invite 20 testers':'Compartir con el equipo','Onboarding flow':'Secuencia de aprendizaje','Onboarding spec':'Guía de trabajo','Ai in Design 2026':'Recursos para aprender','Ai in Design report':'Propuesta educativa','Shot list':'Secuencia de actividades','Coffee shoot':'Proyecto de clase','Green backdrop':'Recursos de Sigma','Brand direction':'Objetivos de la propuesta','Kickoff call':'Próximos pasos','Brand guidelines':'Guía de herramientas','Client brief':'Propuesta de trabajo','Pay screen':'Experiencia de aprendizaje','Swipe down':'Seguí explorando','Homepage hero':'Página de inicio','Type scale':'Jerarquía visual','Logo refresh':'Identidad del proyecto','Colour palette':'Paleta de colores','Onboarding emails':'Comunicación del equipo','Pricing page':'Opciones disponibles','MacBook Pro review':'Presentación con Luma','Hooks and script':'Ideas y contenido','Unboxing':'Introducción','Voiceover':'Narración','Script':'Contenido','Read MacBook Pro review':'Revisar la propuesta','What did we shoot yesterday?':'¿Qué preparamos para la clase?','Write a script from these photos':'Organizá estas ideas en una propuesta','Writing script…':'Preparando el contenido…','Wrote a 30-second script':'La propuesta está lista para revisar','Turn my Launch board\ninto a working app':'Organizá las ideas\npara mi próxima clase','Reading Launch board':'Revisando la propuesta','Read Launch board':'Propuesta revisada','Building the app':'Preparando la estructura','Built the app':'Estructura preparada','Done. It has a screen for\neach column, and every card\nis a task you can tick off.':'Listo. La propuesta organiza\nlos objetivos, los recursos\ny los siguientes pasos.',
 'Brand voice':'Nuestra propuesta','Close':'Cerrar','Previous':'Anterior','Next':'Siguiente','New':'Nuevo','Updated':'Actualizado','More':'Más','Today':'Hoy','Yesterday':'Ayer','Search':'Buscar','Save':'Guardar','Cancel':'Cancelar','Delete':'Eliminar','Reset':'Reiniciar','Loading':'Cargando','Untitled':'Sin título','Assistant is ready':'Asistente preparado','Regular text':'Texto normal','Launch sync':'Propuesta de clase','SM-2':'EducaLabCR','Dark':'Oscuro','Light':'Claro',
}
COPY.update(MORE)

PARAGRAPHS = {
 'animations':[
 'Definí los objetivos de aprendizaje y prepará los recursos que acompañan tu propuesta.',
 'La tecnología ayuda a organizar las ideas; tu criterio profesional orienta cada decisión.',
 'Reuní los materiales, revisá el contenido y adaptalo a las necesidades de tu grupo.',
 'Compartí la propuesta con tu equipo y construí los siguientes pasos de forma colaborativa.'
 ],
 'blog':[
 'La inteligencia artificial puede acompañar la preparación de materiales y la organización del trabajo. El punto de partida es una necesidad concreta y un objetivo claro.',
 'Elegí las herramientas según tu contexto. Revisá la información, adaptá las propuestas y conservá el criterio profesional sobre cada resultado.',
 'Sigma, Luma y Relay permiten explorar distintas posibilidades dentro del ecosistema de EducaLabCR. Consultá al equipo para conocer las opciones adecuadas para tu proyecto.'
 ]
}
TECH = re.compile(r'(?:\b(?:flex|grid|absolute|relative|inline|block|hidden|rounded|transition|text-|bg-|px-|py-|gap-|items-|justify-|overflow-|opacity-|h-full|w-full)\b|[{}<>]|\$\{|(?:rgba?|calc|clamp|minmax|var|translate|scale|inset|linear-gradient)\()')
def translated(s, context='', fallback=False):
    s = s.replace('\\`','`')
    if s in COPY: return COPY[s]
    stripped = s.strip()
    if stripped in COPY:
        start=s[:len(s)-len(s.lstrip())]; end=s[len(s.rstrip()):]
        return start+COPY[stripped]+end
    if fallback and len(s.split()) >= 6 and re.match(r'^[A-Z][a-z]+\b',s) and not re.match(r'^[Mm][\d\s.,-]',s) and not TECH.search(s) and not re.search(r'\b(?:function|return|const|let|document|window|Error|SDK|GSAP)\b',s):
        pool=PARAGRAPHS['blog' if 'blog' in context else 'animations']
        return pool[int(hashlib.sha256(s.encode()).hexdigest()[:8],16)%len(pool)]
    return s.replace('Causal Software Limited','EducaLabCR').replace('Causal','EducaLabCR')

def urls(s):
    replacements={
      'https://app.causal.so':'https://www.educalabcr.com/contacto',
      'https://causal.so':SITE,
      'mailto:contact@causal.so':'https://www.educalabcr.com/contacto',
      'https://www.tiktok.com/@causal.so':'https://www.educalabcr.com/oferta-asincronica',
      'https://substack.com/@causalsoftware':'https://www.educalabcr.com/contacto',
      'https://medium.com/@contact_51009':'https://www.educalabcr.com/contacto',
      'https://chromewebstore.google.com/detail/causal/nabiapfblhojpofjfdkmmolihdpmcmjg':'https://www.educalabcr.com/oferta-asincronica',
    }
    for a,b in replacements.items():s=s.replace(a,b)
    s=re.sub(r'https://docs\.google\.com/forms/[^`"\s<>]+','https://www.educalabcr.com/contacto',s)
    for a,b in sorted(PATHS.items(),key=lambda x:-len(x[0])):
        s=s.replace('`'+a+'`','`'+b+'`').replace('"'+a+'"','"'+b+'"').replace('"'+a+'#','"'+b+'#').replace('`'+a+'#','`'+b+'#')
        # Route paths in the React Router manifest and source route data.
        s=s.replace('"path":"'+a[1:]+'"','"path":"'+b[1:]+'"')
    s=s.replace('/blog/${','/guias/${').replace('"path":"blog/:slug"','"path":"guias/:slug"')
    for a,b in SLUGS.items():
        s=s.replace('/blog/'+a,'/guias/'+b).replace('/guias/'+a,'/guias/'+b).replace('slug:`'+a+'`','slug:`'+b+'`')
    s=s.replace('/novedades#changelog','/novedades')
    return s

def process_js(path, content):
    excluded=('entry.client','components-','errorBoundaries-','gsap-','sectionLink-','jsx-runtime-')
    if not path.name.startswith(excluded):
        def backtick(m):
            raw=m.group(1)
            if '${' in raw:return m.group(0)
            value=raw.replace('\\n','\n')
            value=translated(value,path.name,True)
            return '`'+value.replace('`','\\`').replace('\n','\\n')+'`'
        content=re.sub(r'`((?:\\.|[^`\\])*)`',backtick,content)
    content=urls(content)
    if path.name.startswith('home-'):
        content=content.replace('children:(0,I.jsx)(y,{size:`100%`,playing:n})','children:(0,I.jsx)(`video`,{className:`brand-home-video`,src:`/brand/educalab-home.mp4`,poster:`/brand/educalab-home-poster.webp`,controls:!0,autoPlay:!ye(),muted:!0,loop:!0,playsInline:!0,preload:`metadata`,"aria-label":`Video de presentación de EducaLabCR`})',1)
        content=content.replace('aspect-[1100/596] w-full max-w-content','aspect-video w-full max-w-content',1)
        content=re.sub(r'var nn=3;function rn\(\).*?(?=function an\()', '', content, count=1, flags=re.S)
        content=content.replace(',(0,I.jsx)(rn,{})', '')
    if path.name.startswith('useIsMac-'):
        content=content.replace('Prepará tus clases con nuevas herramientas.\\nGestión, recursos e inteligencia artificial.','Sigma Docente: Registrar, Planear y Crear.\\nGestión del aula, planeamientos y recursos.')
        content=content.replace(
            'items:[g,_,v,y,x,b]',
            'items:[g,_,{label:`Maletín de profe`,href:`/guias/maletin-de-profe`},v,y,x,b]'
        )
    if path.name.startswith(('founders-','designers-','content-creators-')):
        for a,b in PATHS.items():
            content=content.replace('slug:`'+a[1:]+'`','slug:`'+b[1:]+'`')
        title={'founders-':'Docentes','designers-':'Instituciones','content-creators-':'Equipos'}[next(k for k in ['founders-','designers-','content-creators-'] if path.name.startswith(k))]
        content=re.sub(r'meta:\{title:`[^`]*`,description:`[^`]*`\}', 'meta:{title:`'+title+' · EducaLabCR`,description:`Soluciones de tecnología, formación e inteligencia artificial para '+title.lower()+'. Conocé el ecosistema EducaLabCR.`}',content,count=1)
    if path.name.startswith('templates-BQc'):
        content=re.sub(r'(function h\(\)\{return u\(\{)title:`[^`]*`,description:`[^`]*`',r'\1title:`Productos · EducaLabCR`,description:`Explorá Sigma, Luma y Relay. Soluciones para la gestión educativa, las presentaciones y los agentes de inteligencia artificial.`',content,count=1)
    if path.name.startswith('root-'):
        content=content.replace('lang:`en`','lang:`es`').replace('/favicon.svg','/favicon.svg?v=original').replace('/apple-touch-icon.png','/apple-touch-icon.png?v=original')
    if path.name.startswith('entry.client-'):
        # The exported React runtime provides hydration. The Spanish client
        # intentionally replaces the retained reference markup on first render.
        content=content.replace('(0,de.hydrateRoot)(document,(0,w.jsx)(S.StrictMode,{children:(0,w.jsx)(ue,{})}))','(0,de.hydrateRoot)(document,(0,w.jsx)(S.StrictMode,{children:(0,w.jsx)(ue,{})}),{onRecoverableError:()=>{}})')
    if path.name.startswith('CTAButton-'):
        content=content.replace('https://www.educalabcr.com/contacto','/productos')
        content=content.replace('new URL(e),i=!1','new URL(e,window.location.origin),i=!1')
    if path.name.startswith('templates-CJl'):
        content=content.replace('let p=n(`${r}/?template=${encodeURIComponent(e.templateId)}`);','let p=e.title.startsWith(`Sigma`)?`https://demo.educalabcr.tech/`:`https://www.educalabcr.com/contacto`;')
        content=content.replace('${e.title} template preview','Vista de ${e.title}')
        content=content.replace('title:`Novedades`','title:`Planificación docente`')
    if path.name.startswith('Footer-'):
        content=content.replace('label:`Sitio oficial`,href:`#`','label:`Sitio oficial`,href:`https://www.educalabcr.com/`').replace('label:`WhatsApp`,href:`#`','label:`WhatsApp`,href:`https://wa.me/50670147031`')
    if path.name.startswith('Reviews-'):
        # These cards describe use cases, rather than claiming customer reviews.
        content=content.replace('`blockquote`','`p`')
    if path.name.startswith('animations-'):
        content=re.sub(r'mn=\[\[.*?\]\],hn=', 'mn='+json.dumps([['Listo.','Tu','propuesta','ya','tiene','forma.'],['Objetivos,','materiales','y','actividades','conectados'],['para','acompañar','a','tu','grupo','paso','a','paso.']],ensure_ascii=False)+',hn=',content,count=1)
    return content

class SpanishHTML(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True);self.out=[];self.code=0
    def handle_decl(self,d):self.out.append('<!'+d+'>')
    def handle_starttag(self,tag,attrs):
        if tag in ['script','style']:self.code+=1
        self.out.append('<'+tag+''.join(' '+k+(('="'+escape(translated(v,'html',True),quote=True)+'"') if v is not None else '') if k in ['alt','title','aria-label','placeholder'] else ' '+k+(('="'+escape(v,quote=True)+'"') if v is not None else '') for k,v in attrs)+'>')
    def handle_startendtag(self,tag,attrs):self.handle_starttag(tag,attrs)
    def handle_endtag(self,tag):
        self.out.append('</'+tag+'>')
        if tag in ['script','style']:self.code=max(0,self.code-1)
    def handle_comment(self,d):self.out.append('<!--'+d+'-->')
    def handle_data(self,d):self.out.append(d if self.code else escape(translated(d,'html',True),quote=False))

def main():
    tracked=['dist/'+p.relative_to(REFERENCE).as_posix() for p in REFERENCE.rglob('*') if p.is_file()]
    for tracked_path in tracked:
        relative=tracked_path.removeprefix('dist/')
        p=DIST/relative
        if p.suffix=='.js':p.write_text(process_js(p,original(relative)))
        elif p.suffix=='.html' and (not relative.startswith('widgets/') or relative=='widgets/index.html'):
            s=original(relative).replace('<html lang="en">','<html lang="es">')
            parser=SpanishHTML();parser.feed(s);s=''.join(parser.out)
            s=s.replace('<head>','<head><meta name="robots" content="noindex,nofollow"/>',1).replace('href="/favicon.svg"','href="/favicon.svg?v=original"').replace('href="/apple-touch-icon.png"','href="/apple-touch-icon.png?v=original"')
            # Keep the server document as a bootstrap; the client builds branded
            # content from the translated route modules without hydration mismatch.
            s=urls(s)
            for a,b in PATHS.items():s=s.replace('href="'+a,'href="'+b)
            s=s.replace('Causal AI Canvas Workspace for Creative Projects','EducaLabCR | Tecnología, formación e innovación')
            s=s.replace('Causal','EducaLabCR')
            p.write_text(s)
    # Distinct route files remain accessible under their Spanish paths.
    for a,b in PATHS.items():
        source=DIST/a[1:]/'index.html'
        target=DIST/b[1:]/'index.html';target.parent.mkdir(exist_ok=True,parents=True)
        if source.exists():target.write_text(source.read_text())
    for a,b in SLUGS.items():
        target=DIST/'guias'/b/'index.html';target.parent.mkdir(exist_ok=True,parents=True)
        source=DIST/'blog'/a/'index.html'
        target.write_text(source.read_text())
    # The teacher resource kit uses the existing dynamic guide article route.
    kit_page=DIST/'guias'/'maletin-de-profe'/'index.html'
    kit_page.parent.mkdir(exist_ok=True,parents=True)
    kit_page.write_text((DIST/'guias'/'ensenar-con-ia'/'index.html').read_text())
    overrides={'pricing-ZHN3mqYo.js':'asesoria','widgets-ihvTmkU0.js':'herramientas','mcp-Ca934RkT.js':'ecosistema','roadmap-D5mykkA3.js':'novedades','terms-CwMKEoHm.js':'informacion','privacy-DVPp2xJC.js':'privacidad','blog-13nxhvWj.js':'guias','blogPost-DvcKXR_v.js':'articulo'}
    for module,key in overrides.items():
        (DIST/'assets'/module).write_text(f'import {{page,meta}} from "./educalab-pages.js";export default page({json.dumps(key)});export {{meta}};')
    (DIST/'assets'/'founders-C_h7YC0C.js').write_text('export {default,meta} from "./educalab-docentes.js";')
    (DIST/'assets'/'educalab-docentes.js').write_text((ROOT/'scripts'/'educalab-docentes.js').read_text())
    # Valid brand metadata without the reference site's prices or platform claims.
    seo_path=DIST/'assets/seo-CEuDsIHT.js'
    faq=seo_path.read_text().split(',t=`https://')[0]
    seo=faq+';\n'+(ROOT/'scripts/educalab-seo.js').read_text()
    seo_path.write_text(seo)
    for page in DIST.rglob('*.html'):
        if page.parent.name=='widgets':continue
        s=page.read_text()
        s=re.sub(r'<title>.*?</title>','<title>EducaLabCR · Tecnología, formación e innovación</title>',s,flags=re.S)
        s=re.sub(r'<meta (?:name="description"|property="og:description") content="[^"]*"\s*/?>','<meta name="description" content="Explorá Sigma, Luma, Relay y la formación de EducaLabCR."/>',s)
        s=re.sub(r'<script type="application/ld\+json">.*?</script>','',s,flags=re.S)
        # The retained router bootstrap loads the branded page. Its server
        # fallback must not flash old pricing or legal copy before hydration.
        if any(page==DIST/(route.lstrip('/')+'/index.html') for route in list(overrides.values())+list(PATHS.keys())) or page.parent.parent.name=='guias':
            s=re.sub(r'<main\b.*?</main>','<main class="brand-page"><div class="brand-page-intro"><h1>EducaLabCR</h1><p>Tecnología, formación e innovación para avanzar.</p></div></main>',s,count=1,flags=re.S)
        if page==DIST/'docentes'/'index.html':
            s=re.sub(r'<main\b.*?</main>','<main class="brand-page"><div class="brand-page-intro"><p class="brand-eyebrow">Sigma Docente · EducaLabCR</p><h1>Tu aula. Tus ideas. Todo conectado.</h1><p>Registrá el progreso de tu grupo, prepará planeamientos y creá recursos educativos con Sigma.</p></div></main>',s,count=1,flags=re.S)
        if page==DIST/'index.html':
            start=re.search(r'<div\b[^>]*data-intro="walkthrough"[^>]*>',s)
            if start:
                depth=0
                for tag in re.finditer(r'</?div\b[^>]*>',s[start.start():]):
                    depth+=-1 if tag.group().startswith('</') else 1
                    if depth==0:
                        opening=start.group().replace('aspect-[1100/596]','aspect-video')
                        video='<video class="brand-home-video" src="/brand/educalab-home.mp4" poster="/brand/educalab-home-poster.webp" controls muted loop playsinline preload="metadata" aria-label="Video de presentación de EducaLabCR"></video>'
                        s=s[:start.start()]+opening+video+'</div>'+s[start.start()+tag.end():]
                        break
            s=re.sub(r'<section\b(?=[^>]*\bid="blog")[^>]*>.*?</section>', '', s, count=1, flags=re.S)
        page.write_text(s)
    css=(DIST/'assets/root-CS2DxC5N.css');css.write_text(original('assets/root-CS2DxC5N.css')+'\n'+(ROOT/'scripts/educalab-brand.css').read_text())
    runtime=original('replica-runtime.js')+'\n'+(ROOT/'scripts/educalab-runtime.js').read_text()
    (DIST/'replica-runtime.js').write_text(runtime)
    (DIST/'assets/educalab-pages.js').write_text((ROOT/'scripts/educalab-pages.js').read_text())
    # Superseded reference URLs lead to the corresponding Spanish content.
    redirects={DIST/a[1:]/'index.html':b for a,b in PATHS.items()}
    redirects.update({p:'/herramientas' for p in (DIST/'widgets').glob('*.html')})
    redirects.update({p:'/guias/'+SLUGS[p.parent.name] if p.parent.name in SLUGS else '/guias' for p in (DIST/'blog').glob('*/index.html')})
    for p,destination in redirects.items():
        p.write_text('<!doctype html><html lang="es"><meta charset="utf-8"><title>EducaLabCR</title><meta http-equiv="refresh" content="0;url='+destination+'"><link rel="canonical" href="'+SITE+destination+'"><p><a href="'+destination+'">Continuar a EducaLabCR</a></p></html>')
    subprocess.run(['python3',str(ROOT/'scripts/educalab-ideas.py')],check=True)
    subprocess.run(['python3',str(ROOT/'scripts/educalab-original-logo.py')],check=True)
    print('EducaLabCR adaptation built: Spanish navigation, content, imagery and routes.')

if __name__=='__main__':main()
