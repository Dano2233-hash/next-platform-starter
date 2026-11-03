import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4">
        <Gamepad2 size={40} />
      </div>
      <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest px-3 py-1 rounded bg-cyan-950/40 border border-cyan-500/20 mb-2">
        Error 404
      </span>
      <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
        Game Level Not Found
      </h1>
      <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-6">
        The page you are looking for has been moved, respawned, or does not exist in the Dano Store digital library.
      </p>

      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="py-2.5 px-5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors"
        >
          <Home size={15} />
          <span>Return Home</span>
        </Link>
        <Link
          to="/products"
          className="py-2.5 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs flex items-center gap-2 transition-colors"
        >
          <span>Catalog</span>
        </Link>
      </div>
    </div>
  );
}
