import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import type { ReactNode } from 'react';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const auth = useContext(AuthContext);
  const user = auth?.user;
  const loading = auth?.loading ?? true;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-slate-600">Loading...</p>
      </div>
    );
  }
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}
