import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, KeyRound, User } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'dano.js' && password === 'lawa2233') {
      localStorage.setItem('dano_admin_auth', 'true');
      onLoginSuccess();
      navigate('/admin');
    } else {
      setError('Wrong credentials! Please check your username and password.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="bg-[#09090c] border border-white/5 p-8 rounded-xl shadow-2xl space-y-6 relative overflow-hidden">

        {/* Glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-600/5 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto text-cyan-400">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <h1 className="text-lg font-black text-white uppercase tracking-wider">Protected Admin Panel</h1>
          <p className="text-xs text-white/50">Authorize yourself using dano.js official keys.</p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Username */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-white/60">Admin Username</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="dano.js"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#050507] border border-white/10 text-white placeholder-white/20 text-xs rounded p-2.5 pl-10 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
              <User className="absolute left-3.5 top-3.5 h-4 w-4 text-white/30" />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-white/60">Secure Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#050507] border border-white/10 text-white placeholder-white/20 text-xs rounded p-2.5 pl-10 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
              <KeyRound className="absolute left-3.5 top-3.5 h-4 w-4 text-white/30" />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-98"
          >
            Authenticate Admin
          </button>

        </form>

      </div>
    </div>
  );
}
