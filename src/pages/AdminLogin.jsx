import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { ShieldCheck, Lock, User, AlertCircle, Gamepad2 } from 'lucide-react';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const result = login(username, password);
    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <div className="bg-[#080d1a] border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl shadow-cyan-950/20">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 mx-auto">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-slate-100">Admin Login</h1>
          <p className="text-xs text-slate-400">
            Enter authorized management credentials for Dano Store
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-950/80 border border-rose-800 text-rose-300 rounded-xl text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="dano.js"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-600 rounded-xl pl-10 pr-4 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-600 rounded-xl pl-10 pr-4 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-xs font-extrabold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-md shadow-cyan-950/40 transition-all cursor-pointer mt-2"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};
