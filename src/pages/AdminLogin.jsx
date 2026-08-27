import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, KeyRound, AlertCircle, ShieldAlert } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (username === 'dano.js' && password === 'lawa2233') {
      onLoginSuccess('dano.js', 'lawa2233');
      navigate('/admin');
    } else {
      setError('Invalid admin credentials. Please check your username and password.');
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 pb-16">
      <div className="bg-[#0a0f1d] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-600 p-0.5 shadow-lg shadow-purple-600/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#050811] rounded-[14px] flex items-center justify-center">
              <ShieldAlert className="w-7 h-7 text-purple-400" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-white">Admin Authentication</h1>
          <p className="text-xs text-slate-400">
            Protected Dano Store portal login for store administrators.
          </p>
        </div>

        {error && (
          <div className="bg-rose-950/80 border border-rose-500/50 text-rose-300 p-3.5 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              Username
            </label>
            <input
              type="text"
              placeholder="Enter admin username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-purple-400" />
              Password
            </label>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-purple-600/25 transition-all cursor-pointer"
          >
            Sign In to Admin Dashboard
          </button>
        </form>

        <div className="p-3 bg-slate-900/40 border border-slate-800 rounded-xl text-[11px] text-slate-500 text-center">
          Default Admin Credentials: <strong className="text-slate-300">dano.js</strong> / <strong className="text-slate-300">lawa2233</strong>
        </div>
      </div>
    </div>
  );
}
