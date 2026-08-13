import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

export function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Delegate verification to App.jsx through the onLoginSuccess prop
    const response = onLoginSuccess(username, password);

    if (response.success) {
      navigate('/admin');
    } else {
      setError(response.message || 'Incorrect credentials. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 text-left text-gray-200">
      <div className="rounded-2xl border border-[#12121e] bg-[#0c0c14] p-6 sm:p-8 space-y-6">

        {/* Header */}
        <div className="text-center space-y-1.5">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#7000ff]/10 text-[#7000ff] border border-[#7000ff]/20">
            <ShieldAlert size={24} />
          </div>
          <h1 className="text-lg font-black uppercase text-white tracking-wide">Merchant Portal Login</h1>
          <p className="text-xs text-gray-400 font-medium">Verify credentials to manage Dano Store catalog & orders</p>
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-xs font-semibold text-red-500">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. dano.js"
              className="w-full rounded-lg border border-[#1e1e2d] bg-[#05050a] px-3.5 py-2.5 text-sm text-gray-200 outline-none transition focus:border-[#0066ff]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-[#1e1e2d] bg-[#05050a] px-3.5 py-2.5 text-sm text-gray-200 outline-none transition focus:border-[#0066ff]"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-[#0066ff] via-[#7000ff] to-[#00e5ff] py-3 text-xs font-black uppercase text-white hover:opacity-95 transition tracking-wider premium-glow-purple"
          >
            Authenticate Portal
          </button>
        </form>

        <div className="text-center text-[10px] text-gray-500 font-medium">
          Dano Store Internal administration. Unauthorized access is recorded.
        </div>

      </div>
    </div>
  );
}
