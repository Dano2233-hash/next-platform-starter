import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto py-20 px-4 text-center space-y-5">
      <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-cyan-400 shadow-xl shadow-cyan-500/10">
        <Gamepad2 className="w-10 h-10" />
      </div>

      <div>
        <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          404
        </span>
        <h1 className="font-heading text-2xl font-black text-slate-100 mt-1">Page Not Found</h1>
        <p className="text-xs text-slate-400 mt-1">
          The page or product you are looking for doesn't exist or has been relocated.
        </p>
      </div>

      <div className="pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/20 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dano Store Home</span>
        </Link>
      </div>
    </div>
  );
}
