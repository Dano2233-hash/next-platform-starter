import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, AlertCircle, KeyRound } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username || !password) {
      setErrorMsg('Please enter both username and password.');
      return;
    }

    if (onLoginSuccess) {
      const result = onLoginSuccess(username, password);
      if (result && result.success) {
        navigate('/admin');
      } else {
        setErrorMsg(result?.message || 'Invalid admin credentials');
      }
    }
  };

  return (
    <div className="py-16 max-w-md mx-auto">
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center mx-auto text-white shadow-lg shadow-cyan-500/20">
            <Shield className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Admin Authentication</h1>
          <p className="text-xs text-slate-400">Log in to manage catalog, stocks, orders and store sections.</p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Admin Username</label>
            <div className="relative">
              <input
                type="text"
                placeholder="dano.js"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none"
              />
              <KeyRound className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Admin Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/20 active:scale-98 transition mt-2"
          >
            Access Dashboard
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-800/80">
          <p className="text-[11px] text-slate-500">Protected Dano Store Control Panel</p>
        </div>
      </div>
    </div>
  );
}
