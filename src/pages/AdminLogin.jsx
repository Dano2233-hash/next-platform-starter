import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, AlertCircle } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (username === 'dano.js' && password === 'lawa2233') {
      localStorage.setItem('dano_admin_auth', 'true');
      if (onLoginSuccess) {
        onLoginSuccess(username, password);
      }
      navigate('/admin');
    } else {
      setErrorMsg('Invalid admin username or password');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-[1px] shadow-lg shadow-cyan-950/60 mx-auto">
          <div className="w-full h-full rounded-[15px] bg-[#090e18] flex items-center justify-center text-cyan-400">
            <ShieldCheck className="w-8 h-8" />
          </div>
        </div>
        <h1 className="text-2xl font-black text-white">Admin Login</h1>
        <p className="text-xs text-slate-400">
          Enter store management credentials to access the Dano Store admin panel.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#0b101c] p-6 rounded-2xl border border-slate-800 space-y-4">
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
            Username
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full bg-[#070b13] text-sm text-slate-100 placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500"
            />
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#070b13] text-sm text-slate-100 placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500"
            />
            <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black text-xs transition-all shadow-md shadow-cyan-950/50 cursor-pointer"
        >
          Sign In to Admin
        </button>
      </form>
    </div>
  );
}
