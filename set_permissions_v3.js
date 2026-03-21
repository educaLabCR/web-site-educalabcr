
const DIRECTUS_URL = 'http://control-directus-9ee74c-76-13-234-106.traefik.me';
const ADMIN_TOKEN = 'nFBbco3X_5cd8_Hm_-nHbJLK7ceTAJ_p';

const headers = {
  Authorization: `Bearer ${ADMIN_TOKEN}`,
  'Content-Type': 'application/json',
};

const collections = [
  'cursos_en_vivo',
  'sesiones_curso',
  'metodos_pago',
  'contenido_pagina_ofertas',
  'directus_files'
];

async function setPublicRead(collection) {
  try {
    const payload = {
      role: null,
      collection: collection,
      action: 'read',
      permissions: {},
      fields: ['*'],
      policy: null,
      validation: null
    };

    const response = await fetch(`${DIRECTUS_URL}/permissions`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (response.ok) {
      console.log(`Permiso de lectura pública establecido para ${collection}.`);
    } else {
      console.log(`Error para ${collection}: ${JSON.stringify(data.errors || data)}`);
    }
  } catch (error) {
    console.error(`Error crítico para ${collection}:`, error.message);
  }
}

async function main() {
  console.log('Regenerando permisos públicos V3...');
  for (const collection of collections) {
    await setPublicRead(collection);
  }
}

main();
