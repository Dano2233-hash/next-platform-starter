import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Shield, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';

/**
 * Admin Login requirements:
 * - Credentials: username "dano.js", password "lawa2233"
 * - Correct login saves localStorage.setItem("dano_admin_auth", "true")
 * - Wrong login shows a clean error message
 * - Redirects to /admin on success
 */
export function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const res = login(username.trim(), password);
    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setErrorMessage(res.error || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-[#090d1c] border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        {/* Header Icon */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-cyan-950/80 border border-cyan-800/80 flex items-center justify-center text-cyan-400 mx-auto shadow-lg shadow-cyan-950/50">
            <Shield className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Admin Staff Portal</h1>
          <p className="text-xs text-slate-400">
            Secure sign in to manage catalog, stock, and customer orders.
          </p>
        </div>

        {/* Clean Error Message */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-800/80 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-xl shadow-cyan-950 flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo credentials hint */}
        <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 text-[11px] text-slate-400 text-center">
          Default Admin: <strong className="text-cyan-300 font-mono">dano.js</strong> / Password: <strong className="text-cyan-300 font-mono">lawa2233</strong>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
