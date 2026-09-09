import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
      <div className="max-w-md bg-[#080d1a] border border-slate-800 p-8 sm:p-10 rounded-3xl space-y-4 shadow-2xl">
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          404
        </h1>
        <h2 className="text-xl font-bold text-white">Page Not Found</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          The page you are looking for does not exist or has been moved to a new address.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-xs hover:text-black shadow-lg shadow-cyan-950/50"
        >
          <Home className="w-4 h-4" /> Return to Dano Store
        </Link>
      </div>
    </div>
  );
};
