/** Datos públicos del ecosistema. Solo enlaces comprobados el 13 de noviembre de 2026. */
export const whatsapp={href:'https://wa.me/50670147031',label:'WhatsApp +506 7014 7031'};

export const sigma={
 slug:'docentes',
 path:'/docentes',
 name:'Sigma Docente',
 mark:'Σ',
 color:'#144b3c',
 kicker:'Registro y gestión educativa',
 status:'Demostración pública',
 image:'/brand/sigma.webp',
 home:'Gestión académica y administrativa para instituciones y docentes, con una demostración pública.',
 summary:'Plataforma de registro y gestión educativa de EducaLabCR. La demostración pública se presenta como sistema de gestión docente para instituciones, con apoyo de inteligencia artificial.',
 audience:'Docentes, instituciones educativas y equipos de administración.',
 points:[
  ['Registro del aula','Asistencia, incluido el ajuste manual, y reportes de notas por evaluación.'],
  ['Lápiz','Generaciones con inteligencia artificial para preparar materiales. El criterio docente revisa cada resultado antes de usarlo.'],
  ['Ágora','La versión publicada de la plataforma incluye Ágora.'],
  ['Instituciones','Cada institución trabaja por separado. Existe un LMS asociado que puede importar estudiantes desde Sigma; no tiene una dirección pública verificada.']
 ],
 modules:[
  {id:'registrar',name:'Registrar',title:'El registro del aula, en un solo lugar.',text:'Reúna la operación docente que ya forma parte de la versión publicada.',items:[['Asistencia','Registro de asistencia, con ajuste manual.'],['Notas','Reportes de notas por evaluación.'],['Institución','La plataforma separa el trabajo de cada institución.']]},
  {id:'lapiz',name:'Lápiz',title:'Materiales con inteligencia artificial.',text:'Lápiz genera propuestas para acompañar la preparación. La revisión sigue en manos de quien da la clase.',items:[['Generaciones','Preparación de materiales con inteligencia artificial.'],['Criterio docente','Revise, ajuste y decida qué llega al grupo.'],['Alcance publicado','En este sitio no se describen funciones que todavía están en revisión.']]},
  {id:'agora',name:'Ágora',title:'Ágora forma parte de Sigma.',text:'El nombre de versión de la plataforma incluye Ágora. Falta confirmar el texto público de este módulo.',items:[['En la plataforma','Ágora está en la versión publicada de Sigma.'],['Descripción','TODO: confirmar con el equipo qué debe decir esta página sobre Ágora.'],['LMS asociado','Sigma puede conectarse con un LMS que importa estudiantes. Ese LMS no tiene dirección pública verificada.']]}
 ],
 tools:[
  ['01','Asistencia','Lleve la asistencia del grupo y ajuste el registro cuando haga falta.'],
  ['02','Reportes de notas','Consulte reportes de notas por evaluación.'],
  ['03','Lápiz','Genere materiales con inteligencia artificial y revíselos antes de usarlos.'],
  ['04','Ágora','Módulo incluido en la plataforma. Su descripción pública está pendiente de confirmación.'],
  ['05','LMS asociado','Un LMS puede importar estudiantes desde Sigma. No hay un enlace público verificado.'],
  ['06','Demostración','La demostración oficial está en línea para conocer el sistema.']
 ],
 links:[
  {href:'https://demo.educalabcr.tech/',label:'Abrir la demostración',external:true},
  {href:'/contacto',label:'Escribir al equipo'}
 ],
 todos:[
  'Confirmar la descripción pública de Ágora.',
  'Confirmar si deben volver a esta página las herramientas del manual anterior (hojas de Lápiz, Arcade, presentaciones, Geo, Clara, mediación inclusiva y auditor MEP). Esta versión solo conserva lo documentado como publicado en noviembre de 2026.',
  'Confirmar si la sección de precios de la demostración es una oferta vigente. Este sitio no publica precios ni planes.'
 ]
};

export const teku={
 slug:'teku',
 path:'/teku',
 name:'TEKU',
 mark:'TE',
 color:'#1d4e89',
 kicker:'Investigación y tesis',
 status:'Piloto público',
 image:null,
 home:'Piloto para iniciar un proyecto o una tesis, con tutor socrático y editor con fuentes.',
 summary:'Espacio de investigación y escritura de tesis o proyectos, con tutor socrático y editor con fuentes. El sitio publicado se titula «TEKU · Tu espacio de investigación». Es un piloto.',
 audience:'Investigadores y estudiantes que elaboran un proyecto o una tesis.',
 points:[
  ['Inicio del proyecto','Abre un espacio para ordenar el trabajo de investigación.'],
  ['Tutor socrático','Acompaña con preguntas, no con un texto cerrado para copiar.'],
  ['Editor con fuentes','Escribe el documento y mantiene las fuentes a la vista.']
 ],
 links:[{href:'https://teku.educalabcr.tech/',label:'Abrir el piloto de TEKU',external:true}],
 todos:[]
};

export const luma={
 slug:'luma',
 path:'/luma',
 name:'LUMA',
 mark:'LU',
 color:'#6356a5',
 kicker:'Presentaciones con inteligencia artificial',
 status:'Por consulta',
 image:'/brand/luma.webp',
 home:'Presentaciones en español, con modo docente y 18 familias visuales. Sin dirección pública verificada.',
 summary:'Generador de presentaciones con interfaz en español. Incluye el modo Docente IA, un docente conversacional, y 18 familias visuales. La versión publicada también incorpora animaciones automáticas.',
 audience:'Docentes y otras personas que preparan presentaciones educativas.',
 points:[
  ['Presentaciones','Ordena un tema o un texto en una presentación que después se puede revisar.'],
  ['Docente IA','Modo de docente conversacional para acompañar la preparación.'],
  ['Familias visuales','18 familias visuales documentadas para variar la composición.'],
  ['Sin planes publicados','Este sitio no publica cupos ni planes de uso. Esa propuesta todavía no forma parte de la versión publicada.']
 ],
 links:[{href:'/contacto',label:'Consultar LUMA'}],
 todos:['Confirmar la dirección pública de LUMA cuando exista. No se encontró un dominio desplegado en la documentación revisada.']
};

export const relay={
 slug:'relay',
 path:'/relay',
 name:'Relay',
 mark:'RE',
 color:'#2067b0',
 kicker:'Agentes conversacionales',
 status:'Panel en línea',
 image:'/brand/relay.webp',
 home:'Agentes para atender conversaciones. El panel responde; Relay Ventas se consulta aparte.',
 summary:'Plataforma de agentes conversacionales para operar la atención de una organización: agentes, base de conocimiento y conversación en tiempo real. El panel que respondió en la verificación se describe como un lugar para gestionar conversaciones con clientes desde distintos canales.',
 audience:'Organizaciones que atienden conversaciones o ventas con agentes.',
 points:[
  ['Agentes','Configure agentes con una base de conocimiento.'],
  ['Tiempo real','Las conversaciones se atienden en tiempo real.'],
  ['Relay Ventas','Producto distinto: agente de ventas por WhatsApp, con campañas, citas y traspaso a una persona. No tiene una dirección pública verificada.']
 ],
 links:[
  {href:'https://relay.educalabagentes.tech/',label:'Abrir el panel de Relay',external:true},
  {href:'/contacto',label:'Consultar Relay Ventas'}
 ],
 todos:['Confirmar si el panel enlazado debe ser la entrada pública. El 13 de noviembre de 2026 respondió con el título «Relay - Configuración» y la marca noindex. Otra dirección documentada en el README no resolvió y no se enlaza.']
};

export const idoneidad={
 slug:'idoneidad',
 path:'/idoneidad',
 name:'Práctica de idoneidad docente',
 mark:'ID',
 color:'#0f6b5c',
 kicker:'Simulador de pruebas del MEP',
 status:'Por consulta',
 image:null,
 home:'Simulador de las pruebas de idoneidad docente del MEP, con tutoría de inteligencia artificial.',
 summary:'Simulador de las pruebas de idoneidad docente del Ministerio de Educación Pública, con tutoría de inteligencia artificial, para quien se prepara para esas pruebas.',
 audience:'Docentes que se preparan para las pruebas de idoneidad del MEP.',
 points:[
  ['Simulación','Practique el formato de las pruebas de idoneidad.'],
  ['Tutoría','La preparación incluye tutoría con inteligencia artificial.']
 ],
 links:[{href:'/contacto',label:'Consultar acceso'}],
 todos:['Confirmar la dirección pública. La indicada en el repositorio no resolvió el 13 de noviembre de 2026, así que esta página no la enlaza.']
};

export const taskos={
 slug:'taskos',
 path:'/taskos',
 name:'taskOs',
 mark:'TO',
 color:'#8a4b2f',
 kicker:'Gestión de tareas',
 status:'Aplicación en línea',
 image:null,
 home:'Gestor de tareas para una institución o para varias organizaciones. La aplicación respondió en línea.',
 summary:'Aplicación de gestión de tareas y organización. El sitio publicado se titula «TaskOS — Gestor de Tareas». Sirve para trabajar en una institución y para pertenecer a varias organizaciones.',
 audience:'Personas y equipos que organizan el trabajo en una o varias instituciones.',
 points:[
  ['Tareas','Organice el trabajo pendiente de la institución.'],
  ['Organizaciones','Aísle la información por institución y conserve la pertenencia a varias organizaciones.']
 ],
 links:[{href:'https://taskos.educalabcr.tech/',label:'Abrir taskOs',external:true}],
 todos:['Confirmar que la aplicación enlazada es la entrada pública. No estaba en el README revisado el 12 de noviembre de 2026. El 13 de noviembre respondió con el título «TaskOS — Gestor de Tareas».']
};

export const products=[sigma,teku,luma,relay,idoneidad,taskos];
export const homeCards=products.map(p=>({name:p.name,status:p.status,text:p.home,href:p.path}));

export const oferta={
 source:'Catálogo tomado del contenido semilla de la página anterior (populate_oferta_asincronica.js, rama de respaldo). No se volvió a comprobar contra un catálogo en vivo.',
 todos:[
  'Confirmar si este catálogo sigue vigente, las horas de cada curso y cuáles están abiertos a inscripción.',
  'Confirmar precios, certificación y modalidad. Este sitio no publica precios porque no aparecen en el material de origen.',
  'El curso C-005, Domina APA, figuraba como no disponible en ese contenido semilla.'
 ],
 categories:[
  {name:'Herramientas digitales y tecnología',text:'Plataformas y recursos para el aula.',courses:[
   ['C-001','Introducción a herramientas digitales para la educación','40 h','Google Classroom, Teams, Zoom y gestión educativa.'],
   ['C-002','Creación de contenidos digitales para el aula','200 h','Presentaciones interactivas, videos y podcasts.'],
   ['C-004','Uso de Nearpod como herramienta didáctica','40 h','Evaluación interactiva.'],
   ['C-006','Seguridad en internet y ciudadanía digital para docentes','120 h','Prevención y buenas prácticas en la web.'],
   ['C-008','Uso de Padlet e inteligencia artificial en el aula','40 h','Inteligencia artificial para un aprendizaje más ajustado al grupo.'],
   ['C-015','Herramientas de aprendizaje colaborativo en línea','200 h','GSuite, Office 365 y OneDrive.'],
   ['C-037','IA para la creación de material didáctico','40 h','Generación de recursos para la clase.'],
   ['C-038','ChatGPT: de la teoría a la práctica','80 h','Uso de indicaciones para organizar el tiempo docente.']
  ]},
  {name:'Pedagogía y evaluación',text:'Estrategias de enseñanza y de evaluación.',courses:[
   ['C-003','Metodología constructivista y conductista','40 h','Diferencias y aplicación en el aula.'],
   ['C-007','Evaluación diagnóstica en el desarrollo escolar','120 h','Identificación de habilidades y de lo que hay que fortalecer.'],
   ['C-012','Evaluación sumativa del trabajo cotidiano','120 h','Instrumentos para calificar el trabajo del día a día.'],
   ['C-014','Construcción de pruebas escritas y tablas de especificaciones','120 h','Elaboración de ítems.']
  ]},
  {name:'Inclusión y neurociencia',text:'Diseño de apoyos y comprensión del aprendizaje.',courses:[
   ['C-009','Diseño de planes educativos inclusivos','120 h','Adecuaciones curriculares.'],
   ['C-010','Neurociencia aplicada','120 h','El aprendizaje desde la infancia hasta la adultez.'],
   ['C-011','DUA: diseño universal para el aprendizaje','40 h','Estrategias para diversificar la clase.'],
   ['C-016','Diversidad de talentos: inteligencias múltiples','80 h','Reconocimiento de distintos potenciales.'],
   ['C-017','Neurodidáctica','40 h','Estrategias para un aprendizaje con sentido.']
  ]},
  {name:'Habilidades profesionales y bienestar',text:'Práctica profesional dentro y fuera del aula.',courses:[
   ['C-005','Domina APA','40 h','En el contenido anterior figuraba como no disponible.'],
   ['C-013','Estrategias para la salud mental en el entorno profesional','80 h','Manejo del estrés.'],
   ['C-040','Comunicación asertiva en el entorno laboral','40 h','Conversaciones difíciles y conflictos.'],
   ['C-041','Expresión oral en público','120 h','Oratoria para el trabajo docente.']
  ]},
  {name:'Preparación académica',text:'Razonamiento para pruebas y nuevas oportunidades.',courses:[
   ['C-042','Lógica matemática para exámenes de admisión','80 h','Resolución de problemas.'],
   ['C-043','Lógica verbal','40 h','Razonamiento verbal aplicado.']
  ]}
 ]
};
