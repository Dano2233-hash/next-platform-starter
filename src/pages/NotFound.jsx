import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Home, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="max-w-md mx-auto text-center py-20 px-4 space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-cyan-400 shadow-xl">
        <Gamepad2 className="w-10 h-10 animate-bounce" />
      </div>

      <div className="space-y-2">
        <h1 className="text-5xl font-black text-white tracking-tight">404</h1>
        <h2 className="text-xl font-bold text-slate-200">Page Not Found</h2>
        <p className="text-slate-400 text-xs">
          The page you are looking for does not exist or has been moved.
        </p>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold text-xs shadow-xl shadow-cyan-950/50 hover:from-blue-500 hover:to-cyan-400 transition-all"
      >
        <Home className="w-4 h-4" />
        <span>Return to Dano Store Home</span>
      </Link>
    </div>
  );
};
