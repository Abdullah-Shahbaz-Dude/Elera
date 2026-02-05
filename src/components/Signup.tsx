import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Signup() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!auth?.signup) {
      setError('Auth not available. Please refresh the page.');
      setLoading(false);
      return;
    }
    try {
      await auth.signup(userName, email, password);
      alert('Account created! You can log in now.');
      window.location.href = '/login';
    } catch (err: unknown) {
      const data =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { message?: string; error?: string } } }).response?.data
          : null;
      const msg = data?.message ?? data?.error ?? 'Something went wrong';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121419] px-4">
      <div className="w-full max-w-sm p-6 rounded-lg border border-white/10 bg-white/5">
        <h2 className="text-xl font-semibold text-white mb-4">Sign up</h2>

        {error && (
          <div className="mb-4">
            <p className="text-red-400 text-sm">{error}</p>
            {error.toLowerCase().includes('user already present') && (
              <p className="text-white/70 text-sm mt-2">
                Already have an account?{' '}
                <Link to="/login" className="text-white underline hover:no-underline">
                  Log in
                </Link>
              </p>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-white/80 text-sm mb-1">Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value.trim())}
              placeholder="Your name"
              required
              className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>

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
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <p className="mt-5 text-white/70 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-white underline hover:no-underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
