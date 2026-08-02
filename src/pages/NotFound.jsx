import React from 'react';
import { HelpCircle, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center space-y-6 select-none">

      {/* 404 Visual Icon */}
      <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
        {/* Radial backing cyan light */}
        <div className="absolute inset-0 bg-cyan-500/10 blur-xl rounded-full"></div>
        <HelpCircle className="w-20 h-20 text-cyan-400 relative z-10 animate-pulse" />
      </div>

      <div className="space-y-2">
        <h1 className="text-4xl font-black text-white uppercase tracking-tight">
          Page Not Found
        </h1>
        <p className="text-cyan-400 font-bold uppercase tracking-widest text-xs">
          Error Code 404
        </p>
        <p className="text-gray-400 text-xs leading-relaxed max-w-sm mx-auto">
          We couldn&apos;t source the route you were trying to access. It might have been relocated or deleted from Dano Store.
        </p>
      </div>

      <div className="pt-2">
        <a
          href="/"
          className="inline-flex items-center justify-center gap-1.5 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg shadow-blue-500/15"
        >
          <span>Return To Storefront</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

    </div>
  );
}
