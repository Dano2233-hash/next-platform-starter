import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-4">
      <div className="w-20 h-20 rounded-3xl bg-cyan-950/40 border border-cyan-800/40 flex items-center justify-center text-cyan-400 shadow-xl">
        <Gamepad2 className="w-10 h-10" />
      </div>

      <span className="text-5xl sm:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
        404
      </span>

      <h1 className="text-xl sm:text-2xl font-black text-white">Page Not Found</h1>

      <p className="text-xs sm:text-sm text-slate-400 max-w-md">
        The gaming route or item you are looking for doesn't exist or has moved. Return back to Dano Store to continue shopping.
      </p>

      <div className="pt-2 flex items-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs transition-colors shadow-lg shadow-cyan-950/40"
        >
          <Home className="w-4 h-4" />
          <span>Go to Home</span>
        </Link>
      </div>
    </div>
  );
}
