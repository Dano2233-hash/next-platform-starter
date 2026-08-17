import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto">
      <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 text-cyan-400 flex items-center justify-center shadow-xl">
        <Gamepad2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-black text-cyan-400 uppercase tracking-widest">404 Error</span>
        <h1 className="text-3xl font-black text-white">Page Not Found</h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          The page or game product you are looking for doesn't exist or has been moved to a new route.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        <Link
          to="/"
          className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Go to Home
        </Link>
        <Link
          to="/products"
          className="py-3 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-black text-xs font-extrabold shadow-md shadow-cyan-500/20 transition flex items-center gap-2"
        >
          <Search className="w-4 h-4" /> Browse Catalog
        </Link>
      </div>
    </div>
  );
}
