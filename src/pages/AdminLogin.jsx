import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, AlertCircle, Sparkles } from 'lucide-react';

export default function AdminLogin({ authState }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { login } = authState;

  // Safeguard: If already logged in, redirect to admin
  React.useEffect(() => {
    if (localStorage.getItem("dano_admin_auth") === "true") {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const success = login(username, password);

    if (success) {
      navigate('/admin');
    } else {
      setError("Invalid administrative username or password. Please verify and try again.");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background neon elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-80 w-80 bg-gradient-to-tr from-cyan-500/10 to-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full space-y-8 bg-[#0a0f1d]/60 border border-blue-500/15 p-8 rounded-3xl backdrop-blur-xl relative z-10">

        {/* Header Title */}
        <div className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 p-[1.5px] flex items-center justify-center shadow-lg shadow-purple-500/10">
            <div className="h-full w-full bg-[#050505] rounded-[13px] flex items-center justify-center text-white">
              <Lock className="h-5 w-5 text-cyan-400" />
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
            ADMINISTRATIVE PORTAL
          </h2>
          <p className="text-xs text-gray-400">
            Secure sign-in for Dano Store backend administrators only.
          </p>
        </div>

        {/* Clean Error Message */}
        {error && (
          <div className="flex items-start gap-2.5 p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-400 text-xs font-semibold leading-relaxed">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form className="space-y-4 text-left" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full bg-[#050505] text-sm text-gray-200 placeholder-gray-500 pl-10 pr-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-cyan-400 transition"
                required
              />
              <User className="absolute left-3 top-3 h-4.5 w-4.5 text-gray-500" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#050505] text-sm text-gray-200 placeholder-gray-500 pl-10 pr-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-cyan-400 transition"
                required
              />
              <Lock className="absolute left-3 top-3 h-4.5 w-4.5 text-gray-500" />
            </div>
          </div>

          {/* Action button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-xs font-black uppercase text-white shadow-lg shadow-cyan-950/40 hover:from-blue-500 hover:to-cyan-400 transition"
          >
            Authenticate Credentials
          </button>
        </form>
      </div>
    </div>
  );
}
