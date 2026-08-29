import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, AlertCircle, Gamepad2 } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (onLoginSuccess) {
      const res = onLoginSuccess(username, password);
      if (res && res.success) {
        navigate('/admin');
      } else {
        setErrorMessage(res?.error || 'Invalid admin credentials.');
      }
    } else {
      if (username === 'dano.js' && password === 'lawa2233') {
        localStorage.setItem('dano_admin_auth', 'true');
        navigate('/admin');
      } else {
        setErrorMessage('Invalid admin username or password.');
      }
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5 mx-auto shadow-xl shadow-cyan-500/20">
            <div className="w-full h-full bg-[#050505] rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-cyan-400" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Dano Store Admin Portal
          </h1>
          <p className="text-slate-400 text-xs">
            Sign in to manage catalog, product stock, flash deals & order details.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#0c101c] border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl">

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Username */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Admin Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="w-full bg-[#080b14] border border-slate-800 text-slate-100 placeholder-slate-500 text-xs md:text-sm rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-cyan-500 transition-all"
                />
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-[#080b14] border border-slate-800 text-slate-100 placeholder-slate-500 text-xs md:text-sm rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-cyan-500 transition-all"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-600/25 active:scale-95 transition-all"
            >
              Sign In to Dashboard
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}
