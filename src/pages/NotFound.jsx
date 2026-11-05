import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
          <Gamepad2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-mono">
            404
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white">Page Not Found</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-2 flex justify-center gap-3">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-cyan-500 text-slate-950 hover:bg-cyan-400 flex items-center gap-1.5 shadow-lg shadow-cyan-950/50 transition-colors"
          >
            <Home className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <Link
            to="/products"
            className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
