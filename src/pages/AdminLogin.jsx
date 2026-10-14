import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, AlertCircle, Gamepad2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect to admin dashboard
  if (isAdmin) {
    navigate('/admin', { replace: true });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Username and password are required');
      return;
    }

    const res = login(username.trim(), password.trim());
    if (res.success) {
      navigate('/admin', { replace: true });
    } else {
      setError(res.error || 'Invalid username or password');
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 sm:p-8 bg-[#0a0e1c] rounded-3xl border border-slate-800 space-y-6 shadow-2xl relative overflow-hidden">

      {/* Background Subtle Accent Glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 border border-purple-400/40 mx-auto flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">Admin Portal</h1>
        <p className="text-xs text-slate-400">
          Enter official store manager credentials to manage products & orders.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Admin Username
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. dano.js"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-500 pl-10 pr-4 py-3 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Admin Password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-500 pl-10 pr-4 py-3 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-black text-sm shadow-xl shadow-purple-500/20 transition-all active:scale-95 cursor-pointer uppercase tracking-wider"
        >
          Sign In to Admin Dashboard
        </button>
      </form>

      <div className="pt-2 text-center">
        <button
          onClick={() => navigate('/')}
          className="text-xs text-slate-500 hover:text-slate-300 transition-colors font-medium"
        >
          &larr; Return to Dano Store
        </button>
      </div>

    </div>
  );
}
