import { NextResponse } from 'next/server';

export async function GET() {
  const BASE_URL = 'http://control-directus-9ee74c-76-13-234-106.traefik.me';
  const TOKEN = 'nFBbco3X_5cd8_Hm_-nHbJLK7ceTAJ_p';

  try {
    const [articlesRes, siteRes] = await Promise.all([
      fetch(`${BASE_URL}/items/boletin_articulos?status=published&access_token=${TOKEN}`, {
        cache: 'no-store'
      }),
      fetch(`${BASE_URL}/items/boletin_sitio?access_token=${TOKEN}`, {
        cache: 'no-store'
      })
    ]);

    if (!articlesRes.ok || !siteRes.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch from Directus', status: [articlesRes.status, siteRes.status] },
        { status: 500 }
      );
    }

    const articlesData = await articlesRes.json();
    const siteData = await siteRes.json();

    return NextResponse.json({
      articles: articlesData.data || [],
      site: siteData.data || {}
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
