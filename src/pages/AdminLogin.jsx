import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const AdminLogin = () => {
  const { isAdmin, login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');

    const res = login(username.trim(), password);
    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.error || 'Invalid username or password');
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 space-y-6">
      <div className="bg-[#080d1f] border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Icon & Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl flex items-center justify-center mx-auto text-cyan-400 shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-slate-100 uppercase tracking-tight">
            Admin Portal Login
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Authorized store administrator credentials required.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Username</label>
            <div className="relative">
              <input
                type="text"
                placeholder="dano.js"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError('');
                }}
                className="w-full bg-[#0d142b] border border-slate-700 text-slate-100 text-xs rounded-xl py-2.5 pl-9 pr-3 focus:outline-none focus:border-cyan-400"
                required
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                className="w-full bg-[#0d142b] border border-slate-700 text-slate-100 text-xs rounded-xl py-2.5 pl-9 pr-3 focus:outline-none focus:border-cyan-400"
                required
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-cyan-950/60 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
