const baseUrl = 'http://control-directus-9ee74c-76-13-234-106.traefik.me';
const token = 'nFBbco3X_5cd8_Hm_-nHbJLK7ceTAJ_p';
const policy = "4e00cb07-6680-4430-82ab-2980aa459871";

async function applyPermissions() {
  const collections = ["foro_categorias", "foro_temas", "foro_respuestas"];
  const actions = ["read", "create", "update", "delete"];

  for (const col of collections) {
    for (const act of actions) {
      console.log(`Applying ${act} to ${col}...`);
      const res = await fetch(`${baseUrl}/permissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          collection: col,
          action: act,
          fields: ["*"],
          policy: policy
        })
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(`Error applying ${act} to ${col}:`, JSON.stringify(data));
      } else {
        console.log(`Success: ID ${data.data.id}`);
      }
    }
  }
}

applyPermissions().catch(console.error);
