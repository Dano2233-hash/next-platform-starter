import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Shield, Lock, User, AlertCircle, Gamepad2 } from 'lucide-react';

export default function AdminLogin({ navigate }) {
  const { isAuthenticated, login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, go straight to Admin
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please fill in both fields.');
      return;
    }

    setLoading(true);

    // Simulate small latency for premium feels
    setTimeout(() => {
      const res = login(username.trim(), password);
      setLoading(false);

      if (res.success) {
        navigate('/admin');
      } else {
        setError(res.message || 'Invalid username or password.');
      }
    }, 400);
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-md w-full space-y-6 bg-[#0d0d12] border border-white/5 p-8 rounded-3xl shadow-2xl relative overflow-hidden">

        {/* Background ambient glow */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-600"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl"></div>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/10 mx-auto">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-lg font-black text-white uppercase tracking-wider mt-4">Admin Console</h2>
          <p className="text-xs text-zinc-500">Authorized personnel access only.</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-950/20 border border-red-500/20 text-red-400 p-3.5 rounded-2xl flex items-start gap-2.5 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="font-semibold">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-zinc-500">
                <User className="w-4.5 h-4.5" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. dano.js"
                className="w-full bg-white/[0.02] border border-white/10 focus:border-cyan-500/50 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/20 placeholder-zinc-700 transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-zinc-500">
                <Lock className="w-4.5 h-4.5" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/[0.02] border border-white/10 focus:border-cyan-500/50 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/20 placeholder-zinc-700 transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black py-4 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/10 uppercase tracking-widest transition-all mt-4"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Verify & Login</span>
              </>
            )}
          </button>
        </form>

        {/* Back Link */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-xs text-zinc-500 hover:text-white transition-colors"
          >
            ← Back to Store Home
          </button>
        </div>

      </div>
    </div>
  );
}
