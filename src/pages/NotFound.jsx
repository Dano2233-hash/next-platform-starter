import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-24 max-w-md mx-auto text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-cyan-400 shadow-xl shadow-cyan-500/10">
        <Gamepad2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <h1 className="text-4xl font-black text-white">404</h1>
        <h2 className="text-lg font-bold text-slate-200">Page Not Found</h2>
        <p className="text-xs text-slate-400">
          The page you are looking for might have been moved or does not exist.
        </p>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition"
      >
        <Home className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>
    </div>
  );
}
