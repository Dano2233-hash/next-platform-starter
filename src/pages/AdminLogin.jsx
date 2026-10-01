import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { ShieldCheck, Lock, User, AlertCircle, Gamepad2, ArrowRight } from 'lucide-react';

export const AdminLogin = () => {
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // If already logged in, redirect to admin dashboard
  React.useEffect(() => {
    if (isAdmin) {
      navigate('/admin', { replace: true });
    }
  }, [isAdmin, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password) {
      setError('Please enter both username and password.');
      return;
    }

    const res = login(username.trim(), password);
    if (res.success) {
      navigate('/admin', { replace: true });
    } else {
      setError(res.error || 'Invalid admin credentials.');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#080d1e] border border-gray-800 rounded-3xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5 shadow-xl shadow-cyan-500/20 mx-auto">
            <div className="w-full h-full bg-[#050814] rounded-[14px] flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-7 h-7" />
            </div>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Dano Store Admin</h1>
          <p className="text-xs text-gray-400">
            Sign in to access store dashboard and order management
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 bg-red-950/80 border border-red-500/80 rounded-xl flex items-center gap-2.5 text-red-300 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Admin Username
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Username (e.g. dano.js)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#050814] text-sm text-white placeholder-gray-500 rounded-xl pl-10 pr-4 py-3 border border-gray-800 focus:border-cyan-500 focus:outline-none transition-all"
              />
              <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#050814] text-sm text-white placeholder-gray-500 rounded-xl pl-10 pr-4 py-3 border border-gray-800 focus:border-cyan-500 focus:outline-none transition-all"
              />
              <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-gray-950 font-black text-sm rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 mt-2"
          >
            <span>Sign In to Admin Portal</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
