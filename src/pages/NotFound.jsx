import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <div className="py-24 text-center space-y-5 max-w-md mx-auto">
      <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400 font-black text-3xl font-mono">
        404
      </div>
      <h1 className="text-3xl font-black text-white">Page Not Found</h1>
      <p className="text-xs text-slate-400 leading-relaxed">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <div className="pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-cyan-500/20"
        >
          <Home className="w-4 h-4" /> Back to Store Homepage
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
