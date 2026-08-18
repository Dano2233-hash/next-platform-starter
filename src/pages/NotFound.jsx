import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft, Home } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
      <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 text-cyan-400 shadow-xl shadow-cyan-950/40 animate-bounce">
        <Gamepad2 className="w-10 h-10" />
      </div>

      <span className="px-3 py-1 bg-cyan-950 text-cyan-400 border border-cyan-500/30 text-xs font-black uppercase tracking-widest rounded-full mb-3">
        404 Page Not Found
      </span>

      <h1 className="text-3xl sm:text-5xl font-black text-white mb-3">
        Game Over! Page Missing.
      </h1>

      <p className="text-slate-400 text-sm max-w-md mb-8 leading-relaxed">
        The page you are looking for does not exist or has been moved to another location. Return back home to continue shopping for digital games.
      </p>

      <div className="flex flex-wrap gap-4 items-center justify-center">
        <Link
          to="/"
          className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-black text-sm rounded-xl shadow-lg flex items-center gap-2 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Back to Store Home</span>
        </Link>
      </div>
    </div>
  );
}
