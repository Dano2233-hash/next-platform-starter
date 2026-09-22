import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-24 text-center space-y-6 max-w-md mx-auto">
      <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto shadow-xl shadow-cyan-950/50">
        <Gamepad2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-4xl font-black text-cyan-400 font-mono">404</span>
        <h1 className="text-2xl font-black text-white">Page Not Found</h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          The gaming page or digital product link you requested could not be found.
        </p>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-cyan-950/50"
      >
        <ArrowLeft className="w-4 h-4" /> Return to Dano Store
      </Link>
    </div>
  );
}
