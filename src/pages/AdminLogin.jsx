import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, User, Key, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const res = onLoginSuccess(username, password);
    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setError(res.error || 'Invalid username or password');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-[#090e1c] border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-blue-600 to-cyan-500 p-0.5 mx-auto shadow-lg shadow-purple-500/20">
            <div className="w-full h-full bg-[#050811] rounded-[14px] flex items-center justify-center">
              <Lock className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-white">Admin Portal</h1>
          <p className="text-xs text-slate-400">Log in with authorized Dano Store credentials</p>
        </div>

        {error && (
          <div className="bg-red-950/60 border border-red-500/40 p-3 rounded-xl text-xs text-red-300 flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Username</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="dano.js"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-950 text-white text-sm rounded-xl pl-9 pr-4 py-2.5 border border-slate-800 focus:outline-none focus:border-purple-500"
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 text-white text-sm rounded-xl pl-9 pr-4 py-2.5 border border-slate-800 focus:outline-none focus:border-purple-500"
              />
              <Key className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-extrabold py-3 rounded-xl shadow-lg shadow-purple-500/20 text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" /> Admin Login
          </button>
        </form>

        <div className="text-[11px] text-slate-500 text-center pt-2">
          Protected Area • Dano Store Management System
        </div>
      </div>
    </div>
  );
}
