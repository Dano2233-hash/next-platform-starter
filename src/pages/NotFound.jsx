import React from 'react';
import { ShieldAlert, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto py-24 text-center space-y-6 px-4">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 mb-2">
        <ShieldAlert className="w-10 h-10" />
      </div>
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-white uppercase tracking-tight">Page Not Found</h1>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Error Code: 404 System Error</p>
      </div>
      <p className="text-sm text-slate-400 leading-relaxed">
        The page you are trying to visit does not exist or has been relocated within the Dano Store platform directory.
      </p>
      <div className="pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 bg-[#0066ff] hover:bg-[#0055dd] text-white text-xs font-black uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-[#0066ff]/20"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
