import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-20 text-center space-y-6 max-w-md mx-auto">
      <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600 mx-auto shadow-xl">
        <Gamepad2 className="w-10 h-10 text-cyan-400" />
      </div>

      <div className="space-y-2">
        <h1 className="text-4xl font-black text-white font-sans">404</h1>
        <h2 className="text-xl font-bold text-slate-200">Page Not Found</h2>
        <p className="text-xs text-slate-400">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:brightness-110 text-black font-black text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>
    </div>
  );
}
