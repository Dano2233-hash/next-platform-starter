import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft, ShieldAlert } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto my-16 bg-[#090e1a] border border-slate-800 rounded-3xl p-10 text-center space-y-6 shadow-2xl relative overflow-hidden">
      <div className="w-20 h-20 rounded-3xl bg-rose-950/80 border border-rose-800 flex items-center justify-center mx-auto text-rose-400 shadow-xl shadow-rose-950">
        <ShieldAlert className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-rose-400">
          404 - Page Not Found
        </span>
        <h1 className="text-3xl font-black text-white">Lost in Cyberspace?</h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
          The page or digital product link you requested could not be found or has moved.
        </p>
      </div>

      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 py-3.5 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-950/40 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
