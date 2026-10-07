import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, AlertCircle, Gamepad2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim() || !password) {
      setErrorMessage('Please enter both username and password.');
      return;
    }

    const res = login(username, password);
    if (res.success) {
      navigate('/admin');
    } else {
      setErrorMessage(res.error || 'Invalid credentials');
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4 space-y-6">

      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-xl mx-auto">
          <div className="w-full h-full bg-[#05070f] rounded-[14px] flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-cyan-400" />
          </div>
        </div>

        <h1 className="text-2xl font-black text-slate-100">Dano Store Admin Portal</h1>
        <p className="text-xs text-slate-400">Sign in to access product catalog management &amp; orders</p>
      </div>

      <form onSubmit={handleLogin} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 shadow-2xl">
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            Admin Username
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. dano.js"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-950 text-sm text-slate-100 placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none transition-all"
            />
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 text-sm text-slate-100 placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none transition-all"
            />
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
        >
          <Lock className="w-4 h-4 fill-slate-950" />
          <span>Login to Admin Dashboard</span>
        </button>
      </form>

    </div>
  );
}
