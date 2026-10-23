import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, AlertCircle, Gamepad2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function AdminLogin() {
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // If already logged in, redirect to admin
  React.useEffect(() => {
    if (isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Username and password are required.');
      return;
    }

    const res = login(username.trim(), password.trim());
    if (res.success) {
      navigate('/admin');
    } else {
      setErrorMessage(res.message);
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Header Icon */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 mx-auto flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <ShieldCheck className="w-8 h-8 text-slate-950 stroke-[2.5]" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Admin Authentication</h1>
          <p className="text-xs text-slate-400 font-medium">
            Authorized personnel only. Access Dano Store administrative control.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-300 mb-1.5">Username</label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 pl-10 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 pl-10 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all mt-2"
          >
            Log In to Admin
          </button>
        </form>

        <div className="text-center pt-2 text-[11px] text-slate-500 border-t border-slate-800/80">
          Protected by Dano Store System Credentials
        </div>
      </div>
    </div>
  );
}
