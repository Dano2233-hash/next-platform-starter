import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto my-16 p-8 bg-[#0a0e1a] rounded-3xl border border-slate-800 text-center space-y-5 shadow-2xl relative overflow-hidden">
      <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center text-cyan-400">
        <Gamepad2 className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          404
        </span>
        <h1 className="text-xl font-bold text-white">Page Not Found</h1>
        <p className="text-xs text-slate-400">
          The page or product link you are looking for does not exist or has been moved.
        </p>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>
    </div>
  );
}
