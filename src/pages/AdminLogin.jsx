import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Lock, User, KeyRound, ShieldAlert, Gamepad2, ArrowRight } from 'lucide-react';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/admin';

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const res = login(username, password);
    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setError(res.message || 'Invalid admin credentials');
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 p-6 sm:p-8 bg-slate-900/90 border border-slate-800 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 mx-auto mb-3">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <Lock className="w-6 h-6 text-cyan-400" />
          </div>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-100 font-heading">
          Admin Portal Login
        </h1>
        <p className="text-xs text-slate-400">
          Enter credentials to manage Dano Store products and orders.
        </p>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 flex-shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Admin Username
          </label>
          <div className="relative">
            <input
              type="text"
              required
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-950 text-slate-100 text-sm rounded-xl pl-10 pr-4 py-3 border border-slate-800 focus:border-cyan-500 focus:outline-none transition-all"
            />
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 text-slate-100 text-sm rounded-xl pl-10 pr-4 py-3 border border-slate-800 focus:border-cyan-500 focus:outline-none transition-all"
            />
            <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-950/50 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Authenticate Admin</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="text-center pt-2 border-t border-slate-800/80">
        <p className="text-[11px] text-slate-500">
          Protected route. Unauthorized access attempts are restricted.
        </p>
      </div>

    </div>
  );
};
