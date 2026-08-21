export interface UserProfile {
  id: number;
  username: string;
  email: string;
  role: string;
  school_id: number | null;
  is_active: boolean;
  is_verified: boolean;
  created_at?: string;
}

export interface AuthUser extends UserProfile {
  token: string;
}
