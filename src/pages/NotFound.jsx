import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shadow-xl">
        <Gamepad2 className="w-10 h-10" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-xs font-black uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800">
          404 Error
        </span>
        <h1 className="text-3xl font-black text-slate-100 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          The gaming page or product you are looking for does not exist or has been moved to another location.
        </p>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20"
      >
        <ArrowLeft className="w-4 h-4" /> Return to Store Home
      </Link>
    </div>
  );
}
