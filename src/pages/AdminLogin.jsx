import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Shield, Lock, User, AlertCircle, Gamepad2, ArrowLeft } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  if (isAdmin) {
    navigate('/admin', { replace: true });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const res = login(username.trim(), password.trim());
    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setError(res.error || 'Invalid admin credentials.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center max-w-md mx-auto px-4 py-12">
      <div className="w-full bg-[#080d1e] border border-slate-800 rounded-2xl p-8 space-y-6 shadow-2xl relative overflow-hidden">

        {/* Glow Effects */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/20">
            <Shield className="w-6 h-6 text-white stroke-[2.5]" />
          </div>
          <h1 className="font-orbitron font-extrabold text-2xl text-white tracking-wide">
            ADMIN LOGIN
          </h1>
          <p className="text-xs text-slate-400">
            Authorized portal management access for Dano Store
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Admin Username</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Username (e.g. dano.js)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#0c1224] border border-slate-800 focus:border-cyan-500 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0c1224] border border-slate-800 focus:border-cyan-500 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-orbitron font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all cursor-pointer mt-2"
          >
            Authenticate Admin
          </button>
        </form>

        <div className="text-center pt-2">
          <Link to="/" className="text-xs text-slate-500 hover:text-cyan-400 font-semibold inline-flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Customer Store</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
