import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, User, Lock, AlertCircle, ArrowRight } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess }) {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Username and password are required');
      return;
    }

    const res = onLoginSuccess(username, password);
    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setError(res.message || 'Invalid admin credentials');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#090d16] p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-purple-950/80 border border-purple-500/40 text-purple-400 flex items-center justify-center mx-auto shadow-lg shadow-purple-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-white">Admin Login</h1>
          <p className="text-xs text-slate-400">
            Protected area for Dano Store store managers
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Admin Username</label>
            <div className="relative">
              <input
                type="text"
                placeholder="dano.js"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-900 text-slate-100 text-sm rounded-xl pl-10 pr-4 py-3 border border-slate-800 focus:outline-none focus:border-cyan-500 transition"
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Admin Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 text-slate-100 text-sm rounded-xl pl-10 pr-4 py-3 border border-slate-800 focus:outline-none focus:border-cyan-500 transition"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-black font-extrabold text-xs hover:brightness-110 shadow-lg shadow-cyan-500/20 transition flex items-center justify-center gap-2 mt-2"
          >
            <span>Sign In to Admin Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-800/80 text-center text-[11px] text-slate-500">
          <span>Test Credentials: </span>
          <span className="font-mono text-cyan-400">dano.js</span> /{' '}
          <span className="font-mono text-cyan-400">lawa2233</span>
        </div>
      </div>
    </div>
  );
}
