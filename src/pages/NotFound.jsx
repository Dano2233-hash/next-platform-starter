import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="max-w-md mx-auto py-20 text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 mx-auto">
        <Gamepad2 className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-black text-slate-100">404</h1>
      <h2 className="text-lg font-bold text-slate-300">Page Not Found</h2>
      <p className="text-xs text-slate-400">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors mt-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Return to Homepage
      </Link>
    </div>
  );
};
