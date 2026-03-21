
const DIRECTUS_URL = 'http://control-directus-9ee74c-76-13-234-106.traefik.me';
const ADMIN_TOKEN = 'nFBbco3X_5cd8_Hm_-nHbJLK7ceTAJ_p';

const headers = {
  Authorization: `Bearer ${ADMIN_TOKEN}`,
  'Content-Type': 'application/json',
};

async function clearCourses() {
   const res = await fetch(`${DIRECTUS_URL}/items/oferta_asincronica_cursos?fields=id&limit=-1`, { headers });
   const json = await res.json();
   const ids = (json.data || []).map(i => i.id);
   if (ids.length > 0) {
      await fetch(`${DIRECTUS_URL}/items/oferta_asincronica_cursos`, {
        method: 'DELETE',
        headers,
        body: JSON.stringify(ids)
      });
      console.log('Cleared existing courses.');
   }
}

async function getCategories() {
   const res = await fetch(`${DIRECTUS_URL}/items/oferta_asincronica_categorias`, { headers });
   const json = await res.json();
   return json.data || [];
}

const coursesData = [
  {
    nombre: "Inteligencia Artificial para el Aula",
    descripcion: "Domina las herramientas de IA generativa para crear planes de lección, evaluaciones y material didáctico en minutos. Transforma tu pedagogía con ChatGPT y Canva Magic.",
    codigo: "IA-101",
    horas: 20,
    disponible: true,
    nivel: "principiante",
    imagen: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    categoria_nombre: "Inteligencia Artificial",
    categoria_texto: "Inteligencia Artificial"
  },
  {
    nombre: "Gamificación con Genially",
    descripcion: "Convierte tus clases en aventuras épicas. Desarrolla breakouts digitales, juegos de escape y quizes interactivos que mantienen a tus estudiantes al borde de su asiento.",
    codigo: "GT-205",
    horas: 15,
    disponible: true,
    nivel: "intermedio",
    imagen: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    categoria_nombre: "Herramientas Digitales",
    categoria_texto: "Herramientas Digitales"
  },
  {
    nombre: "Diseño Instruccional Moderno",
    descripcion: "Metodologías ágiles aplicadas al diseño de experiencias de aprendizaje. Aprende ADDIE, SAM y técnicas de Microlearning para el entorno virtual.",
    codigo: "PED-301",
    horas: 30,
    disponible: true,
    nivel: "avanzado",
    imagen: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
    categoria_nombre: "Pedagogía y Didáctica",
    categoria_texto: "Pedagogía y Didáctica"
  },
  {
    nombre: "Evaluación Digital por Rúbricas",
    descripcion: "Optimiza tus procesos de calificación. Crea rúbricas automatizadas y feedback constructivo utilizando hojas de cálculo y herramientas de gestión educativa.",
    codigo: "EVA-102",
    horas: 12,
    disponible: true,
    nivel: "principiante",
    imagen: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
    categoria_nombre: "Evaluación Educativa",
    categoria_texto: "Evaluación Educativa"
  },
  {
    nombre: "Neuroeducación en el Aula",
    descripcion: "Comprende cómo aprende el cerebro para enseñar mejor. Estrategias basadas en ciencia para mejorar la atención, memoria y motivación de tus alumnos.",
    codigo: "NEU-400",
    horas: 25,
    disponible: true,
    nivel: "intermedio",
    imagen: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800",
    categoria_nombre: "Psicopedagogía",
    categoria_texto: "Psicopedagogía"
  },
  {
    nombre: "Google Workspace for Education Professional",
    descripcion: "Certifícate en las herramientas de Google. Domina Classroom, Drive, Forms y Meet para una gestión eficiente de tu entorno virtual de aprendizaje.",
    codigo: "GWE-201",
    horas: 40,
    disponible: true,
    nivel: "intermedio",
    imagen: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=800",
    categoria_nombre: "Herramientas Digitales",
    categoria_texto: "Herramientas Digitales"
  }
];

async function populate() {
  await clearCourses();
  const categories = await getCategories();
  
  for (const course of coursesData) {
    // Try to find matching ID for category
    const foundCat = categories.find(c => c.nombre === course.categoria_nombre);
    const data = {
      ...course,
      categoria: foundCat ? foundCat.id : null,
      status: 'published'
    };
    
    // Remove temporary field used for lookup
    delete data.categoria_nombre;

    try {
        const response = await fetch(`${DIRECTUS_URL}/items/oferta_asincronica_cursos`, {
          method: 'POST',
          headers,
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(await response.text());
        console.log(`Course "${course.nombre}" added.`);
    } catch (e) {
        console.error(`Failed to add ${course.nombre}:`, e.message);
    }
  }
}

populate();
