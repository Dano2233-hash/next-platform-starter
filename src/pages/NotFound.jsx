import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-center p-6">
      <div className="max-w-md bg-[#080d1a] border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
          <Gamepad2 className="w-8 h-8 animate-bounce" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-black text-white font-mono">404</h1>
          <h2 className="text-lg font-bold text-slate-200 uppercase">Page Not Found</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            The page you are looking for doesn't exist, was renamed, or is temporarily unavailable.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-black font-extrabold text-xs shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dano Store Home</span>
        </Link>
      </div>
    </div>
  );
}
