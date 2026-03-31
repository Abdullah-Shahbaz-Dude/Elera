import { useState, useEffect, type ReactNode } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const API_BASE =
  import.meta.env.VITE_API_URL ?? 'https://web-production-d29fb.up.railway.app';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{
    token?: string;
    [key: string]: unknown;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const signup = async (username: string, email: string, password: string) => {
    const res = await axios.post(`${API_BASE}/signup`, {
      username,
      email,
      password,
    });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user ?? { token: res.data.token });
    return res.data;
  };

  const login = async (email: string, password: string) => {
    const res = await axios.post(`${API_BASE}/login`, {
      email,
      password,
    });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user ?? { token: res.data.token });
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = { user, loading, signup, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
