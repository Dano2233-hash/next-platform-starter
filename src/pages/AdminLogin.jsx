import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Lock, User, AlertCircle, KeyRound } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password.trim()) {
      setErrorMsg('Please fill in both admin username and password.');
      return;
    }

    const res = login(username.trim(), password.trim());
    if (res.success) {
      navigate('/admin');
    } else {
      setErrorMsg(res.message || 'Invalid credentials');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-[#090d1a] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center mx-auto text-purple-400 shadow-lg">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Admin Portal Login</h1>
          <p className="text-xs text-slate-400">
            Dano Store Management System
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-xl text-xs text-red-300 flex items-center gap-2 font-semibold">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-300 mb-1">
              Admin Username
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Username (dano.js)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#05070f] text-slate-100 text-sm rounded-xl pl-10 pr-4 py-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">
              Admin Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Password (lawa2233)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#05070f] text-slate-100 text-sm rounded-xl pl-10 pr-4 py-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-purple-950/50 flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
          >
            <KeyRound className="w-4 h-4" />
            <span>Sign In to Dashboard</span>
          </button>
        </form>

        <div className="p-3 bg-[#05070f] border border-slate-800/80 rounded-xl text-[11px] text-slate-400 text-center space-y-1">
          <p className="font-semibold text-slate-300">Default Admin Credentials:</p>
          <p className="font-mono text-cyan-400">Username: dano.js | Password: lawa2233</p>
        </div>

      </div>
    </div>
  );
}
