import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, AlertCircle, ArrowRight } from 'lucide-react';

export function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const res = onLoginSuccess(username.trim(), password);
    if (res.success) {
      navigate('/admin');
    } else {
      setErrorMsg(res.message || 'Invalid username or password.');
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-cyan-500/20">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-white">Admin Control Portal</h1>
          <p className="text-xs text-slate-400">Sign in with authorized administrator credentials.</p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Admin Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. dano.js"
              className="w-full bg-slate-950 text-sm text-slate-100 placeholder-slate-600 rounded-xl px-4 py-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Admin Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 text-sm text-slate-100 placeholder-slate-600 rounded-xl px-4 py-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500"
              />
              <Lock className="absolute right-3 top-2.5 w-4 h-4 text-slate-600" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all uppercase tracking-wider"
          >
            <span>Log In to Admin</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-800/80">
          <p className="text-[11px] text-slate-500">
            Dano Store Protected Management System
          </p>
        </div>
      </div>
    </div>
  );
}
