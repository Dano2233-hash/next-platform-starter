import React from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, Gamepad2, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-24 text-center space-y-6 max-w-md mx-auto">
      <div className="w-20 h-20 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
        <Gamepad2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-4xl font-black text-white tracking-tight">404</span>
        <h1 className="text-xl font-bold text-slate-200">Page Not Found</h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          The page or game you are looking for does not exist or may have been relocated.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs shadow-lg shadow-cyan-950/40"
        >
          <HomeIcon className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs hover:bg-slate-700 border border-slate-700"
        >
          <Search className="w-4 h-4" />
          <span>Browse Catalog</span>
        </Link>
      </div>
    </div>
  );
}
