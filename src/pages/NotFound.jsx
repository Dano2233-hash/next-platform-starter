import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16 px-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-cyan-400 shadow-xl">
          <Gamepad2 className="w-10 h-10" />
        </div>
        <div>
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            404
          </h1>
          <h2 className="text-xl font-bold text-white mt-2">Game Over - Page Not Found</h2>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            The digital level or item page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Store Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
