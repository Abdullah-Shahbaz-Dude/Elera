import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { getApiErrorMessage } from '@/utils/apiError';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!auth?.login) {
      setError('Auth not available. Please refresh the page.');
      setLoading(false);
      return;
    }
    try {
      await auth.login(email, password);
      navigate('/dashboard', { replace: true });
    } catch (err: unknown) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121419] px-4">
      <div className="w-full max-w-sm p-6 rounded-lg border border-white/10 bg-white/5">
        <h2 className="text-xl font-semibold text-white mb-4">Login</h2>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-white/80 text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              placeholder="test@example.com"
              required
              className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-md bg-white text-[#121419] font-medium hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-5 text-white/70 text-sm">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-white underline hover:no-underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
