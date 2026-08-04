import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem('dano_admin_auth') === 'true';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (isAuth) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'dano.js' && password === 'lawa2233') {
      localStorage.setItem('dano_admin_auth', 'true');
      navigate('/admin');
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-6 bg-[#0c0d12] p-8 rounded-2xl border border-[#1a1e29] shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0066ff] to-[#7000ff]" />

        <div className="text-center space-y-2">
          <h1 className="text-xl font-black text-white uppercase tracking-wider">Dano Store Admin</h1>
          <p className="text-xs text-gray-400">Please authenticate to access the administration dashboard</p>
        </div>

        {error && (
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold">
            <Lock size={15} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Username</label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="dano.js"
                className="w-full bg-[#050505] text-sm text-gray-200 pl-10 pr-4 py-3 rounded-xl border border-[#1a1e29] focus:outline-none focus:border-[#00e5ff] transition-colors"
                required
              />
              <User size={15} className="absolute left-3.5 text-gray-500" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Password</label>
            <div className="relative flex items-center">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#050505] text-sm text-gray-200 pl-10 pr-4 py-3 rounded-xl border border-[#1a1e29] focus:outline-none focus:border-[#00e5ff] transition-colors"
                required
              />
              <Lock size={15} className="absolute left-3.5 text-gray-500" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-xs font-black text-white bg-[#0066ff] hover:bg-[#0052cc] transition-colors shadow-lg shadow-[#0066ff]/20 cursor-pointer select-none"
          >
            SIGN IN TO DASHBOARD
          </button>
        </form>
      </div>
    </div>
  );
}
