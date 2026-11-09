import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Lock, User, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';

/**
 * Admin Login Page Requirements:
 * - Protected login
 * - Credentials:
 *   Username: dano.js
 *   Password: lawa2233
 * - Saves localStorage.setItem("dano_admin_auth", "true")
 * - Clean error message if wrong
 * - Redirects to /admin on success
 */
export default function AdminLogin() {
  const navigate = useNavigate();
  const { isAdmin, login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already logged in, redirect directly to /admin
  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = login(username.trim(), password);

    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.error || 'Invalid credentials');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto shadow-lg shadow-cyan-500/20">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-white font-heading tracking-wide">
            ADMIN PORTAL
          </h1>
          <p className="text-xs text-slate-400">
            Authorized management access for Dano Store staff.
          </p>
        </div>

        {/* Login Form Card */}
        <div className="p-8 rounded-3xl bg-[#080c1c] border border-white/10 shadow-2xl space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Username */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. dano.js"
                  className="w-full bg-slate-900/90 text-sm text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 border border-white/10 focus:border-cyan-500 focus:outline-none"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-900/90 text-sm text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 border border-white/10 focus:border-cyan-500 focus:outline-none"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all mt-6"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In as Admin'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Credentials Reminder */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-[11px] text-slate-400 text-center">
            Credentials: <code className="text-cyan-400 font-bold">dano.js</code> / <code className="text-cyan-400 font-bold">lawa2233</code>
          </div>
        </div>

      </div>
    </div>
  );
}
