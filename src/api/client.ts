import axios from 'axios';
import { clearAuthCache } from '@/utils/authCache';

export const API_BASE = import.meta.env.VITE_API_URL;
export const api = axios.create({
  baseURL: API_BASE,
});

const PUBLIC_AUTH_PATHS = [
  '/login',
  '/signup',
  '/api/v1/auth/login',
  '/api/v1/auth/register',
  '/api/v1/auth/token',
];

function isPublicAuthRequest(url: string | undefined): boolean {
  if (!url) return false;
  return PUBLIC_AUTH_PATHS.some((path) => url.includes(path));
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url as string | undefined;

    if (status === 401 && !isPublicAuthRequest(requestUrl)) {
      localStorage.removeItem('token');
      clearAuthCache();
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export { axios };
