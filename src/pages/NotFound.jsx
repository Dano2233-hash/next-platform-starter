import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-20 text-center max-w-md mx-auto space-y-4">
      <div className="w-20 h-20 rounded-3xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(0,229,255,0.2)]">
        <Gamepad2 className="w-10 h-10" />
      </div>

      <h1 className="text-4xl font-black text-white tracking-tight">404</h1>
      <h2 className="text-lg font-bold text-slate-200">Page Not Found</h2>
      <p className="text-xs text-slate-400">
        The page you are looking for does not exist or has been moved.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20"
      >
        <ArrowLeft className="w-4 h-4" /> Return to Store Front
      </Link>
    </div>
  );
}
