import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="max-w-md mx-auto my-20 p-8 bg-slate-900/90 border border-slate-800 rounded-3xl text-center space-y-5 shadow-2xl">
      <div className="w-16 h-16 rounded-2xl bg-cyan-950 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mx-auto">
        <Gamepad2 className="w-8 h-8" />
      </div>

      <div className="space-y-1">
        <h1 className="text-4xl font-extrabold text-slate-100 font-heading">404</h1>
        <h2 className="text-lg font-bold text-slate-200">Page Not Found</h2>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed">
        The page or service you are looking for does not exist or has been moved to another location.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-950/50"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dano Store Home
      </Link>
    </div>
  );
};
