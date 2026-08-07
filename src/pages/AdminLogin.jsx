import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, KeyRound, User } from 'lucide-react';

export function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // If already logged in, redirect to admin
  React.useEffect(() => {
    if (localStorage.getItem('dano_admin_auth') === 'true') {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (username === 'dano.js' && password === 'lawa2233') {
      localStorage.setItem('dano_admin_auth', 'true');
      navigate('/admin');
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="bg-[#0a0a14] border border-slate-900 rounded-2xl p-6 sm:p-10 space-y-6 shadow-[0_0_30px_rgba(112,0,255,0.05)] relative overflow-hidden">

        {/* Background glow lines */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-500"></div>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-purple-950/40 border border-purple-500/20 text-purple-400 rounded-full flex items-center justify-center mx-auto shadow-md">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
            Admin Portal Access
          </h1>
          <p className="text-xs text-slate-400">
            Authorized admin credentials required.
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-950/40 border border-red-500/20 rounded text-xs font-semibold text-red-400 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Username */}
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-bold uppercase text-slate-400">Username</label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="e.g. admin"
                className="w-full bg-slate-950 border border-slate-900 focus:border-purple-500 rounded pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none placeholder-slate-700 transition-colors"
              />
              <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-600" />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-bold uppercase text-slate-400">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-900 focus:border-purple-500 rounded pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none placeholder-slate-700 transition-colors"
              />
              <KeyRound className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-600" />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-lg text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-purple-500/10 pt-4"
          >
            Authenticate Admin
          </button>
        </form>
      </div>
    </div>
  );
}
