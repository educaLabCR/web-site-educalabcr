import { NextResponse } from 'next/server';

export async function GET() {
  const BASE_URL = process.env.DIRECTUS_API_URL || 'http://control-directus-9ee74c-76-13-234-106.traefik.me';
  const TOKEN = process.env.DIRECTUS_ADMIN_TOKEN || 'nFBbco3X_5cd8_Hm_-nHbJLK7ceTAJ_p';

  try {
    const [catsRes, topicsRes] = await Promise.all([
      fetch(`${BASE_URL}/items/foro_categorias?sort=sort`, { 
        cache: 'no-store',
        headers: {
          'Authorization': `Bearer ${TOKEN}`
        }
      }),
      fetch(`${BASE_URL}/items/foro_temas?fields=*,categoria_id.*&sort=-date_created`, { 
        cache: 'no-store',
        headers: {
          'Authorization': `Bearer ${TOKEN}`
        }
      })
    ]);

    if (!catsRes.ok || !topicsRes.ok) {
      const catsErr = !catsRes.ok ? await catsRes.text() : null;
      const topicsErr = !topicsRes.ok ? await topicsRes.text() : null;
      console.error('Foro GET Error:', { catsErr, topicsErr });
      return NextResponse.json({ error: 'Failed to fetch from Directus' }, { status: 500 });
    }

    const [cats, topics] = await Promise.all([
      catsRes.json(),
      topicsRes.json()
    ]);

    return NextResponse.json({
      categories: cats.data || [],
      topics: topics.data || []
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
