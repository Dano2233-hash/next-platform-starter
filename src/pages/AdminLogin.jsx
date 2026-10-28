import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Lock, User, AlertCircle, Gamepad2 } from 'lucide-react';

export function AdminLogin() {
  const navigate = useNavigate();
  const { login, isAdmin } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (isAdmin) {
    navigate('/admin', { replace: true });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const res = login(username.trim(), password.trim());
    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-8 bg-[#0a0f20] border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5 mx-auto shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-[#070b19] rounded-[14px] flex items-center justify-center">
              <Lock className="w-7 h-7 text-cyan-400" />
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Admin Portal Login</h2>
          <p className="text-xs text-slate-400">
            Authorized management login for Dano Store admins.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Username</label>
            <div className="relative">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full bg-[#050814] text-slate-100 placeholder-slate-500 text-xs rounded-xl pl-10 pr-4 py-3 border border-slate-800 focus:border-cyan-500"
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-[#050814] text-slate-100 placeholder-slate-500 text-xs rounded-xl pl-10 pr-4 py-3 border border-slate-800 focus:border-cyan-500"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-cyan-600/25 transition-all mt-2"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
