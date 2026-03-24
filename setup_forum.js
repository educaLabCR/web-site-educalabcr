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

async function setup() {
  console.log("Creando foro_categorias...");
  await apiCall('/collections', 'POST', {
    collection: 'foro_categorias',
    meta: {
      icon: 'category',
      note: 'Categorías del foro'
    },
    fields: [
      { field: 'id', type: 'integer', schema: { is_primary_key: true, has_auto_increment: true } },
      { field: 'name', type: 'string' },
      { field: 'icon', type: 'string' },
      { field: 'color', type: 'string' },
      { field: 'bg', type: 'string' },
      { field: 'sort', type: 'integer', meta: { sort: 1 } }
    ]
  });

  console.log("Creando foro_temas...");
  await apiCall('/collections', 'POST', {
    collection: 'foro_temas',
    meta: {
      icon: 'forum',
      note: 'Temas del foro'
    },
    fields: [
      { field: 'id', type: 'integer', schema: { is_primary_key: true, has_auto_increment: true } },
      { field: 'date_created', type: 'timestamp', meta: { special: ['date-created'] }, schema: { has_auto_increment: false } },
      { field: 'title', type: 'string' },
      { field: 'autor_nombre', type: 'string' },
      { field: 'autor_avatar', type: 'string' },
      { field: 'categoria_id', type: 'integer' },
      { field: 'contenido', type: 'text' },
      { field: 'likes', type: 'integer', schema: { default_value: 0 } },
      { field: 'replies_count', type: 'integer', schema: { default_value: 0 } },
      { field: 'tags', type: 'json' }
    ]
  });

  console.log("Estableciendo relación foro_temas -> foro_categorias...");
  await apiCall('/relations', 'POST', {
    collection: 'foro_temas',
    field: 'categoria_id',
    related_collection: 'foro_categorias',
    meta: {
      one_field: null,
      sort_field: null,
      one_collection_field: null,
      one_allowed_collections: null,
      junction_field: null
    },
    schema: {
      on_update: 'NO ACTION',
      on_delete: 'SET NULL'
    }
  });

  console.log("Seed foro_categorias...");
  const categorias = [
    { name: 'Inspiración', icon: 'Star', color: 'text-yellow-500', bg: 'bg-yellow-50', sort: 1 },
    { name: 'Dudas Académicas', icon: 'MessageCircle', color: 'text-primary', bg: 'bg-primary/10', sort: 2 },
    { name: 'Recursos Docentes', icon: 'Hash', color: 'text-accent', bg: 'bg-accent/10', sort: 3 },
    { name: 'Colaboración', icon: 'Users', color: 'text-purple-500', bg: 'bg-purple-50', sort: 4 }
  ];
  for (const cat of categorias) {
    await apiCall('/items/foro_categorias', 'POST', cat);
  }

  console.log("Seed foro_temas...");
  await apiCall('/items/foro_temas', 'POST', {
    title: '¿Cómo aplicar IA en el aula de primaria?',
    autor_nombre: 'María González',
    autor_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    categoria_id: 3, // Recursos Docentes
    contenido: '<p>Me gustaría saber sus opiniones sobre cómo aplicar IA en aulas de primaria.</p>',
    likes: 56,
    replies_count: 24,
    tags: ['IA', 'Docencia', 'Innovación']
  });
  await apiCall('/items/foro_temas', 'POST', {
    title: 'Grupo de estudio para certificación UI/UX Marzo',
    autor_nombre: 'Carlos Ruiz',
    autor_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    categoria_id: 4, // Colaboración
    contenido: '<p>Busco personas interesadas en armar un grupo de estudio.</p>',
    likes: 31,
    replies_count: 12,
    tags: ['Diseño', 'Estudio', 'Certificación']
  });
  await apiCall('/items/foro_temas', 'POST', {
    title: 'Mejorando la retención de alumnos en cursos asíncronos',
    autor_nombre: 'Eduardo Soto',
    autor_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eduardo',
    categoria_id: 1, // Inspiración
    contenido: '<p>Estuve probando algunas técnicas que comparto con ustedes...</p>',
    likes: 120,
    replies_count: 45,
    tags: ['E-learning', 'Psicología', 'Tips']
  });

  // Configurar permisos públicos
  console.log("Configurando permisos públicos...");
  // Foro categorias -> leer publico
  await apiCall('/permissions', 'POST', {
    role: null, // Public
    collection: 'foro_categorias',
    action: 'read',
    permissions: {},
    validation: null,
    fields: ['*']
  });
  // Foro temas -> leer publico
  await apiCall('/permissions', 'POST', {
    role: null, // Public
    collection: 'foro_temas',
    action: 'read',
    permissions: {},
    validation: null,
    fields: ['*']
  });
  // Foro temas -> crear publico (para que cualquiera pueda crear)
  await apiCall('/permissions', 'POST', {
    role: null, // Public
    collection: 'foro_temas',
    action: 'create',
    permissions: {},
    validation: null,
    fields: ['*']
  });

  console.log("Setup complete!");
}

setup().catch(console.error);
