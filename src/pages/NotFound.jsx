import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-24 text-center space-y-6 max-w-md mx-auto">
      <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 mx-auto shadow-2xl">
        <Gamepad2 className="w-10 h-10" />
      </div>
      <div>
        <h1 className="text-4xl font-black text-white">404 - Page Not Found</h1>
        <p className="text-slate-400 text-sm mt-2">
          Oops! The page or game package you are looking for does not exist or has moved.
        </p>
      </div>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30"
      >
        <Home className="w-4 h-4" />
        <span>Back to Dano Store Home</span>
      </Link>
    </div>
  );
}
