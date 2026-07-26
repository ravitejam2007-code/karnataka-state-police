const API_BASE = import.meta.env.VITE_CATALYST_API_URL
  ? import.meta.env.VITE_CATALYST_API_URL
  : import.meta.env.DEV
    ? '/app/ksp_function'
    : 'https://ksp-60079542184.development.catalystserverless.com/app/ksp_function';

function getToken(): string | null {
  try {
    const stored = localStorage.getItem('ksp-auth-storage');
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return parsed?.state?.token ?? null;
  } catch {
    return null;
  }
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  opts?: { isBlob?: boolean }
): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem('ksp-auth-storage');
      if (typeof window !== 'undefined' && window.location.pathname !== '/auth/login') {
        window.location.href = '/auth/login';
      }
      throw new ApiError(401, 'Session expired');
    }
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new ApiError(res.status, err.message || 'API error');
  }

  if (opts?.isBlob) return res.blob() as unknown as T;

  const jsonResponse = await res.json();
  if (jsonResponse && typeof jsonResponse === 'object' && 'status' in jsonResponse && jsonResponse.status === 'success' && 'data' in jsonResponse) {
    return jsonResponse.data as T;
  }

  return jsonResponse as T;
}

export const api = {
  get: <T>(path: string, opts?: { isBlob?: boolean }) => request<T>('GET', path, undefined, opts),
  post: <T>(path: string, body?: unknown) => request<T>('POST', path, body),
  put: <T>(path: string, body?: unknown) => request<T>('PUT', path, body),
  delete: <T>(path: string) => request<T>('DELETE', path),
};
