
const DIRECTUS_URL = 'http://control-directus-9ee74c-76-13-234-106.traefik.me';
const ADMIN_TOKEN = 'nFBbco3X_5cd8_Hm_-nHbJLK7ceTAJ_p';

const headers = {
  Authorization: `Bearer ${ADMIN_TOKEN}`,
  'Content-Type': 'application/json',
};

async function postData(collection, data) {
  try {
    const response = await fetch(`${DIRECTUS_URL}/items/${collection}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(JSON.stringify(result));
    console.log(`Item added to ${collection}.`);
    return result.data;
  } catch (error) {
    console.error(`Error posting to ${collection}:`, error.message);
  }
}

async function updateSingleton(collection, data) {
    try {
      const response = await fetch(`${DIRECTUS_URL}/items/${collection}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(JSON.stringify(result));
      console.log(`${collection} singleton updated.`);
      return result.data;
    } catch (error) {
      console.error(`Error updating singleton ${collection}:`, error.message);
    }
  }

const data = {
  sitio: {
    hero_titulo: "Domina tu Especialidad",
    hero_subtitulo: "Accede a contenido de vanguardia diseñado para el docente moderno. Aprende IA, pedagogía y tecnología con flexibilidad total.",
    badge_texto: "Estudia a tu ritmo · 100% Online",
    cta_principal_texto: "Inscripción Abierta",
    cta_whatsapp_url: "https://wa.me/message/4C7ONIA7WR5ZF1",
    disponibilidad_texto: "Disponibilidad 24/7",
    banner_final_titulo: "¿Listo para impulsar tu carrera?",
    banner_final_subtitulo: "Contáctanos a través de WhatsApp para recibir atención personalizada e iniciar tu proceso de inscripción hoy mismo.",
    banner_final_cta: "Contactar por WhatsApp"
  },
  categorias: [
    {
      nombre: 'Herramientas Digitales y Tecnología',
      subtitulo: 'Domina las plataformas del aula moderna',
      icono: 'Laptop',
      color_gradient: 'from-emerald-50 to-cyan-50',
      orden: 1,
      courses: [
        { code: 'C-001', name: 'Introducción a Herramientas Digitales para la Educación', hours: 40, desc: 'Cubre Google Classroom, Teams, Zoom y gestión educativa.', image: 'https://images.unsplash.com/photo-1588196749597-9ff046f477bc?auto=format&fit=crop&q=80&w=800' },
        { code: 'C-002', name: 'Creación de Contenidos Digitales para el Aula', hours: 200, desc: 'Enfoque en presentaciones interactivas, videos y podcasts.', image: 'https://images.unsplash.com/photo-1492538368677-f69f501b0d2b?auto=format&fit=crop&q=80&w=800' },
        { code: 'C-004', name: 'Uso de Nearpod como herramienta didáctica', hours: 40, desc: 'Herramientas de evaluación interactiva.', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800' },
        { code: 'C-006', name: 'Seguridad en Internet y Ciudadanía Digital para Docentes', hours: 120, desc: 'Prevención y buenas prácticas en la web.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800' },
        { code: 'C-008', name: 'Uso de Padlet / IA en el aula', hours: 40, desc: 'Enfocado en el uso de inteligencia artificial para aprendizaje adaptativo.', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800' },
        { code: 'C-015', name: 'Herramientas de Aprendizaje Colaborativo en Línea', hours: 200, desc: 'Uso de GSuite, Office 365 y OneDrive.', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800' },
        { code: 'C-037', name: 'IA para la creación de material didáctico', hours: 40, desc: 'Generación de recursos automatizados.', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800' },
        { code: 'C-038', name: 'ChatGPT: De la Teoría a la Práctica', hours: 80, desc: 'Optimización del tiempo docente mediante el uso de promts.', image: 'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?auto=format&fit=crop&q=80&w=800' },
      ]
    },
    {
      nombre: 'Pedagogía y Evaluación',
      subtitulo: 'Estrategias de enseñanza basadas en evidencia',
      icono: 'BarChart',
      color_gradient: 'from-violet-50 to-purple-50',
      orden: 2,
      courses: [
        { code: 'C-003', name: 'Metodología Constructivista vs. Conductista', hours: 40, desc: 'Diferencias teóricas y aplicación en el aula.', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800' },
        { code: 'C-007', name: 'Evaluación diagnóstica en el desarrollo escolar', hours: 120, desc: 'Identificando habilidades y áreas de mejora.', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4273?auto=format&fit=crop&q=80&w=800' },
        { code: 'C-012', name: 'Evaluación sumativa del trabajo cotidiano', hours: 120, desc: 'Herramientas objetivas de calificación.', image: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2c0?auto=format&fit=crop&q=80&w=800' },
        { code: 'C-014', name: 'Construcción de pruebas escritas y tablas de especificaciones', hours: 120, desc: 'Creación de ítems de alta calidad.', image: 'https://images.unsplash.com/photo-1518133596956-659f13dd48c0?auto=format&fit=crop&q=80&w=800' },
      ]
    },
    {
        nombre: 'Inclusión y Neurociencia',
        subtitulo: 'Ciencia del aprendizaje aplicada al aula',
        icono: 'Brain',
        color_gradient: 'from-rose-50 to-pink-50',
        orden: 3,
        courses: [
          { code: 'C-009', name: 'Diseño de Planes Educativos Inclusivos', hours: 120, desc: 'Adecuaciones curriculares efectivas.', image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=800' },
          { code: 'C-010', name: 'Neurociencia Aplicada', hours: 120, desc: 'Comprendiendo el cerebro desde la infancia hasta la adultez.', image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800' },
          { code: 'C-011', name: 'DUA: Diseño Universal de Aprendizajes', hours: 40, desc: 'Estrategias prácticas de diversificación.', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800' },
          { code: 'C-016', name: 'Diversidad de Talentos: Inteligencias Múltiples', hours: 80, desc: 'Identificando potenciales diversos.', image: 'https://images.unsplash.com/photo-1456406644174-8d9ad9729a4a?auto=format&fit=crop&q=80&w=800' },
          { code: 'C-017', name: 'Neurodidáctica (Estrategias innovadoras)', hours: 40, desc: 'Transformando el aprendizaje significativo.', image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800' },
        ]
      },
      {
        nombre: 'Habilidades Profesionales y Bienestar',
        subtitulo: 'Crece como profesional dentro y fuera del aula',
        icono: 'Sprout',
        color_gradient: 'from-amber-50 to-yellow-50',
        orden: 4,
        courses: [
          { code: 'C-005', name: 'Domina APA', hours: 40, desc: 'Actualmente no disponible.', disabled: true, image: 'https://images.unsplash.com/photo-1455390582262-044cdead27d1?auto=format&fit=crop&q=80&w=800' },
          { code: 'C-013', name: 'Estrategias para la Salud Mental en el Entorno Profesional', hours: 80, desc: 'Manejo de estrés y mindfulness.', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800' },
          { code: 'C-040', name: 'Comunicación asertiva en el entorno laboral', hours: 40, desc: 'Habilidades para la resolución de conflictos.', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800' },
          { code: 'C-041', name: 'Desarrollo de habilidades para la expresión oral en público', hours: 120, desc: 'Técnicas de persuasión y oratoria.', image: 'https://images.unsplash.com/photo-1475721025505-23fa68abf410?auto=format&fit=crop&q=80&w=800' },
        ]
      },
      {
        nombre: 'Preparación Académica',
        subtitulo: 'Abre puertas a nuevas oportunidades profesionales',
        icono: 'GraduationCap',
        color_gradient: 'from-sky-50 to-blue-50',
        orden: 5,
        courses: [
          { code: 'C-042', name: 'Lógica matemática para exámenes de admisión', hours: 80, desc: 'Resolución de problemas avanzados.', image: 'https://images.unsplash.com/photo-1453733190371-0a9bedd82893?auto=format&fit=crop&q=80&w=800' },
          { code: 'C-043', name: 'Lógica verbal', hours: 40, desc: 'Enfoque en razonamiento lógico aplicado.', image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800' },
        ]
      },
  ]
};

async function populate() {
  console.log('Updating site singleton...');
  await updateSingleton('oferta_asincronica_sitio', data.sitio);

  console.log('Populating categories and courses...');
  for (const cat of data.categorias) {
    const courses = [...cat.courses];
    delete cat.courses;
    
    const createdCat = await postData('oferta_asincronica_categorias', cat);
    if (createdCat && createdCat.id) {
        for (const course of courses) {
            course.categoria = createdCat.id;
            // Map 'image' property from the JS object to 'imagen' column in Directus
            if (course.image) {
                course.imagen = course.image;
                delete course.image;
            }
            await postData('oferta_asincronica_cursos', course);
        }
    }
  }
  console.log('Population finished!');
}

populate();
