import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Home, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shadow-xl shadow-cyan-500/10">
        <Gamepad2 className="w-10 h-10" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-xs font-black uppercase text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-500/30 tracking-widest">
          404 - Page Not Found
        </span>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Game Over! Page Doesn't Exist
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          The page or digital service you are looking for has been moved or doesn't exist in Dano Store.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs px-6 py-3 rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 uppercase tracking-wider"
        >
          <Home className="w-4 h-4 fill-black" />
          <span>Return to Home</span>
        </Link>
        <Link
          to="/products"
          className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs px-6 py-3 rounded-xl transition-colors"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
};
