import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, AlertCircle, Gamepad2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const AdminLogin = () => {
  const { isAdmin, login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const res = login(username.trim(), password.trim());
    if (res.success) {
      navigate('/admin');
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-[#080d1a] border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden space-y-6">

        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-[1.5px] mx-auto shadow-lg shadow-cyan-950/50">
            <div className="w-full h-full bg-[#080d1a] rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-white">Admin Login</h1>
          <p className="text-xs text-slate-400">Access Dano Store management dashboard</p>
        </div>

        {errorMsg && (
          <div className="bg-red-950/80 border border-red-800/80 rounded-xl p-3 text-xs text-red-300 font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Admin Username
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="dano.js"
                className="w-full bg-[#0d1427] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0d1427] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-950/50 transition-all active:scale-[0.99] mt-2"
          >
            Authenticate & Access Dashboard
          </button>
        </form>

      </div>
    </div>
  );
};
