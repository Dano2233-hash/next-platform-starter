import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 text-center">
      <div className="max-w-md space-y-6 bg-[#0a0f1d] border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <div className="w-20 h-20 bg-cyan-950/80 border border-cyan-500/30 rounded-2xl flex items-center justify-center mx-auto text-cyan-400">
          <Gamepad2 className="w-10 h-10 animate-bounce" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-black text-cyan-400">404</span>
          <h1 className="text-xl font-bold text-slate-100">Page Not Found</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            The page you are looking for does not exist or has been moved to a different location in Dano Store.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-cyan-950/40"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Main Store
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
