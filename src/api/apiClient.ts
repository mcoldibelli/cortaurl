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

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
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