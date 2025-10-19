export default async (req, context) => {
  const path = req.url.replace('/.netlify/functions/api', '');
  const apiUrl = `http://180.184.65.66:7010${path}`;
  
  try {
    const response = await fetch(apiUrl, {
      method: req.method,
      headers: req.headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? await req.text() : undefined,
    });
    
    const data = await response.text();
    return new Response(data, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
