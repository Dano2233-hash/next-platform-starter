import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ShieldCheck, Lock, User, AlertCircle, ArrowLeft, KeyRound } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  // If already logged in, redirect directly
  if (isAdmin) {
    navigate('/admin', { replace: true });
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both admin username and password.');
      return;
    }

    const result = login(username.trim(), password.trim());

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#080d1e] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center mx-auto shadow-lg shadow-purple-950/50">
            <ShieldCheck className="w-7 h-7 text-slate-950 stroke-[2.5]" />
          </div>
          <h1 className="text-2xl font-black text-slate-100">Admin Panel Access</h1>
          <p className="text-xs text-slate-400">
            Secure administrative area for Dano Store managers.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-300 mb-1.5">Username</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="dano.js"
                className="w-full bg-[#05070f] border border-slate-800 focus:border-purple-500 rounded-xl py-2.5 pl-10 pr-4 text-slate-100 placeholder-slate-600 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#05070f] border border-slate-800 focus:border-purple-500 rounded-xl py-2.5 pl-10 pr-4 text-slate-100 placeholder-slate-600 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-950/50 transition-all mt-2"
          >
            <KeyRound className="w-4 h-4" /> Authenticate & Access
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-800/80">
          <button
            onClick={() => navigate('/')}
            className="text-xs font-bold text-slate-400 hover:text-cyan-300 inline-flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Storefront
          </button>
        </div>
      </div>
    </div>
  );
}
