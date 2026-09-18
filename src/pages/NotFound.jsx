import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowRight } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-5 my-12">
      <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shadow-2xl">
        <Gamepad2 className="w-10 h-10" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-4xl font-black text-cyan-400 font-mono">404</span>
        <h1 className="text-2xl font-black text-white">Page Not Found</h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          The page you are looking for doesn't exist, was renamed, or has been moved.
        </p>
      </div>

      <Link
        to="/"
        className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-lg inline-flex items-center gap-2 transition-all"
      >
        <span>Return to Home</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
