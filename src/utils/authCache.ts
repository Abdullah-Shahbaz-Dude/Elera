import type { AuthUser } from '@/types/user';

const USER_CACHE_KEY = 'elera_user_profile';

function isAuthUser(value: unknown): value is AuthUser {
  if (!value || typeof value !== 'object') return false;
  const user = value as Record<string, unknown>;
  return (
    typeof user.id === 'number' &&
    typeof user.username === 'string' &&
    typeof user.email === 'string' &&
    typeof user.role === 'string' &&
    typeof user.token === 'string'
  );
}

export function getCachedUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = localStorage.getItem(USER_CACHE_KEY);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    if (!isAuthUser(parsed)) {
      localStorage.removeItem(USER_CACHE_KEY);
      return null;
    }

    return parsed;
  } catch {
    localStorage.removeItem(USER_CACHE_KEY);
    return null;
  }
}

export function setCachedUser(user: AuthUser): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_CACHE_KEY, JSON.stringify(user));
}

export function clearAuthCache(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(USER_CACHE_KEY);
}
