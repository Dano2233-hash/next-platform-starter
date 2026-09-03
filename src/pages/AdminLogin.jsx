import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ShieldCheck, Lock, User, AlertCircle } from 'lucide-react';

export const AdminLogin = () => {
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // If already admin, redirect to /admin
  React.useEffect(() => {
    if (isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const res = login(username, password);
    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.error || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#090d1a] border border-slate-800 rounded-2xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-cyan-950">
            <div className="w-full h-full bg-[#070b19] rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-cyan-400" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-white">Admin Portal</h1>
          <p className="text-xs text-slate-400">Sign in to manage products, stock, and orders</p>
        </div>

        {error && (
          <div className="p-3 bg-rose-950/80 border border-rose-800/80 rounded-xl text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Username</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 focus:border-cyan-500 rounded-xl py-2.5 pl-10 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 focus:border-cyan-500 rounded-xl py-2.5 pl-10 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-950 transition-all duration-200"
          >
            Login to Admin Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};
