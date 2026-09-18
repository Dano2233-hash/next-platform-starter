import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Lock, User, AlertCircle, ShieldCheck, KeyRound } from 'lucide-react';

export function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const res = login(username.trim(), password.trim());
    if (res.success) {
      navigate('/admin');
    } else {
      setErrorMessage(res.error || 'Invalid credentials.');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-[#090d16] border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden">

        {/* Glow accent */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-lg">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-white">Admin Portal Login</h1>
          <p className="text-xs text-slate-400">
            Sign in to manage Dano Store products, stock & orders.
          </p>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="bg-rose-950/60 border border-rose-600/50 text-rose-300 p-3.5 rounded-xl text-xs flex items-center gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Admin Username</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="dano.js"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-slate-100 text-sm pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500"
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Admin Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-slate-100 text-sm pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500"
              />
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-black text-sm py-3.5 rounded-xl shadow-xl shadow-cyan-950/60 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.99] mt-2"
          >
            <Lock className="w-4 h-4" />
            <span>Access Dashboard</span>
          </button>
        </form>

        <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-center">
          <p className="text-[11px] text-slate-400">
            Protected Dano Store Administration Area.
          </p>
        </div>

      </div>
    </div>
  );
}
