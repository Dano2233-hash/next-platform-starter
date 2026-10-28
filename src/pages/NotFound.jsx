import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <div className="py-20 text-center space-y-4 max-w-md mx-auto">
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5 mx-auto mb-4 shadow-xl shadow-cyan-500/20">
        <div className="w-full h-full bg-[#070b19] rounded-[22px] flex items-center justify-center">
          <Gamepad2 className="w-10 h-10 text-cyan-400" />
        </div>
      </div>
      <h1 className="text-4xl font-black text-white">404</h1>
      <h2 className="text-xl font-bold text-slate-200">Page Not Found</h2>
      <p className="text-xs text-slate-400">
        The page you are looking for does not exist or has been moved to another location.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs shadow-lg shadow-cyan-600/20"
      >
        <ArrowLeft className="w-4 h-4" /> Return to Dano Store Home
      </Link>
    </div>
  );
}
