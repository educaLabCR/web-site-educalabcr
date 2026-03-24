import { NextResponse } from 'next/server';

const BASE_URL = process.env.DIRECTUS_API_URL || 'http://control-directus-9ee74c-76-13-234-106.traefik.me';
const TOKEN = process.env.DIRECTUS_ADMIN_TOKEN || 'nFBbco3X_5cd8_Hm_-nHbJLK7ceTAJ_p';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const response = await fetch(`${BASE_URL}/items/foro_respuestas?filter[tema_id][_eq]=${id}&sort=date_created&access_token=${TOKEN}`, { cache: 'no-store' });

    if (!response.ok) {
        return NextResponse.json({ error: 'Failed to fetch' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data.data || []);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const data = await req.json();

    // 1. Create the reply
    const replyRes = await fetch(`${BASE_URL}/items/foro_respuestas?access_token=${TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tema_id: parseInt(id),
        autor_nombre: data.autor_nombre,
        autor_avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.autor_nombre}`,
        contenido: `<p>${data.contenido}</p>`,
      }),
    });

    if (!replyRes.ok) {
        const errorData = await replyRes.json();
        return NextResponse.json({ error: errorData }, { status: replyRes.status });
    }

    const newReply = await replyRes.json();

    // 2. Update replies count
    const topicRes = await fetch(`${BASE_URL}/items/foro_temas/${id}?fields=replies_count&access_token=${TOKEN}`);
    if (topicRes.ok) {
        const topicData = await topicRes.json();
        const currentCount = topicData.data.replies_count || 0;
        
        await fetch(`${BASE_URL}/items/foro_temas/${id}?access_token=${TOKEN}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                replies_count: currentCount + 1
            }),
        });
    }

    return NextResponse.json(newReply.data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
