import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Ghost } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-cyan-400 shadow-xl">
        <Ghost className="w-10 h-10 animate-bounce" />
      </div>

      <div className="space-y-2">
        <span className="px-3 py-1 bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-black rounded-full uppercase">
          404 Error
        </span>
        <h1 className="text-3xl font-black text-white tracking-tight">Page Not Found</h1>
        <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
          The page or digital game key you are trying to access does not exist or has been removed from Dano Store.
        </p>
      </div>

      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-cyan-950/50"
        >
          <Home className="w-4 h-4" />
          <span>Return to Dano Store Home</span>
        </Link>
      </div>
    </div>
  );
}
