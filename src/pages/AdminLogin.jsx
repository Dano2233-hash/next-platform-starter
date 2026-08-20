import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, KeyRound, User, Lock, AlertCircle } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please fill in both username and password.');
      return;
    }

    const res = onLoginSuccess(username, password);
    if (res && res.success) {
      navigate('/admin');
    } else {
      setError(res?.error || 'Invalid credentials. Username is dano.js');
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="bg-[#0d1322] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-purple-950/80 border border-purple-600/40 rounded-2xl flex items-center justify-center mx-auto text-purple-400 shadow-lg shadow-purple-600/20">
            <KeyRound className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-white uppercase tracking-wider">
            Admin Portal
          </h1>
          <p className="text-xs text-slate-400">
            Protected area for store management & inventory control
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-xl bg-red-950/80 border border-red-700/80 text-red-300 text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Admin Username
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="dano.js"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError('');
                }}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-100 outline-none focus:border-purple-500 transition-all"
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Admin Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-100 outline-none focus:border-purple-500 transition-all"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-purple-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Authenticate & Access Dashboard</span>
          </button>
        </form>

        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 text-center">
          <p className="font-semibold text-slate-300">Credentials:</p>
          <p className="font-mono text-cyan-400 mt-0.5">Username: dano.js | Password: lawa2233</p>
        </div>
      </div>
    </div>
  );
}
