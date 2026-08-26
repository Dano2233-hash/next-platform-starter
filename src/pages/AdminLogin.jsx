import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, AlertCircle } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Username and password are required.');
      return;
    }

    if (onLoginSuccess) {
      const result = onLoginSuccess(username.trim(), password.trim());
      if (result && result.success) {
        navigate('/admin');
      } else {
        setError(result?.error || 'Invalid admin username or password.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-blue-600 to-cyan-500 p-[1px] mx-auto shadow-lg shadow-purple-500/20">
          <div className="w-full h-full bg-[#050811] rounded-[15px] flex items-center justify-center">
            <Shield className="w-7 h-7 text-purple-400" />
          </div>
        </div>
        <h1 className="text-2xl font-black text-white">Admin Authentication</h1>
        <p className="text-xs text-gray-400">Restricted portal for Dano Store management</p>
      </div>

      <div className="p-6 md:p-8 rounded-3xl bg-[#090d18] border border-purple-500/20 shadow-2xl space-y-5">
        {error && (
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-gray-300 mb-1">Admin Username</label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full bg-[#050811] border border-gray-800 rounded-xl pl-9 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
              <User className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-300 mb-1">Admin Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-[#050811] border border-gray-800 rounded-xl pl-9 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
              <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/20 transition-all cursor-pointer mt-2"
          >
            Authenticate & Access Dashboard
          </button>
        </form>

        <div className="pt-2 text-center text-[11px] text-gray-500 border-t border-gray-800/80">
          Protected route for Dano Store administrator
        </div>
      </div>
    </div>
  );
}
