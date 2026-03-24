const baseUrl = 'http://control-directus-9ee74c-76-13-234-106.traefik.me';
const token = 'nFBbco3X_5cd8_Hm_-nHbJLK7ceTAJ_p';

async function testCreateCategory() {
  console.log("Testeando creación de categoría con TOKEN...");
  
  const payload = {
    name: "Test Diagnostic " + Date.now(),
    icon: 'Hash',
    color: 'text-primary',
    bg: 'bg-primary/10',
    sort: 99
  };

  const res = await fetch(`${baseUrl}/items/foro_categorias`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  console.log('Status:', res.status);
  console.log('Response:', JSON.stringify(data, null, 2));
}

testCreateCategory().catch(console.error);
