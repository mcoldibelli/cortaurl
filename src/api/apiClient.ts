const API_URL = import.meta.env.VITE_API_URL;

export async function apiRequest<T>(
    endpoint: string,
    token: string | null,
    options: RequestInit = {}
): Promise<T> {
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (response.status === 204) {
        return undefined as unknown as T;
    }

    let body: any = null;

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        body = await response.json();
    } else {
        body = await response.text();
    }

    if (!response.ok) {
        const errMsg = typeof body === 'string' && body.length
            ? body
            : (body?.error || 'Unknown error');
        throw new Error(errMsg || `HTTP error! status: ${response.status}`);
    }

    return body;
}

export function createApiClient(getToken: () => Promise<string | null>) {
    return {
        async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
            const token = await getToken();
            return apiRequest<T>(endpoint, token, { ...options, method: 'GET' });
        },

        async post<T>(endpoint: string, data: any, options?: RequestInit): Promise<T> {
            const token = await getToken();
            return apiRequest<T>(endpoint, token, {
                ...options,
                method: 'POST',
                body: JSON.stringify(data),
            });
        },

        async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
            const token = await getToken();
            return apiRequest<T>(endpoint, token, { ...options, method: 'DELETE' });
        },
    };
} 