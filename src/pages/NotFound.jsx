import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-20 text-center space-y-4 max-w-md mx-auto">
      <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 mx-auto shadow-2xl">
        <Gamepad2 className="w-10 h-10" />
      </div>
      <h1 className="text-4xl font-extrabold text-white">404</h1>
      <h2 className="text-xl font-bold text-slate-200">Page Not Found</h2>
      <p className="text-xs text-slate-400">
        The page or gaming item you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-lg transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dano Store Home
      </Link>
    </div>
  );
}
