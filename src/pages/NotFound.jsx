import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto text-center py-20 space-y-6">
      <div className="w-16 h-16 rounded-full bg-[#0066ff]/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
        <Gamepad2 className="h-8 w-8" />
      </div>

      <div className="space-y-2">
        <h1 className="text-4xl font-black text-white">404</h1>
        <h2 className="text-sm font-black uppercase text-white tracking-widest">Page Not Found</h2>
        <p className="text-xs text-white/50 leading-relaxed">
          The requested premium digital asset, order validation page, or link category is missing or has been relocated.
        </p>
      </div>

      <Link
        to="/"
        className="inline-block px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs uppercase tracking-widest rounded-lg transition-all"
      >
        Return to Store Home
      </Link>
    </div>
  );
}
