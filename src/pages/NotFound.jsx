import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#090e1a] border border-slate-800 p-8 rounded-3xl text-center space-y-5 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto">
          <Gamepad2 className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <span className="text-4xl font-black text-cyan-400 font-mono">404</span>
          <h1 className="text-xl font-extrabold text-white">Page Not Found</h1>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            The digital page or game title you are looking for does not exist or has been moved.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Dano Store Home</span>
        </Link>
      </div>
    </div>
  );
};
