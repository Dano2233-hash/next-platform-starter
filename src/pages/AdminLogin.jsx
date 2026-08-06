import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ShieldAlert, LogIn, Lock } from 'lucide-react';

export default function AdminLogin({ onLogin }) {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem('dano_admin_auth') === 'true';

  // Redirect to admin if already authenticated
  if (isAuth) {
    return <Navigate to="/admin" replace />;
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please fill in all authentication fields');
      return;
    }

    const success = onLogin(username, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Incorrect admin credentials. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto py-20 px-4">
      <div className="bg-[#08080b] border border-slate-900 rounded-3xl shadow-2xl p-6 md:p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">Admin System Lock</h1>
          <p className="text-xs text-slate-500">Authorized personnel only. Please enter credentials to proceed.</p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold rounded-xl flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#040406] border border-slate-900 focus:border-purple-500 rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-colors"
              placeholder="Enter username"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#040406] border border-slate-900 focus:border-purple-500 rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-colors"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg shadow-purple-600/10 flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Authorize Portal</span>
          </button>
        </form>
      </div>
    </div>
  );
}
