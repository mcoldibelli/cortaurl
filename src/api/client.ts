const API_BASE = import.meta.env.VITE_API_BASE;
if (!API_BASE) throw new Error('Faltando a variável de ambiente VITE_API_BASE.');

interface FetchOptions extends RequestInit {
  token?: string;
}

async function fetchApi<T = any>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.token ? { 'Authorization': `Bearer ${options.token}` } : {}),
    ...(options.headers || {}),
  };
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  let body: any;
  try {
    body = await res.json();
  } catch (e) {
    body = await res.text();
  }
  if (!res.ok) {
    const errMsg = typeof body === 'string' ? body : body?.message || 'Erro desconhecido na API';
    throw new Error(errMsg);
  }
  return body;
}

export default fetchApi;
