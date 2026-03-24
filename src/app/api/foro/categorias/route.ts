import { NextResponse } from 'next/server';

const BASE_URL = process.env.DIRECTUS_API_URL || 'http://control-directus-9ee74c-76-13-234-106.traefik.me';
const TOKEN = process.env.DIRECTUS_ADMIN_TOKEN || 'nFBbco3X_5cd8_Hm_-nHbJLK7ceTAJ_p';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.name) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    const payload = {
      name: data.name,
      icon: 'Hash', // default icon
      color: 'text-primary',
      bg: 'bg-primary/10',
      sort: 99
    };

    console.log('Attempting to create category:', data.name);
    
    const response = await fetch(`${BASE_URL}/items/foro_categorias`, {
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
      console.error('Directus 403 Full Error:', JSON.stringify(errorData, null, 2));
      return NextResponse.json({ error: errorData }, { status: response.status });
    }

    const newCategory = await response.json();
    return NextResponse.json(newCategory.data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
