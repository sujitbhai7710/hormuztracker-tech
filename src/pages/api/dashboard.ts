import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  try {
    const response = await fetch('https://hormuzstraitmonitor.com/api/dashboard', {
      headers: {
        'User-Agent': 'HormuzWatch/1.0',
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=30',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
