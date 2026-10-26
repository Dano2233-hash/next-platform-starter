import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

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

    const res = login(username, password);
    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
          <Shield className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-white">Admin Portal Access</h1>
        <p className="text-xs text-slate-400">
          Authorized store management sign-in for Dano Store
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#080d1e] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Admin Username
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              placeholder="dano.js"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#0d1326] border border-slate-800 focus:border-cyan-500 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Admin Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0d1326] border border-slate-800 focus:border-cyan-500 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 hover:opacity-95 flex items-center justify-center space-x-2 cursor-pointer"
        >
          <span>Sign In to Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
