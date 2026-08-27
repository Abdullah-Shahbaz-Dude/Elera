import { useState, useEffect, type ReactNode } from 'react';
import { api, axios } from '@/api/client';
import type { AuthUser, UserProfile } from '@/types/user';
import { getApiErrorMessage } from '@/utils/apiError';
import {
  clearAuthCache,
  getCachedUser,
  setCachedUser,
} from '@/utils/authCache';
import { AuthContext } from './AuthContext';

async function fetchCurrentUser(token: string): Promise<AuthUser> {
  try {
    const res = await api.get<UserProfile>('/api/v1/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { ...res.data, token };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      throw new Error(
        'Profile API (/api/v1/me) not found. Set VITE_API_URL=http://127.0.0.1:5000 in .env and restart the frontend, or deploy the updated backend.'
      );
    }
    throw new Error(getApiErrorMessage(err, 'Could not load your profile'));
  }
}

function persistUser(profile: AuthUser) {
  setCachedUser(profile);
  return profile;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    const cached = getCachedUser();
    if (cached && cached.token === token) {
      setUser(cached);
      setLoading(false);
      return;
    }

    fetchCurrentUser(token)
      .then((profile) => setUser(persistUser(profile)))
      .catch(() => {
        localStorage.removeItem('token');
        clearAuthCache();
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const signup = async (username: string, email: string, password: string) => {
    const res = await api.post('/signup', { username, email, password });
    const token = res.data.token as string;
    localStorage.setItem('token', token);
    const profile = persistUser(await fetchCurrentUser(token));
    setUser(profile);
    return res.data;
  };

  const login = async (email: string, password: string) => {
    const res = await api.post('/login', { email, password });
    const token = res.data.token as string;
    localStorage.setItem('token', token);
    const profile = persistUser(await fetchCurrentUser(token));
    setUser(profile);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    clearAuthCache();
    setUser(null);
  };

  const value = { user, loading, signup, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
