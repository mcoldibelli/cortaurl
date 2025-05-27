import fetchApi from './client';

export interface ShortenUrlResponse {
  short_code: string;
  original_url: string;
  expires_at: string;
  created_at: string;
}

export const urlApi = {
  shortenUrl(token: string, url: string, expiresIn?: number) {
    return fetchApi<ShortenUrlResponse>('/shorten', {
      method: 'POST',
      token,
      body: JSON.stringify({ original_url: url, expires_in: expiresIn }),
    });
  },

  getUrls(token: string) {
    return fetchApi('/urls', { token });
  },

  deleteUrl(token: string, short_code: string) {
    return fetchApi(`/urls/${short_code}`, {
      method: 'DELETE',
      token,
    });
  },

  getAnalytics(token: string, short_code: string) {
    return fetchApi(`/urls/${short_code}/analytics`, { token });
  },
};
