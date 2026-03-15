'use client';

import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('admin@company.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        window.location.href = '/dashboard';
      } else {
        setError('Invalid credentials');
      }
    } catch {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border border-slate-100">
        <div className="text-center mb-10 mt-4">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-blue-600/20 rotate-3">
            <span className="text-white text-2xl font-bold -rotate-3">EM</span>
          </div>
          <h1 className="text-3xl font-bold text-black tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 mt-2 font-medium">Sign in to the employee portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm text-center font-medium border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition bg-slate-50/50 focus:bg-white text-black placeholder-slate-400"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition bg-slate-50/50 focus:bg-white text-black placeholder-slate-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-3.5 px-4 rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-600/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:active:scale-100 shadow-md shadow-blue-600/10 mt-4"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-slate-100/80 text-center">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Demo Credentials</p>
          <div className="inline-flex gap-4 items-center justify-center text-xs font-mono bg-slate-50/80 p-3 rounded-lg text-slate-600 border border-slate-100">
            <div><span className="text-slate-400 select-none mr-2">Email:</span>admin@company.com</div>
            <div className="w-px h-4 bg-slate-200"></div>
            <div><span className="text-slate-400 select-none mr-2">Pass:</span>admin123</div>
          </div>
        </div>
      </div>
    </div>
  );
}
