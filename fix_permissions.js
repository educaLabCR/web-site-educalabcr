const baseUrl = 'http://control-directus-9ee74c-76-13-234-106.traefik.me';
const token = 'nFBbco3X_5cd8_Hm_-nHbJLK7ceTAJ_p';

async function apiCall(path, method, body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  const res = await fetch(`${baseUrl}${path}`, options);
  const data = await res.json();
  return data;
}

async function fixPermissions() {
  console.log("Configurando permisos públicos para foro_categorias...");
  
  // Borrar permisos existentes para evitar duplicados si los hay (opcional pero seguro)
  // En lugar de borrar, simplemente intentamos crear el permiso READ y CREATE para public
  
  const readRes = await apiCall('/permissions', 'POST', {
    role: null, // Public
    collection: 'foro_categorias',
    action: 'read',
    permissions: {},
    fields: ['*']
  });
  console.log('Permiso READ:', JSON.stringify(readRes));

  const createRes = await apiCall('/permissions', 'POST', {
    role: null, // Public
    collection: 'foro_categorias',
    action: 'create',
    permissions: {},
    fields: ['*']
  });
  console.log('Permiso CREATE:', JSON.stringify(createRes));

  console.log("Proceso terminado.");
}

fixPermissions().catch(console.error);
