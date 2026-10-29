import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">404 Error</span>
          <h1 className="text-3xl font-black text-white tracking-tight">Page Not Found</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/20"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Store Home
          </Link>
        </div>
      </div>
    </div>
  );
}
