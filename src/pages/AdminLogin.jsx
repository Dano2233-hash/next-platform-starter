import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Shield, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const res = login(username, password);
    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 space-y-6">

      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 p-0.5 shadow-xl shadow-cyan-500/20 mx-auto">
          <div className="w-full h-full bg-[#070b19] rounded-[14px] flex items-center justify-center">
            <Shield className="w-7 h-7 text-cyan-400" />
          </div>
        </div>
        <h1 className="text-2xl font-black text-white">Admin Authentication</h1>
        <p className="text-xs text-slate-400">Sign in to manage product catalog, stock, and orders.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#090e1c] border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl">

        {error && (
          <div className="p-3 bg-red-950/80 border border-red-500/50 rounded-xl text-red-300 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Username
          </label>
          <div className="relative">
            <input
              type="text"
              required
              placeholder="dano.js"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white text-sm rounded-xl pl-10 pr-4 py-2.5 focus:border-cyan-500 transition-all"
            />
            <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
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
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white text-sm rounded-xl pl-10 pr-4 py-2.5 focus:border-cyan-500 transition-all"
            />
            <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all"
        >
          Login to Dashboard <ArrowRight className="w-4 h-4" />
        </button>

      </form>

    </div>
  );
}
