import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Gamepad2, Lock, User, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const { login, isAdmin } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // If already logged in, redirect straight to dashboard
  if (isAdmin) {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin';
    }
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const success = login(username, password);
    if (success) {
      window.location.href = '/admin';
    } else {
      setErrorMsg('Incorrect username or password. Please try again!');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 select-none">

      <div className="bg-[#080811] border border-white/5 rounded-3xl p-8 space-y-6 shadow-2xl relative overflow-hidden">

        {/* Absolute top glow strip */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 via-pink-600 to-cyan-500"></div>

        {/* Header Icon */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-cyan-500 flex items-center justify-center mx-auto text-white shadow-lg">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black uppercase tracking-wider text-white">
            Admin Portal Access
          </h2>
          <p className="text-xs text-gray-500">
            Authorized management credentials required to log in.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-950/40 border border-red-800/40 rounded-xl text-red-400 font-bold text-xs flex items-center gap-2">
            <AlertCircle className="w-4.5 h-4.5 text-red-500 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-200">
          {/* Username */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase">Username</label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="dano.js"
                className="w-full bg-[#0d0d1a] border border-white/10 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-white placeholder:text-gray-600"
              />
              <User className="absolute left-4 top-3.5 w-4.5 h-4.5 text-gray-650" />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-[#0d0d1a] border border-white/10 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-white placeholder:text-gray-600"
              />
              <Lock className="absolute left-4 top-3.5 w-4.5 h-4.5 text-gray-650" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-95 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-purple-500/15"
          >
            Authenticate Portal
          </button>
        </form>

        <div className="pt-2 text-center">
          <a
            href="/"
            className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-wider transition-colors"
          >
            Return to Store
          </a>
        </div>

      </div>

    </div>
  );
}

// Inline helper hook to handle local form state inside SFC cleanly since Next components do import react.
function useState(initialValue) {
  return React.useState(initialValue);
}
