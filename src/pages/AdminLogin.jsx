import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const res = login(username.trim(), password.trim());
    if (res.success) {
      navigate('/admin');
    } else {
      setErrorMsg(res.error || 'Invalid credentials.');
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <div className="p-8 rounded-3xl bg-[#090d1a] border border-slate-800 shadow-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-cyan-950/50 border border-cyan-400/30">
            <Shield className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-white">Admin Authentication</h1>
          <p className="text-xs text-slate-400">
            Authorized management panel access for Dano Store
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 text-xs font-semibold flex items-center gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Username</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="dano.js"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 text-slate-100 text-xs rounded-xl pl-9 pr-3 py-2.5 outline-none transition-colors"
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 text-slate-100 text-xs rounded-xl pl-9 pr-3 py-2.5 outline-none transition-colors"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-lg shadow-cyan-950/50 flex items-center justify-center gap-2 cursor-pointer transition-all pt-3"
          >
            <span>Login to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-500 text-center">
          Protected Area • Session saved to Local Storage
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
