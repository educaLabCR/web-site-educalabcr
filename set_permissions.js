
const DIRECTUS_URL = 'http://control-directus-9ee74c-76-13-234-106.traefik.me';
const ADMIN_TOKEN = 'nFBbco3X_5cd8_Hm_-nHbJLK7ceTAJ_p';
const PUBLIC_POLICY_ID = 'abf8a154-5b1c-4a46-ac9c-7300570f4f17';

const headers = {
  Authorization: `Bearer ${ADMIN_TOKEN}`,
  'Content-Type': 'application/json',
};

async function setPublicReadPermission(collection) {
  try {
    const response = await fetch(`${DIRECTUS_URL}/permissions`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        policy: PUBLIC_POLICY_ID,
        collection: collection,
        action: 'read',
        permissions: {},
        validation: {},
        fields: ['*'],
      }),
    });
    const result = await response.json();
    if (!response.ok) {
       if (result.errors && result.errors[0].extensions.code === 'RECORD_NOT_UNIQUE') {
         console.log(`Permission already exists for ${collection} on this policy`);
       } else {
         throw new Error(JSON.stringify(result));
       }
    } else {
      console.log(`Read permission granted to Policy ${PUBLIC_POLICY_ID} for ${collection}`);
    }
  } catch (error) {
    console.error(`Error setting permission for ${collection}:`, error.message);
  }
}

async function main() {
  const collections = [
    'oferta_asincronica_categorias',
    'oferta_asincronica_cursos',
    'oferta_asincronica_sitio'
  ];

  for (const collection of collections) {
    await setPublicReadPermission(collection);
  }
  console.log('Permissions setup completed!');
}

main();
