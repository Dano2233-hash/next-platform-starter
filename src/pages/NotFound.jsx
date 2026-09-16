import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4 py-16">
      <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
        <Gamepad2 className="w-10 h-10" />
      </div>
      <span className="text-4xl font-black text-cyan-400 font-mono">404</span>
      <h1 className="text-2xl font-extrabold text-white">Page Not Found</h1>
      <p className="text-xs text-slate-400 max-w-sm">
        The page you are looking for does not exist or has been moved to another location.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider"
      >
        <ArrowLeft className="w-4 h-4" /> Return Home
      </Link>
    </div>
  );
}
