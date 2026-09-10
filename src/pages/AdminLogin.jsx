import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, AlertCircle, KeyRound } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function AdminLogin({ onLoginSuccess }) {
  const navigate = useNavigate();
  const { isAdmin, login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please fill in both username and password');
      return;
    }

    const result = login(username.trim(), password.trim());
    if (result.success) {
      if (onLoginSuccess) onLoginSuccess(username.trim(), password.trim());
      navigate('/admin');
    } else {
      setError(result.message || 'Invalid admin credentials');
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 sm:py-20">
      <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 mx-auto shadow-lg shadow-cyan-950/50">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-cyan-400" />
            </div>
          </div>

          <h1 className="text-2xl font-black text-slate-100 tracking-tight">
            Admin Portal
          </h1>
          <p className="text-xs text-slate-400">
            Secure management panel for Dano Store
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
              />
              <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
              />
              <KeyRound className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/50 transition-all active:scale-[0.99]"
          >
            <Lock className="w-4 h-4" />
            <span>Access Admin Panel</span>
          </button>
        </form>

        <div className="pt-2 text-center">
          <p className="text-[11px] text-slate-500">
            Protected route. Direct access without authentication is restricted.
          </p>
        </div>
      </div>
    </div>
  );
}
