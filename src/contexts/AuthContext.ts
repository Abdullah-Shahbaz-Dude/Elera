import { createContext } from 'react';

export interface AuthContextType {
  user: { token?: string; [key: string]: unknown } | null;
  loading: boolean;
  signup: (userName: string, email: string, password: string) => Promise<unknown>;
  login: (email: string, password: string) => Promise<unknown>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
