import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Gamepad2 } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 text-center">
      <div className="max-w-md space-y-6 bg-[#090d1a] border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10">
          <Gamepad2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            Error 404
          </span>
          <h1 className="text-2xl font-extrabold text-white">Page Not Found</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            The gaming page or product you are trying to visit does not exist or has been moved.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/20"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Dano Store Home</span>
        </Link>
      </div>
    </div>
  );
}
