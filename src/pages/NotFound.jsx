import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <div className="py-24 text-center max-w-md mx-auto space-y-4">
      <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
        <Gamepad2 className="w-10 h-10" />
      </div>
      <h1 className="text-4xl font-extrabold text-white">404 - Page Not Found</h1>
      <p className="text-xs text-slate-400 leading-relaxed">
        The page or game code path you are trying to visit does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home Page</span>
      </Link>
    </div>
  );
}

export default NotFound;
