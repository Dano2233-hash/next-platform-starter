import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-2xl">
        <Gamepad2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <h1 className="text-5xl font-extrabold text-white">404</h1>
        <h2 className="text-xl font-bold text-slate-300">Page Not Found</h2>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          The page or digital service you are looking for does not exist or has been moved.
        </p>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-cyan-950/40 hover:from-blue-500 hover:to-cyan-400 transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Return to Dano Store Home
      </Link>
    </div>
  );
}
