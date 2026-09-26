import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Home, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="max-w-md mx-auto py-24 text-center space-y-6">
      <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center mx-auto text-cyan-400 shadow-2xl">
        <Gamepad2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
          Error 404
        </span>
        <h1 className="text-3xl font-black text-slate-100">Page Not Found</h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          The page you requested could not be found or has been moved.
        </p>
      </div>

      <div className="pt-2 flex justify-center gap-3">
        <Link
          to="/"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold text-xs shadow-lg shadow-cyan-950/50 flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
