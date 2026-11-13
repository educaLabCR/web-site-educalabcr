"""Rebrand the verified animation build without changing its animation timings."""
from pathlib import Path
from html import escape, unescape
from html.parser import HTMLParser
import json, os, re, subprocess, hashlib

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
REFERENCE = ROOT / 'reference'
PREVIEW_SITE = 'https://causal-motion-replica.laboratorio-2471.chatgpt.site'
SITE = os.environ.get('SITE_URL', 'https://www.educalabcr.com').rstrip('/')
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
 'EducaLabCR integra tecnología, formación e innovación aplicada en Costa Rica. El ecosistema reúne Sigma Docente, TEKU, LUMA, Relay, la práctica de idoneidad docente y taskOs.',
 'Sigma Docente es la plataforma de registro y gestión educativa. Incluye asistencia, reportes de notas, Lápiz para generar materiales con inteligencia artificial y Ágora. Hay una demostración pública.',
 'TEKU es un piloto para investigar y escribir una tesis o un proyecto, con tutor socrático y editor con fuentes. El piloto está en línea.',
 'LUMA genera presentaciones en español, con modo Docente IA y 18 familias visuales. No hay una dirección pública verificada: el acceso se consulta con el equipo. Este sitio no publica planes ni cupos de uso.',
 'Relay es la plataforma de agentes conversacionales, con base de conocimiento y atención en tiempo real. El panel está en línea. Relay Ventas, el agente de WhatsApp, es un producto distinto y se consulta aparte.',
 'Es un simulador de las pruebas de idoneidad docente del MEP, con tutoría de inteligencia artificial. El acceso se consulta con el equipo porque no hay una dirección pública verificada.',
 'taskOs es el gestor de tareas para una institución o para varias organizaciones. La aplicación está en línea.',
 'Sí. Hay una oferta formativa para docentes. El catálogo publicado aquí sale del sitio anterior y falta confirmar vigencia e inscripción.',
 'Por WhatsApp, al +506 7014 7031. Es el canal publicado. No hay un correo público confirmado en este sitio.'
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
 'Sigma Docente, TEKU, LUMA, Relay, la práctica de idoneidad docente y taskOs forman el ecosistema. Si un producto no tiene dirección pública, el camino es el contacto.'
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
      'https://app.causal.so':'/contacto',
      'https://causal.so':SITE,
      'mailto:contact@causal.so':'/contacto',
      'https://www.tiktok.com/@causal.so':'/oferta-asincronica',
      'https://substack.com/@causalsoftware':'/contacto',
      'https://medium.com/@contact_51009':'/contacto',
      'https://chromewebstore.google.com/detail/causal/nabiapfblhojpofjfdkmmolihdpmcmjg':'/oferta-asincronica',
    }
    for a,b in replacements.items():s=s.replace(a,b)
    s=re.sub(r'https://docs\.google\.com/forms/[^`"\s<>]+','/contacto',s)
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
        content=content.replace('Prepará tus clases con nuevas herramientas.\\nGestión, recursos e inteligencia artificial.','Sigma Docente: registro y gestión educativa.\\nAsistencia, reportes, Lápiz y demostración.')
        content=content.replace(
            'items:[g,_,v,y,x,b]',
            'items:[g,_,{label:`Maletín de profe`,href:`/guias/maletin-de-profe`},v,y,x,b]'
        )
        menu='h={id:`templates`,label:`Productos`,items:[{label:`Productos`,href:`/productos`},{label:`Herramientas`,href:`/herramientas`}]}'
        menu_next='h={id:`templates`,label:`Productos`,items:[{label:`Sigma Docente`,href:`/docentes`},{label:`TEKU`,href:`/teku`},{label:`LUMA`,href:`/luma`},{label:`Relay`,href:`/relay`},{label:`Idoneidad docente`,href:`/idoneidad`},{label:`taskOs`,href:`/taskos`},{label:`Todos los productos`,href:`/productos`},{label:`Herramientas`,href:`/herramientas`}]}'
        if menu not in content:
            raise SystemExit('No se encontró el menú de productos para actualizarlo.')
        content=content.replace(menu, menu_next)
        content=content.replace('href:`/oferta-asincronica`,external:!0','href:`/oferta-asincronica`')
        content=content.replace('href:`/contacto`,external:!0','href:`/contacto`')
    if path.name.startswith(('founders-','designers-','content-creators-')):
        for a,b in PATHS.items():
            content=content.replace('slug:`'+a[1:]+'`','slug:`'+b[1:]+'`')
        title={'founders-':'Docentes','designers-':'Instituciones','content-creators-':'Equipos'}[next(k for k in ['founders-','designers-','content-creators-'] if path.name.startswith(k))]
        content=re.sub(r'meta:\{title:`[^`]*`,description:`[^`]*`\}', 'meta:{title:`'+title+' · EducaLabCR`,description:`Soluciones de tecnología, formación e inteligencia artificial para '+title.lower()+'. Conocé el ecosistema EducaLabCR.`}',content,count=1)
    if path.name.startswith('templates-BQc'):
        content=re.sub(r'(function h\(\)\{return u\(\{)title:`[^`]*`,description:`[^`]*`',r'\1title:`Productos · EducaLabCR`,description:`Sigma Docente, TEKU, LUMA, Relay, la práctica de idoneidad docente y taskOs.`',content,count=1)
    if path.name.startswith('root-'):
        content=content.replace('lang:`en`','lang:`es`').replace('/favicon.svg','/favicon.svg?v=original').replace('/apple-touch-icon.png','/apple-touch-icon.png?v=original')
    if path.name.startswith('entry.client-'):
        # The exported React runtime provides hydration. The Spanish client
        # intentionally replaces the retained reference markup on first render.
        content=content.replace('(0,de.hydrateRoot)(document,(0,w.jsx)(S.StrictMode,{children:(0,w.jsx)(ue,{})}))','(0,de.hydrateRoot)(document,(0,w.jsx)(S.StrictMode,{children:(0,w.jsx)(ue,{})}),{onRecoverableError:()=>{}})')
    if path.name.startswith('CTAButton-'):
        content=content.replace('d=`/contacto`','d=`/productos`')
        content=content.replace('new URL(e),i=!1','new URL(e,window.location.origin),i=!1')
    if path.name.startswith('home-D0Nz'):
        content='import{homeCards as EL_HOME}from"./educalab-catalog.js";'+content
        home_fn='function Jt(){let e=(0,F.useRef)(null),i=r();return A(e),(0,I.jsxs)(`section`,{ref:e,id:`templates`,className:`bg-canvas px-6 py-section`,children:[(0,I.jsx)(N,{children:(0,I.jsxs)(`div`,{className:`flex items-baseline justify-between gap-6`,children:[(0,I.jsx)(`h2`,{"data-reveal":`0`,className:`text-h2 text-balance text-ink`,children:`Conozca los productos.`}),(0,I.jsx)(`a`,{href:`/productos`,onClick:a(`/productos`,i),"data-reveal":`0`,className:`shrink-0 rounded-sm text-body text-muted transition-ui hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink`,children:`Ver todos`})]})}),(0,I.jsx)(`div`,{"data-reveal":`1`,className:`home-product-grid mt-section-gap`,children:EL_HOME.map(function(p){return (0,I.jsxs)(`a`,{href:p.href,className:`home-product-card`,children:[(0,I.jsx)(`span`,{className:`home-product-status`,children:p.status}),(0,I.jsx)(`strong`,{children:p.name}),(0,I.jsx)(`p`,{children:p.text})]},p.href);})})]})}'
        content,count=re.subn(r'function Jt\(\)\{.*?\}function Yt\(', home_fn+'function Yt(', content, count=1, flags=re.S)
        if count!=1:
            raise SystemExit('No se encontró la sección de productos de la portada.')
    if path.name.startswith('templates-CJl'):
        content=content.replace('let p=n(`${r}/?template=${encodeURIComponent(e.templateId)}`);','let p=e.title.startsWith(`Sigma`)?`https://demo.educalabcr.tech/`:`/contacto`;')
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
            s=s.replace('href="/favicon.svg"','href="/favicon.svg?v=original"').replace('href="/apple-touch-icon.png"','href="/apple-touch-icon.png?v=original"')
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
    overrides={'pricing-ZHN3mqYo.js':'asesoria','widgets-ihvTmkU0.js':'herramientas','mcp-Ca934RkT.js':'ecosistema','roadmap-D5mykkA3.js':'novedades','terms-CwMKEoHm.js':'informacion','privacy-DVPp2xJC.js':'privacidad','blog-13nxhvWj.js':'guias','blogPost-DvcKXR_v.js':'articulo','templates-BQc-0gdl.js':'productos'}
    for module,key in overrides.items():
        (DIST/'assets'/module).write_text(f'import {{page,metaFor}} from "./educalab-pages.js";export default page({json.dumps(key)});export function meta(a){{return metaFor({json.dumps(key)},undefined,a);}}')
    (DIST/'assets'/'founders-C_h7YC0C.js').write_text('export {default,meta} from "./educalab-docentes.js";')
    (DIST/'assets'/'educalab-docentes.js').write_text((ROOT/'scripts'/'educalab-docentes.js').read_text())
    # Valid brand metadata without the reference site's prices or platform claims.
    seo_path=DIST/'assets/seo-CEuDsIHT.js'
    faq=seo_path.read_text().split(',t=`https://')[0]
    seo=faq+';\n'+(ROOT/'scripts/educalab-seo.js').read_text().replace('__SITE_URL__', SITE)
    seo_path.write_text(seo)
    for page in DIST.rglob('*.html'):
        if page.parent.name=='widgets':continue
        s=page.read_text()
        s=re.sub(r'<title>.*?</title>','<title>EducaLabCR · Tecnología, formación e innovación</title>',s,flags=re.S)
        s=re.sub(r'<meta (?:name="description"|property="og:description") content="[^"]*"\s*/?>','<meta name="description" content="Sigma Docente, TEKU, LUMA, Relay, idoneidad docente y taskOs. EducaLabCR."/>',s)
        s=re.sub(r'<script type="application/ld\+json">.*?</script>','',s,flags=re.S)
        # The retained router bootstrap loads the branded page. Its server
        # fallback must not flash old pricing or legal copy before hydration.
        if any(page==DIST/(route.lstrip('/')+'/index.html') for route in list(overrides.values())+list(PATHS.keys())) or page.parent.parent.name=='guias':
            s=re.sub(r'<main\b.*?</main>','<main class="brand-page"><div class="brand-page-intro"><h1>EducaLabCR</h1><p>Tecnología, formación e innovación para avanzar.</p></div></main>',s,count=1,flags=re.S)
        if page==DIST/'docentes'/'index.html':
            s=re.sub(r'<main\b.*?</main>','<main class="brand-page"><div class="brand-page-intro"><p class="brand-eyebrow">Sigma Docente · EducaLabCR</p><h1>Su aula, con el registro en orden.</h1><p>Registro y gestión educativa, con demostración pública.</p></div></main>',s,count=1,flags=re.S)
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
    (DIST/'assets/educalab-catalog.js').write_text((ROOT/'scripts/educalab-catalog.js').read_text())
    # Superseded reference URLs lead to the corresponding Spanish content.
    redirects={DIST/a[1:]/'index.html':b for a,b in PATHS.items()}
    redirects.update({p:'/herramientas' for p in (DIST/'widgets').glob('*.html')})
    redirects.update({p:'/guias/'+SLUGS[p.parent.name] if p.parent.name in SLUGS else '/guias' for p in (DIST/'blog').glob('*/index.html')})
    for p,destination in redirects.items():
        p.write_text('<!doctype html><html lang="es"><meta charset="utf-8"><title>EducaLabCR</title><meta http-equiv="refresh" content="0;url='+destination+'"><link rel="canonical" href="'+SITE+destination+'"><p><a href="'+destination+'">Continuar a EducaLabCR</a></p></html>')
    # Remove preview-only indexing metadata and point static crawlers to the
    # public domain before packaging this build for a production host.
    for page in DIST.rglob('*'):
        if not page.is_file() or page.suffix not in {'.html', '.js', '.webmanifest'}:
            continue
        content = page.read_text()
        content = content.replace(PREVIEW_SITE, SITE)
        if page.suffix == '.html':
            content = re.sub(r'<meta\b[^>]*name=["\']robots["\'][^>]*>', '', content, flags=re.I)
            relative = page.relative_to(DIST).parent.as_posix()
            route = '/' if relative == '.' else '/' + relative.strip('/') + '/'
            redirect = re.search(r'<meta http-equiv="refresh" content="0;url=([^"]+)"', content, flags=re.I)
            if redirect:
                route = redirect.group(1)
                if route != '/' and not route.endswith('/'):
                    route += '/'
            content = re.sub(r'(<meta\b[^>]*property="og:url"[^>]*content=")[^"]*(")', lambda m: m.group(1) + SITE + route + m.group(2), content, flags=re.I)
            content = re.sub(r'(<link\b[^>]*rel="canonical"[^>]*href=")[^"]*(")', lambda m: m.group(1) + SITE + route + m.group(2), content, flags=re.I)
        page.write_text(content)
    subprocess.run(['python3',str(ROOT/'scripts/educalab-ideas.py')],check=True)
    subprocess.run(['python3',str(ROOT/'scripts/educalab-original-logo.py')],check=True)
    publish_product_routes()
    print('EducaLabCR adaptation built: Spanish navigation, content, imagery and routes.')

def publish_product_routes():
    """Static shells and router entries for contact, training and product pages."""
    shell=(DIST/'docentes'/'index.html').read_text()
    pages=[
      ('contacto','Contacto · EducaLabCR','Escriba a EducaLabCR por WhatsApp +506 7014 7031.','Contacto','Escríbanos por WhatsApp.','El canal publicado es WhatsApp +506 7014 7031.','contacto',None),
      ('oferta-asincronica','Oferta formativa · EducaLabCR','Cursos y talleres para docentes. El catálogo está pendiente de confirmación.','Formación docente','Oferta formativa para docentes.','Catálogo del sitio anterior, con lo que falta confirmar marcado.','oferta',None),
      ('teku','TEKU · EducaLabCR','Piloto de investigación y tesis, con tutor socrático.','Piloto público','TEKU','Espacio de investigación y escritura. El piloto está en línea.','producto','teku'),
      ('luma','LUMA · EducaLabCR','Presentaciones con inteligencia artificial. El acceso se consulta.','Por consulta','LUMA','Generador de presentaciones en español, sin dirección pública verificada.','producto','luma'),
      ('relay','Relay · EducaLabCR','Agentes conversacionales. El panel está en línea.','Panel en línea','Relay','Agentes, conocimiento y conversación en tiempo real.','producto','relay'),
      ('idoneidad','Práctica de idoneidad docente · EducaLabCR','Simulador de las pruebas de idoneidad del MEP, con tutoría de IA.','Por consulta','Práctica de idoneidad docente','Simulador de las pruebas del MEP. El acceso se consulta.','producto','idoneidad'),
      ('taskos','taskOs · EducaLabCR','Gestor de tareas para una o varias organizaciones.','Aplicación en línea','taskOs','Gestión de tareas. La aplicación está en línea.','producto','taskos'),
    ]
    manifest_path=DIST/'assets'/'manifest-c95204a1.js'
    raw=manifest_path.read_text()
    prefix,payload=raw.split('=',1)
    payload=payload.strip()
    semicolon=payload.endswith(';')
    if semicolon:payload=payload[:-1]
    data=json.loads(payload)
    common=["/assets/components-BPw7i0Mu.js","/assets/jsx-runtime-rUtgpg-a.js","/assets/educalab-pages.js","/assets/educalab-catalog.js","/assets/gsap-0lxUgJa2.js","/assets/Footer-BCcEDLg4.js"]
    for path,title,description,eyebrow,heading,lead,kind,slug in pages:
        module=f'educalab-route-{path}.js'
        slug_js='undefined' if slug is None else json.dumps(slug)
        (DIST/'assets'/module).write_text(
            f'import {{page,metaFor}} from "./educalab-pages.js";export default page({json.dumps(kind)},{slug_js});export function meta(a){{return metaFor({json.dumps(kind)},{slug_js},a);}}\n'
        )
        route_id='routes/'+path
        data['routes'][route_id]={
            'id':route_id,'parentId':'routes/site','path':path,
            'hasAction':False,'hasLoader':False,'hasClientAction':False,'hasClientLoader':False,'hasClientMiddleware':False,
            'hasDefaultExport':True,'hasErrorBoundary':False,
            'module':'/assets/'+module,'imports':common,'css':[]
        }
        html=shell
        html=html.replace('import * as route2 from "/assets/founders-C_h7YC0C.js";', f'import * as route2 from "/assets/{module}";')
        html=html.replace('"routes/founders":route2', f'"{route_id}":route2')
        html=re.sub(r'<title>.*?</title>', '<title>'+escape(title)+'</title>', html, count=1, flags=re.S)
        html=re.sub(r'<meta name="description" content="[^"]*"\s*/?>', '<meta name="description" content="'+escape(description)+'"/>', html, count=1)
        main='<main class="brand-page"><div class="brand-page-intro"><p class="brand-eyebrow">'+escape(eyebrow)+'</p><h1>'+escape(heading)+'</h1><p>'+escape(lead)+'</p></div></main>'
        html=re.sub(r'<main\b.*?</main>', main, html, count=1, flags=re.S)
        route='/'+path+'/'
        html=re.sub(r'(<meta\b[^>]*property="og:url"[^>]*content=")[^"]*(")', lambda m, route=route: m.group(1)+SITE+route+m.group(2), html, flags=re.I)
        html=re.sub(r'(<link\b[^>]*rel="canonical"[^>]*href=")[^"]*(")', lambda m, route=route: m.group(1)+SITE+route+m.group(2), html, flags=re.I)
        target=DIST/path/'index.html'
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(html)
    manifest_path.write_text(prefix+'='+json.dumps(data,ensure_ascii=False,separators=(',',':'))+(';' if semicolon else ''))
    sigma=DIST/'sigma'/'index.html'
    sigma.parent.mkdir(parents=True, exist_ok=True)
    sigma.write_text('<!doctype html><html lang="es"><meta charset="utf-8"><title>Sigma Docente · EducaLabCR</title><meta http-equiv="refresh" content="0;url=/docentes"><link rel="canonical" href="'+SITE+'/docentes/"><p><a href="/docentes">Continuar a Sigma Docente</a></p></html>')

if __name__=='__main__':main()
