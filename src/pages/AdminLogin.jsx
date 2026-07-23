import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigation } from '../hooks/useNavigation';
import { ShieldAlert, ArrowLeft, KeyRound, User } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export function AdminLogin() {
  const { isAuthenticated, login } = useAuth();
  const { navigate } = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect instantly if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('#/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password.trim()) {
      setErrorMsg('Both username and password fields are required.');
      return;
    }

    setIsSubmitting(true);

    // Slight simulated lag for login premium feel
    setTimeout(() => {
      const response = login(username.trim(), password);
      setIsSubmitting(false);

      if (response.success) {
        navigate('#/admin');
      } else {
        setErrorMsg(response.message);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#0d0d15] border border-brand-border/60 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-fade-in relative overflow-hidden">

          {/* Ambient light glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-purple/10 blur-3xl rounded-full" />

          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-cyan mb-2">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
              Admin Portal
            </h1>
            <p className="text-xs text-gray-500">Authorized personnel only. Please sign in with merchant credentials.</p>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/20 text-xs text-red-400 font-semibold leading-relaxed text-center animate-shake">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter admin username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#050505] text-white border border-brand-border/60 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-brand-blue transition"
                />
                <User className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#050505] text-white border border-brand-border/60 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-brand-blue transition"
                />
                <KeyRound className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-widest bg-brand-blue text-white hover:bg-brand-blue/90 disabled:opacity-50 transition shadow shadow-brand-blue/10 btn-glow"
            >
              {isSubmitting ? 'Authenticating...' : 'Sign In To Panel'}
            </button>
          </form>

          <div className="pt-4 border-t border-white/5 text-center">
            <button
              onClick={() => navigate('#/')}
              className="inline-flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Return To Storefront
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AdminLogin;
