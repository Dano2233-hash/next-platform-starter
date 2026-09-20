import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldAlert, Lock, User, AlertCircle, Gamepad2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const res = login(username.trim(), password.trim());
    if (res.success) {
      const from = location.state?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    } else {
      setError(res.message || 'Invalid admin credentials');
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <div className="p-8 rounded-3xl bg-[#080d1a] border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">

        {/* Glow ambient */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-400 to-purple-600 p-[2px] mx-auto shadow-lg shadow-purple-950">
            <div className="w-full h-full bg-[#080d1a] rounded-[14px] flex items-center justify-center">
              <ShieldAlert className="w-7 h-7 text-purple-400" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Admin Portal</h1>
          <p className="text-xs text-slate-400">Dano Store Management Authorization</p>
        </div>

        {/* Error alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Username</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="dano.js"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#0d1428] border border-slate-800 focus:border-cyan-500 rounded-xl py-2.5 pl-9 pr-3 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all"
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0d1428] border border-slate-800 focus:border-cyan-500 rounded-xl py-2.5 pl-9 pr-3 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-cyan-500 to-blue-600 text-slate-950 font-black text-sm shadow-xl shadow-purple-950 hover:opacity-95 transition-all cursor-pointer"
          >
            Access Dashboard
          </button>
        </form>

        <div className="text-center pt-2 text-[11px] text-slate-500">
          Protected route. Authorized Personnel Only.
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
