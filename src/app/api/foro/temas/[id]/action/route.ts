import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const BASE_URL = process.env.DIRECTUS_API_URL || 'http://control-directus-9ee74c-76-13-234-106.traefik.me';
  const TOKEN = process.env.DIRECTUS_ADMIN_TOKEN || 'nFBbco3X_5cd8_Hm_-nHbJLK7ceTAJ_p';
  const { id } = params;

  try {
    const data = await req.json();
    
    // In Directus, we can use the 'like' logic by updating the 'likes' field.
    // Ideally this would be an atomic increment, but for now we update if client sends it.
    // If we want a separate 'comments' collection, we'd create it here.
    // Since we don't have a 'foro_respuestas' collection yet, let's just mock 201 for now or 
    // suggest creating it.
    
    // If data.type === 'like'
    if (data.type === 'like') {
      const patchRes = await fetch(`${BASE_URL}/items/foro_temas/${id}?access_token=${TOKEN}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          likes: data.count
        }),
      });
      if (!patchRes.ok) throw new Error('Failed to update likes');
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Action not supported yet' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
