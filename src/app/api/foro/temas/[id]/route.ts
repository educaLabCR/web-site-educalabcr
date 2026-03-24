import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const BASE_URL = process.env.DIRECTUS_API_URL || 'http://control-directus-9ee74c-76-13-234-106.traefik.me';
  const TOKEN = process.env.DIRECTUS_ADMIN_TOKEN || 'nFBbco3X_5cd8_Hm_-nHbJLK7ceTAJ_p';
  const { id } = await params;

  try {
    const response = await fetch(`${BASE_URL}/items/foro_temas/${id}?fields=*,categoria_id.*&access_token=${TOKEN}`, { cache: 'no-store' });

    if (!response.ok) {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }

    const data = await response.json();
    return NextResponse.json(data.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
