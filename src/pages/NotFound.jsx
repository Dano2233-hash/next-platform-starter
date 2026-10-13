import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center max-w-md mx-auto px-4 py-16 text-center">
      <div className="bg-[#080d1e] border border-slate-800 rounded-2xl p-8 space-y-6 shadow-2xl relative overflow-hidden">

        {/* Visual Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-blue-600/20 to-purple-600/20 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
          <Gamepad2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="font-orbitron font-extrabold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 block">
            404
          </span>
          <h1 className="font-orbitron font-bold text-lg text-slate-100">
            Page Not Found
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            The page or digital key route you are looking for does not exist or has been moved to a new section.
          </p>
        </div>

        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-orbitron font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Dano Store</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
