import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-center py-16 px-4">
      <div className="max-w-md w-full space-y-5 bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <div className="w-16 h-16 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center mx-auto text-cyan-400">
          <Gamepad2 className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <span className="text-4xl font-extrabold text-cyan-400 font-heading">404</span>
          <h1 className="text-xl font-bold text-white font-heading">Page Not Found</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            The page or digital gaming item you were looking for does not exist or has been moved.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl shadow-md flex items-center gap-2"
          >
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <Link
            to="/products"
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-bold rounded-xl"
          >
            Browse Store
          </Link>
        </div>
      </div>
    </div>
  );
}
