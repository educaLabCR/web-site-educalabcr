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
  if (data.errors) {
    console.error(`Error in ${method} ${path}:`, JSON.stringify(data.errors, null, 2));
  }
  return data;
}

async function updateSchema() {
  console.log("Creando foro_respuestas...");
  await apiCall('/collections', 'POST', {
    collection: 'foro_respuestas',
    meta: {
      icon: 'chat',
      note: 'Respuestas a los temas del foro'
    },
    fields: [
      { field: 'id', type: 'integer', schema: { is_primary_key: true, has_auto_increment: true } },
      { field: 'date_created', type: 'timestamp', meta: { special: ['date-created'] } },
      { field: 'tema_id', type: 'integer' },
      { field: 'autor_nombre', type: 'string' },
      { field: 'autor_avatar', type: 'string' },
      { field: 'contenido', type: 'text' },
      { field: 'likes', type: 'integer', schema: { default_value: 0 } }
    ]
  });

  console.log("Estableciendo relación foro_respuestas -> foro_temas...");
  await apiCall('/relations', 'POST', {
    collection: 'foro_respuestas',
    field: 'tema_id',
    related_collection: 'foro_temas',
    meta: {
      one_field: 'respuestas', // adding this to foro_temas
      sort_field: null,
      one_collection_field: null,
      one_allowed_collections: null,
      junction_field: null
    },
    schema: {
      on_update: 'NO ACTION',
      on_delete: 'CASCADE'
    }
  });

  console.log("Configurando permisos públicos foro_respuestas...");
  await apiCall('/permissions', 'POST', {
    role: null, 
    collection: 'foro_respuestas',
    action: 'read',
    permissions: {},
    fields: ['*']
  });
  await apiCall('/permissions', 'POST', {
    role: null,
    collection: 'foro_respuestas',
    action: 'create',
    permissions: {},
    fields: ['*']
  });

  console.log("Update complete!");
}

updateSchema().catch(console.error);
