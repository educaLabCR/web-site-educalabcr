
async function checkApi() {
  try {
    const res = await fetch('http://localhost:3000/api/oferta-asincronica');
    const data = await res.json();
    console.log('Keys in site data:', Object.keys(data.site || {}));
    console.log('Site data sample:', data.site);
  } catch (e) {
    console.error(e);
  }
}
checkApi();
