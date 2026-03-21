
const DIRECTUS_URL = 'http://control-directus-9ee74c-76-13-234-106.traefik.me';
const ADMIN_TOKEN = 'nFBbco3X_5cd8_Hm_-nHbJLK7ceTAJ_p';

const headers = {
  Authorization: `Bearer ${ADMIN_TOKEN}`,
  'Content-Type': 'application/json',
};

async function addField(collection, name, label, type, interface) {
  try {
    const response = await fetch(`${DIRECTUS_URL}/fields/${collection}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        field: name,
        type: type,
        meta: {
           interface: interface,
           display: 'raw',
           options: {},
           translations: [{ language: 'es-ES', translation: label }]
        }
      }),
    });
    const result = await response.json();
    if (!response.ok) {
       console.error(`Error adding field ${name}:`, JSON.stringify(result));
    } else {
       console.log(`Field ${name} added to ${collection}.`);
    }
  } catch (error) {
    console.error(`Error adding field ${name}:`, error.message);
  }
}

async function deleteHalfCourses() {
  try {
    // Fetch IDs of all courses
    const response = await fetch(`${DIRECTUS_URL}/items/oferta_asincronica_cursos?fields=id&limit=-1`, {
      method: 'GET',
      headers,
    });
    const json = await response.json();
    const courses = json.data || [];
    const total = courses.length;
    const toDeleteCount = Math.floor(total / 2);
    
    if (toDeleteCount <= 0) return;

    const idsToDelete = courses.slice(0, toDeleteCount).map(c => c.id);
    console.log(`Deleting ${toDeleteCount} courses out of ${total}. IDs: ${idsToDelete.join(', ')}`);

    const delRes = await fetch(`${DIRECTUS_URL}/items/oferta_asincronica_cursos`, {
      method: 'DELETE',
      headers,
      body: JSON.stringify(idsToDelete)
    });

    if (delRes.ok) {
      console.log('Successfully deleted half of the courses.');
    } else {
      console.error('Error deleting courses:', await delRes.text());
    }
  } catch (error) {
    console.error('Error during deletion:', error.message);
  }
}

async function run() {
  // 1. Add field for category text
  await addField('oferta_asincronica_cursos', 'categoria_texto', 'Nombre de la Categoría', 'string', 'input');
  
  // 2. Delete half the courses
  await deleteHalfCourses();
}

run();
