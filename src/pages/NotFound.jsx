import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md space-y-5 bg-[#080d1a] border border-slate-800 p-8 rounded-3xl shadow-2xl">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 mx-auto">
          <div className="w-full h-full bg-[#070b14] rounded-[14px] flex items-center justify-center">
            <span className="text-3xl font-extrabold text-cyan-400">404</span>
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-slate-100">Page Not Found</h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          The page you are looking for does not exist, has been moved, or is temporarily unavailable.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dano Store Home</span>
        </Link>
      </div>
    </div>
  );
}
