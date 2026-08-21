import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Shield, Lock, User, AlertCircle, ArrowLeft } from 'lucide-react';

export const AdminLogin = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (onLoginSuccess) {
      const ok = onLoginSuccess(username, password);
      if (ok) {
        navigate('/admin');
        return;
      }
    }

    const res = login(username, password);
    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.message || 'Invalid username or password.');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-[#0a0f1d] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto text-slate-950 font-black shadow-lg shadow-cyan-500/20">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-100">Admin Portal</h2>
          <p className="text-xs text-slate-400">Sign in to manage Dano Store products and customer orders</p>
        </div>

        {error && (
          <div className="p-3 bg-red-950/80 border border-red-500/40 text-red-400 rounded-xl text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Username</label>
            <div className="relative">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full bg-[#060a14] border border-slate-800 focus:border-cyan-500 rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-100 outline-none transition"
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full bg-[#060a14] border border-slate-800 focus:border-cyan-500 rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-100 outline-none transition"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-cyan-950/40 hover:brightness-110 transition duration-200 cursor-pointer"
          >
            Login to Admin Dashboard
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 font-semibold cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Dano Store
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
