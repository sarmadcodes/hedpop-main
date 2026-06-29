import AsyncStorage from '@react-native-async-storage/async-storage';
import env from '../config/env';

const TOKEN_KEY = '@hedpop/token';

export const tokenStorage = {
  async get() {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      console.log('[apiClient] tokenStorage.get =>', token ? `EXISTS (${token.slice(0, 20)}...)` : 'NULL');
      return token;
    } catch {
      return null;
    }
  },
  async set(token) {
    try {
      if (token) {
        await AsyncStorage.setItem(TOKEN_KEY, token);
        console.log('[apiClient] tokenStorage.set => SAVED', token.slice(0, 20) + '...');
      } else {
        await AsyncStorage.removeItem(TOKEN_KEY);
        console.log('[apiClient] tokenStorage.set => CLEARED');
      }
    } catch (e) {
      console.log('[apiClient] tokenStorage.set ERROR =>', e);
    }
  },
  async clear() {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      console.log('[apiClient] tokenStorage.clear => DONE');
    } catch {}
  },
};

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

async function request(path, { method = 'GET', body, headers = {}, signal } = {}) {
  const token = await tokenStorage.get();
  const url = `${env.API_BASE_URL}${path}`;

  console.log(`[apiClient] ${method} ${url}`);
  console.log('[apiClient] token in header =>', token ? 'YES' : 'NO ← THIS IS THE PROBLEM');

  const finalHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...headers,
  };
  if (token) finalHeaders.Authorization = `Bearer ${token}`;

  let response;
  try {
    response = await fetch(url, {
      method,
      headers: finalHeaders,
      body: body ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (err) {
    console.log('[apiClient] Network error =>', err.message);
    throw new ApiError('Network request failed', 0, null);
  }

  console.log(`[apiClient] Response status => ${response.status}`);

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await response.json().catch(() => null)
    : await response.text().catch(() => null);

  if (!response.ok) {
    console.log('[apiClient] Error response =>', data);
    const message = (data && data.message) || `Request failed (${response.status})`;
    throw new ApiError(message, response.status, data);
  }
  return data;
}

export const api = {
  get: (path, opts) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
  put: (path, body, opts) => request(path, { ...opts, method: 'PUT', body }),
  patch: (path, body, opts) => request(path, { ...opts, method: 'PATCH', body }),
  delete: (path, opts) => request(path, { ...opts, method: 'DELETE' }),
};

export default api;