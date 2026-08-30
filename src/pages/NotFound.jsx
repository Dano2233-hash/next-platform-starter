import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-2xl shadow-blue-600/30">
        <Gamepad2 className="w-10 h-10" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 font-extrabold text-xs uppercase border border-cyan-800">
          404 Page Not Found
        </span>
        <h1 className="text-3xl font-black text-white">Oops! Game Over</h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          The page you are looking for does not exist or has been moved to a different arena.
        </p>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-xl transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
}
