import { NextResponse } from 'next/server';

const BASE_URL = process.env.DIRECTUS_API_URL || 'http://control-directus-9ee74c-76-13-234-106.traefik.me';
const TOKEN = process.env.DIRECTUS_ADMIN_TOKEN || 'nFBbco3X_5cd8_Hm_-nHbJLK7ceTAJ_p';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const payload = {
      title: data.title,
      autor_nombre: data.autor_nombre,
      autor_avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.autor_nombre}`,
      categoria_id: parseInt(data.categoria_id),
      contenido: `<div style="margin-bottom: 20px;">${data.contenido}</div><hr/><small>Autor: ${data.autor_nombre} (${data.autor_email})</small>`,
      tags: data.tags || []
    };

    const response = await fetch(`${BASE_URL}/items/foro_temas`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = errorText;
      }
      console.error('Foro Tema POST Error:', JSON.stringify(errorData, null, 2));
      return NextResponse.json({ error: errorData }, { status: response.status });
    }

    const newTopic = await response.json();
    return NextResponse.json(newTopic.data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
