import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, AlertCircle, KeyRound, ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function AdminLogin() {
  const { isAdmin, login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const res = login(username.trim(), password.trim());
    if (res.success) {
      navigate('/admin', { replace: true });
    } else {
      setErrorMessage(res.message || 'Invalid admin credentials');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-[#090d1a] border border-purple-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center space-y-3 relative z-10">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-purple-600 via-blue-600 to-cyan-500 p-[1.5px] shadow-lg shadow-purple-500/20">
            <div className="w-full h-full bg-[#05070f] rounded-[14.5px] flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-7 h-7" />
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Admin Portal</h1>
            <p className="text-xs text-slate-400">
              Dano Store Protected Management System
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2.5 animate-shake">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span className="font-semibold">{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4 relative z-10">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="dano.js"
                className="w-full bg-slate-950 text-sm text-slate-100 placeholder-slate-600 pl-10 pr-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-purple-500 transition-all"
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 text-sm text-slate-100 placeholder-slate-600 pl-10 pr-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-purple-500 transition-all"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl font-extrabold text-xs text-white bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:opacity-95 shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all mt-2"
          >
            <KeyRound className="w-4 h-4" />
            <span>Login to Dashboard</span>
          </button>
        </form>

        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-400 text-center">
          <span>Official Admin Credentials: </span>
          <span className="font-mono text-purple-300 font-bold">dano.js</span> / <span className="font-mono text-cyan-300 font-bold">lawa2233</span>
        </div>
      </div>
    </div>
  );
}
