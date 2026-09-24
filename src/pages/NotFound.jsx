import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto py-20 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 text-cyan-400 flex items-center justify-center mx-auto shadow-xl">
        <Gamepad2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-black text-cyan-400 uppercase tracking-widest block">404 Error</span>
        <h1 className="text-3xl font-black text-white">Page Not Found</h1>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          The page or game product you requested does not exist or has been moved.
        </p>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-slate-950 font-extrabold text-xs shadow-lg transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Store Home</span>
      </Link>
    </div>
  );
}
