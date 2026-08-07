import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowRight } from 'lucide-react';

export function NotFound() {
  return (
    <div className="max-w-md mx-auto text-center py-20 bg-[#0a0a14] border border-slate-900 rounded-2xl p-8 space-y-4">
      <ShieldAlert className="w-16 h-16 text-red-500 mx-auto opacity-30" />
      <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">Page Not Found</h2>
      <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
        The page you are looking for does not exist or has been moved to a different URL.
      </p>
      <div className="pt-4">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-black px-6 py-3 rounded-lg text-xs font-black uppercase tracking-wider transition-all"
        >
          <span>Return Home</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
