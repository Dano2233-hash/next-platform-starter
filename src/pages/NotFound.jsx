import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center text-cyan-400 shadow-xl">
        <Gamepad2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-4xl font-black text-cyan-400">404</span>
        <h1 className="text-2xl font-black text-white">Page Not Found</h1>
        <p className="text-xs text-slate-400">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs shadow-lg shadow-cyan-950/50 hover:from-blue-500 hover:to-cyan-500 transition-all"
      >
        <Home className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>
    </div>
  );
}
