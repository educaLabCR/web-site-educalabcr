
async function checkApi() {
  try {
    const res = await fetch('http://localhost:3000/api/oferta-asincronica');
    const data = await res.json();
    console.log('Keys in first course:', Object.keys(data.courses[0] || {}));
    console.log('First course sample:', data.courses[0]);
  } catch (e) {
    console.error(e);
  }
}
checkApi();
