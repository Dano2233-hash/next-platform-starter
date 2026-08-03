import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, LogIn } from 'lucide-react';

export default function AdminLogin({ onLogin, isAdmin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const success = onLogin(username, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid username or password credentials. Please verify your authentication credentials.');
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="bg-[#090911] border border-[#121225] p-8 rounded-2xl space-y-6 shadow-2xl relative overflow-hidden">
        {/* Top glowing bar */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#7000ff] to-[#00e5ff]" />

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-purple-950/40 border border-[#7000ff]/30 flex items-center justify-center mx-auto text-purple-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h1 className="text-lg font-extrabold text-white uppercase tracking-wider">
            Admin Hub Authorization
          </h1>
          <p className="text-[10px] text-gray-500 max-w-xs mx-auto leading-normal">
            Restricted area. Please sign in with your store administrator login details to edit products and view orders.
          </p>
        </div>

        {error && (
          <div className="bg-red-950/20 border border-red-500/30 text-red-400 p-3 rounded-lg text-xs leading-relaxed font-bold">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">
              Username ID
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. dano.js"
              className="w-full bg-black/40 border border-[#121225] rounded-lg py-2.5 px-3 text-white focus:outline-none focus:border-[#00e5ff] transition-premium"
            />
          </div>

          <div>
            <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">
              Password PIN
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-black/40 border border-[#121225] rounded-lg py-2.5 px-3 text-white focus:outline-none focus:border-[#00e5ff] transition-premium"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#0066ff] via-[#7000ff] to-[#00e5ff] hover:glow-blue text-black font-black py-3 rounded-lg uppercase tracking-widest transition-premium flex items-center justify-center gap-1.5"
          >
            <LogIn className="w-4 h-4" />
            Sign In Admin
          </button>
        </form>
      </div>
    </div>
  );
}
