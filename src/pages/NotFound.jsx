import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-2xl">
        <Gamepad2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
          404 Error
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white font-heading">
          PAGE NOT FOUND
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          The gaming destination you were looking for doesn't exist or has moved to another sector.
        </p>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold bg-slate-900 border border-white/10 text-slate-300 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Catalog</span>
        </Link>
      </div>
    </div>
  );
}
