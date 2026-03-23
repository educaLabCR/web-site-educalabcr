import { NextResponse } from 'next/server';

export async function GET() {
  const BASE_URL = process.env.DIRECTUS_API_URL || 'http://control-directus-9ee74c-76-13-234-106.traefik.me';
  const TOKEN = process.env.DIRECTUS_ADMIN_TOKEN || 'nFBbco3X_5cd8_Hm_-nHbJLK7ceTAJ_p';

  try {
    const [catsRes, coursesRes, siteRes] = await Promise.all([
      fetch(`${BASE_URL}/items/oferta_asincronica_categorias?sort=orden&access_token=${TOKEN}`, { cache: 'no-store' }),
      fetch(`${BASE_URL}/items/oferta_asincronica_cursos?sort=orden&access_token=${TOKEN}`, { cache: 'no-store' }),
      fetch(`${BASE_URL}/items/oferta_asincronica_sitio?access_token=${TOKEN}`, { cache: 'no-store' })
    ]);

    if (!catsRes.ok || !coursesRes.ok || !siteRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch from Directus' }, { status: 500 });
    }

    const [cats, courses, site] = await Promise.all([
      catsRes.json(),
      coursesRes.json(),
      siteRes.json()
    ]);

    return NextResponse.json({
      categories: cats.data || [],
      courses: courses.data || [],
      site: site.data || {}
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
