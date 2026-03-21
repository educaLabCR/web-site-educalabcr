
const DIRECTUS_URL = 'http://control-directus-9ee74c-76-13-234-106.traefik.me';
const ADMIN_TOKEN = 'nFBbco3X_5cd8_Hm_-nHbJLK7ceTAJ_p';

const headers = {
  Authorization: `Bearer ${ADMIN_TOKEN}`,
  'Content-Type': 'application/json',
};

async function createCollection(collectionData) {
  try {
    const response = await fetch(`${DIRECTUS_URL}/collections`, {
      method: 'POST',
      headers,
      body: JSON.stringify(collectionData),
    });
    if (!response.ok) {
      const err = await response.text();
      if (err.includes('already exists')) {
        console.log(`Collection ${collectionData.collection} already exists.`);
        return;
      }
      throw new Error(err);
    }
    console.log(`Collection ${collectionData.collection} created successfully.`);
  } catch (error) {
    console.error(`Error creating collection ${collectionData.collection}:`, error.message);
  }
}

async function createField(collection, fieldData) {
  try {
    const response = await fetch(`${DIRECTUS_URL}/fields/${collection}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(fieldData),
    });
    if (!response.ok) {
      const err = await response.text();
      if (err.includes('already exists')) {
        // console.log(`Field ${fieldData.field} already exists in ${collection}.`);
        return;
      }
      throw new Error(err);
    }
    console.log(`Field ${fieldData.field} added to ${collection}.`);
  } catch (error) {
    console.error(`Error creating field ${fieldData.field} in ${collection}:`, error.message);
  }
}

async function createRelation(relationData) {
  try {
    const response = await fetch(`${DIRECTUS_URL}/relations`, {
      method: 'POST',
      headers,
      body: JSON.stringify(relationData),
    });
    if (!response.ok) {
      const err = await response.text();
      if (err.includes('already exists')) return;
      throw new Error(err);
    }
    console.log(`Relation ${relationData.collection}->${relationData.related_collection} created.`);
  } catch (error) {
    console.error(`Error creating relation:`, error.message);
  }
}

async function setup() {
  console.log('Starting Oferta Asincrónica Directus setup...');

  // 1. Categorías
  await createCollection({
    collection: 'oferta_asincronica_categorias',
    meta: {
      collection: 'oferta_asincronica_categorias',
      icon: 'category',
      display_template: '{{nombre}}',
    },
    schema: {},
  });

  const categoriasFields = [
    { field: 'nombre', type: 'string', meta: { interface: 'input', options: { placeholder: 'Ej: Pedagógica' }, note: 'Nombre de la categoría de cursos' } },
    { field: 'subtitulo', type: 'string', meta: { interface: 'input', note: 'Breve descripción o lema de la categoría' } },
    { field: 'icono', type: 'string', meta: { interface: 'input', note: 'Nombre del icono de Lucide (ej: Laptop, Brain)' } },
    { field: 'color_gradient', type: 'string', meta: { interface: 'input', note: 'Clases de gradiente de Tailwind (ej: from-emerald-50 to-cyan-50)' } },
    { field: 'orden', type: 'integer', meta: { interface: 'input' }, schema: { default_value: 0 } },
  ];

  for (const field of categoriasFields) {
    await createField('oferta_asincronica_categorias', field);
  }

  // 2. Cursos
  await createCollection({
    collection: 'oferta_asincronica_cursos',
    meta: {
      collection: 'oferta_asincronica_cursos',
      icon: 'school',
      display_template: '{{codigo}} - {{nombre}}',
    },
    schema: {},
  });

  const cursosFields = [
    { field: 'status', type: 'string', meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Publicado', value: 'published' }, { text: 'Borrador', value: 'draft' }] } }, schema: { default_value: 'published' } },
    { field: 'codigo', type: 'string', meta: { interface: 'input', note: 'Código identificador del curso (ej: C-001)' } },
    { field: 'nombre', type: 'string', meta: { interface: 'input', note: 'Título completo del curso' } },
    { field: 'horas', type: 'integer', meta: { interface: 'input', note: 'Duración total en horas' } },
    { field: 'descripcion', type: 'text', meta: { interface: 'textarea', note: 'Resumen corto de los temas tratados' } },
    { field: 'imagen', type: 'uuid', meta: { interface: 'file', note: 'Imagen de portada del curso' }, schema: { foreign_key_table: 'directus_files', foreign_key_column: 'id' } },
    { field: 'disponible', type: 'boolean', meta: { interface: 'boolean', note: 'Si el curso está actualmente abierto para inscripción' }, schema: { default_value: true } },
    { field: 'categoria', type: 'integer', meta: { interface: 'select-relational-one-to-many' }, schema: { foreign_key_table: 'oferta_asincronica_categorias', foreign_key_column: 'id' } },
    { field: 'orden', type: 'integer', meta: { interface: 'input' }, schema: { default_value: 0 } },
  ];

  for (const field of cursosFields) {
    await createField('oferta_asincronica_cursos', field);
  }

  // 3. Contenido de la Página (Singleton)
  await createCollection({
    collection: 'oferta_asincronica_sitio',
    meta: {
      singleton: true,
      icon: 'article',
      note: 'Configuración global de la página de Oferta Asincrónica'
    },
    schema: {},
  });

  const sitioFields = [
    { field: 'hero_titulo', type: 'string', meta: { interface: 'input', note: 'Título impactante para el hero' } },
    { field: 'hero_subtitulo', type: 'text', meta: { interface: 'textarea', note: 'Texto descriptivo debajo del título principal' } },
    { field: 'badge_texto', type: 'string', meta: { interface: 'input', note: 'Texto de la etiqueta superior (ej: Estudia a tu ritmo)' } },
    { field: 'cta_principal_texto', type: 'string', meta: { interface: 'input', note: 'Texto del botón de llamado a la acción' } },
    { field: 'cta_whatsapp_url', type: 'string', meta: { interface: 'input', note: 'Enlace directo a WhatsApp para inscripciones' } },
    { field: 'disponibilidad_texto', type: 'string', meta: { interface: 'input', note: 'Texto de disponibilidad (ej: 24/7)' } },
    // Banner final
    { field: 'banner_final_titulo', type: 'string', meta: { interface: 'input', note: 'Título del banner de cierre de página' } },
    { field: 'banner_final_subtitulo', type: 'text', meta: { interface: 'textarea', note: 'Texto del banner de cierre' } },
    { field: 'banner_final_cta', type: 'string', meta: { interface: 'input', note: 'Texto del botón en el banner final' } },
  ];

  for (const field of sitioFields) {
    await createField('oferta_asincronica_sitio', field);
  }

  console.log('Setup finished!');
}

setup();
