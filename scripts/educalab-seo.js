var t='__SITE_URL__',n=t+'/og.png';
function r(path){return /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(path)?path:t+path;}
function i({title,description,path,image=n}){return [{title},{name:'description',content:description},{property:'og:type',content:'website'},{property:'og:site_name',content:'EducaLabCR'},{property:'og:title',content:title},{property:'og:description',content:description},{property:'og:url',content:t+path},{property:'og:image',content:r(image)},{property:'og:image:alt',content:'EducaLabCR · Sigma, Luma y Relay'},{name:'twitter:card',content:'summary_large_image'},{tagName:'link',rel:'canonical',href:t+path}];}
var a='EducaLabCR · Tecnología, formación e innovación',o='Explorá Sigma, Luma, Relay y la formación de EducaLabCR. Tecnología con propósito para docentes, instituciones y equipos.';
var s={'@context':'https://schema.org','@type':'Organization',name:'EducaLabCR',url:'https://www.educalabcr.com/',logo:t+'/apple-touch-icon.png'};
var c={'@context':'https://schema.org','@type':'WebSite',name:'EducaLabCR',url:t+'/',description:o,inLanguage:'es-CR',publisher:s};
var l={'@context':'https://schema.org','@type':'FAQPage',mainEntity:e.map(({question,answer})=>({'@type':'Question',name:question,acceptedAnswer:{'@type':'Answer',text:answer}}))};
function u(items){return {'@context':'https://schema.org','@type':'Blog',name:'Guías de EducaLabCR',url:t+'/guias',publisher:s,blogPost:items.map(d)};}
function d(item){return {'@context':'https://schema.org','@type':'Article',headline:item.title,description:item.excerpt,publisher:s,inLanguage:'es-CR',mainEntityOfPage:t+item.href};}
export{u as a,i as c,d as i,e as l,a as n,l as o,c as r,s,o as t};
