import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="py-24 text-center space-y-6 max-w-md mx-auto">
      <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
        <Gamepad2 className="w-10 h-10" />
      </div>
      <h1 className="text-4xl font-black text-white tracking-tight">404 - Page Not Found</h1>
      <p className="text-slate-400 text-sm">
        The page or digital product route you are trying to visit does not exist on Dano Store.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20"
      >
        <ArrowLeft className="w-4 h-4" /> Return to Homepage
      </Link>
    </div>
  );
};
