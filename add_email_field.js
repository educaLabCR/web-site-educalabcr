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

async function updateFields() {
  console.log("Añadiendo campo autor_email a foro_temas...");
  await apiCall('/fields/foro_temas', 'POST', {
    field: 'autor_email',
    type: 'string',
    meta: {
      interface: 'input',
      note: 'Email del autor'
    }
  });

  console.log("Añadiendo campo autor_email a foro_respuestas...");
  await apiCall('/fields/foro_respuestas', 'POST', {
    field: 'autor_email',
    type: 'string',
    meta: {
      interface: 'input',
      note: 'Email del autor'
    }
  });

  console.log("Campos actualizados!");
}

updateFields().catch(console.error);
