import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Home, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shadow-xl">
        <Gamepad2 size={40} />
      </div>

      <h1 className="font-heading font-black text-4xl sm:text-6xl text-slate-100">
        404
      </h1>
      <h2 className="font-heading font-bold text-xl text-slate-300">
        Page Not Found
      </h2>
      <p className="text-xs sm:text-sm text-slate-400 max-w-sm">
        The page you are looking for doesn't exist or has been moved in Dano Store.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-heading font-extrabold text-xs bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all"
      >
        <Home size={16} /> Return to Home Store
      </Link>
    </div>
  );
};

export default NotFound;
