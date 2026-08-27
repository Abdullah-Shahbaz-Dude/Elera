import { createContext } from 'react';
import type { AuthUser } from '@/types/user';

export interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signup: (userName: string, email: string, password: string) => Promise<unknown>;
  login: (email: string, password: string) => Promise<unknown>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
