/* Brand adaptation for dynamic demonstration fragments and accessible labels. */
(()=>{
const legacy={'/founders':'/docentes','/designers':'/instituciones','/content-creators':'/equipos','/templates':'/productos','/pricing':'/asesoria','/widgets':'/herramientas','/mcp':'/ecosistema','/blog':'/guias','/roadmap':'/novedades','/terms':'/informacion','/privacy':'/privacidad','/sigma':'/docentes'};
const path=location.pathname.replace(/\/$/,'');
if(legacy[path]){location.replace(legacy[path]+location.search+location.hash);return;}
const fragments={'Show ':'Mostrar ','Save to Causal':'Guardar recurso','Save to EducaLabCR':'Guardar recurso','Link copied':'Enlace copiado','Assistant is ready':'Asistente preparado','Copied':'Copiado','Copy':'Copiar','Open menu':'Abrir menú','Close menu':'Cerrar menú','Close sidebar':'Cerrar panel','Open assistant':'Abrir asistente','Pause':'Pausar','Play':'Reproducir','Replace':'Reemplazar','Start typing...':'Escribí tu idea…','Highlight':'Resaltar','Bold':'Negrita','Italic':'Cursiva','Underline':'Subrayado','Strikethrough':'Tachado','Bullet list':'Lista con viñetas','Numbered list':'Lista numerada','To-do list':'Lista de tareas','Caption':'Descripción','Regular text':'Texto normal','Center':'Centrar','template preview':'vista del producto','Close page':'Cerrar documento','Open page':'Abrir documento','New chat':'Nueva conversación'};
const attrNames=['aria-label','title','placeholder','alt'];
function label(value){if(!value)return value;if(fragments[value])return fragments[value];return value.replace(/^Show /,'Mostrar ').replace(/ template preview$/,' · vista del producto').replace(/\bCausal\b/g,'EducaLabCR');}
function update(node){
 if(node.nodeType===3){const value=node.nodeValue;const replacement=label(value);if(replacement!==value)node.nodeValue=replacement;return;}
 if(node.nodeType!==1)return;
 if(node.matches('script,style,code'))return;
 for(const key of attrNames){const value=node.getAttribute(key);if(value){const replacement=label(value);if(replacement!==value)node.setAttribute(key,replacement);}}
 for(const child of node.childNodes)update(child);
}
function enhancements(){
 document.documentElement.lang='es';
 const demo=document.querySelector('#hero [data-intro=walkthrough]');
 if(demo)demo.parentElement.classList.add('brand-demo-wrapper');
 if(demo&&!document.querySelector('.brand-demo-note')){const note=document.createElement('p');note.className='brand-demo-note';note.textContent='EducaLabCR · Tecnología, formación e innovación';demo.insertAdjacentElement('afterend',note);}
 const productivity=document.querySelector('#productivity > div > div');
 if(productivity)for(const index of [1,3])productivity.children[index]?.classList.add('brand-glass-tile');
 const heading=[...document.querySelectorAll('h2')].find(x=>x.textContent==='Ecosistema EducaLabCR');
 if(heading){const section=heading.closest('section');const stage=section?.querySelector('a.group');if(stage&&!stage.querySelector('.brand-ecosystem-stage')){for(const child of [...stage.children])child.style.display='none';const el=document.createElement('div');el.className='brand-ecosystem-stage';el.innerHTML='<span>Sigma</span><span>TEKU</span><span>LUMA</span><span>Relay</span><span>Idoneidad</span><span>taskOs</span>';stage.appendChild(el);}}
}
let queued=false;
const observer=new MutationObserver(records=>{for(const record of records){if(record.type==='characterData')update(record.target);else if(record.type==='attributes')update(record.target);else for(const node of record.addedNodes)update(node);}if(!queued){queued=true;requestAnimationFrame(()=>{queued=false;enhancements();});}});
observer.observe(document,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:attrNames});
document.addEventListener('DOMContentLoaded',()=>{update(document.documentElement);enhancements();});
})();


/* Slowly morphing image-derived ASCII atmosphere behind the interface. */
(()=>{
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 const fields=new Map();let frame=0,last=0;
 const art=new Image();art.src='/brand/green-glass-960.webp';
 const sample=document.createElement('canvas');sample.width=96;sample.height=64;
 const sampleContext=sample.getContext('2d',{willReadFrequently:true});let pixels=null;
 art.onload=()=>{sampleContext.drawImage(art,0,0,96,64);pixels=sampleContext.getImageData(0,0,96,64).data;for(const f of fields.values())paint(f,0);};
 const visible=new IntersectionObserver(entries=>{for(const e of entries){const f=fields.get(e.target);if(f){f.visible=e.isIntersecting;if(f.visible)paint(f,frame);}}},{rootMargin:'80px'});
 const alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]<>/+=*#%&:;';
 function hash(n){const v=Math.sin(n*127.1+311.7)*43758.5453;return v-Math.floor(v);}
 function paint(f,time){
  const {ctx,w,h}=f;if(!w||!h)return;ctx.clearRect(0,0,w,h);
  const step=w<600?23:25;const clock=motion.matches?0:time;
  ctx.font=`500 ${w<600?13:14}px ui-monospace, SFMono-Regular, Consolas, monospace`;ctx.textAlign='center';ctx.textBaseline='middle';
  let cell=0;
  for(let y=step/2;y<h;y+=step)for(let x=step/2;x<w;x+=step){
   const seed=++cell;const u=x/w,v=y/h;
   const i=(Math.min(63,Math.floor(v*64))*96+Math.min(95,Math.floor(u*96)))*4;
   const tone=pixels?(pixels[i]*.2126+pixels[i+1]*.7152+pixels[i+2]*.0722)/255:.5;
   const phase=clock/1000+hash(seed+99);
   const bucket=Math.floor(phase),fraction=phase-bucket;
   const stride=1+Math.floor(hash(seed+1)*(alphabet.length-1));
   const index=(Math.floor(hash(seed)*alphabet.length)+bucket*stride)%alphabet.length;
   const current=alphabet[index];
   const next=alphabet[(index+stride)%alphabet.length];
   const progress=Math.max(0,(fraction-.65)/.35);
   const blend=progress*progress*(3-2*progress);
   const wave=(Math.sin(u*8+v*5-clock*.0003)+1)/2;
   const alpha=.22+tone*.35+wave*.2;
   ctx.fillStyle='#d3ffe4';ctx.shadowColor='#8affbd';ctx.shadowBlur=wave> .84?5:0;
   ctx.globalAlpha=alpha*(1-blend);ctx.fillText(current,x,y);
   if(blend){ctx.globalAlpha=alpha*blend;ctx.fillText(next,x,y);}
  }
  ctx.globalAlpha=1;ctx.shadowBlur=0;
 }

 function scan(){
  for(const host of document.querySelectorAll('.brand-demo-wrapper,.brand-glass-tile,[data-closing="panel"],.brand-contact-panel')){
   if(fields.has(host))continue;
   const canvas=document.createElement('canvas');canvas.className='brand-ascii-atmosphere';canvas.setAttribute('aria-hidden','true');host.prepend(canvas);
   const ctx=canvas.getContext('2d');if(!ctx){canvas.remove();continue;}
   const f={canvas,ctx,w:0,h:0,visible:false};fields.set(host,f);
   f.resize=new ResizeObserver(()=>{const box=host.getBoundingClientRect();f.w=box.width;f.h=box.height;const ratio=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(f.w*ratio);canvas.height=Math.round(f.h*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);paint(f,frame);});f.resize.observe(host);visible.observe(host);
  }
  for(const [host,f] of fields)if(!host.isConnected){f.resize.disconnect();visible.unobserve(host);fields.delete(host);}
 }
 let queued=false;const observer=new MutationObserver(()=>{if(!queued){queued=true;requestAnimationFrame(()=>{queued=false;scan();});}});
 function start(){scan();observer.observe(document.body,{childList:true,subtree:true});}
 motion.addEventListener('change',()=>{for(const f of fields.values())paint(f,0);});
 function tick(time){if(time-last>=33){last=time;frame=time;if(!document.hidden&&!motion.matches)for(const f of fields.values())if(f.visible)paint(f,time);}requestAnimationFrame(tick);}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();requestAnimationFrame(tick);
})();
