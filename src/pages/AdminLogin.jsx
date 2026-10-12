import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ShieldCheck, Lock, AlertCircle, Gamepad2 } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const res = login(username.trim(), password.trim());
    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setError(res.error || 'Invalid username or password');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Glow Accent background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5 mx-auto shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-cyan-400" />
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-100 tracking-tight">
            Admin Portal Access
          </h2>
          <p className="text-xs text-slate-400">
            Protected area for Dano Store store management.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
              Username
            </label>
            <input
              type="text"
              placeholder="e.g. dano.js"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full py-3 px-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-3 px-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:via-cyan-400 hover:to-purple-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all active:scale-98"
          >
            Authenticate & Login
          </button>
        </form>

        <div className="text-center pt-2">
          <span className="text-[11px] text-slate-500 font-mono">
            Default credentials: dano.js / lawa2233
          </span>
        </div>
      </div>
    </div>
  );
}
