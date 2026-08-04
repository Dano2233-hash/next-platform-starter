import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <div className="w-20 h-20 bg-[#00e5ff]/10 rounded-full flex items-center justify-center text-[#00e5ff] shadow-xl shadow-[#00e5ff]/5 animate-pulse">
        <Compass size={40} />
      </div>
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-white uppercase tracking-tight">404</h1>
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Page Not Found</h2>
        <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed pt-1">
          The link you followed may be broken, or the product has been moved. Explore our top-ups instead!
        </p>
      </div>
      <Link
        to="/"
        className="px-6 py-3 bg-[#0066ff] hover:bg-[#0052cc] rounded-xl text-xs font-black text-white transition-all shadow-lg shadow-[#0066ff]/25 select-none text-center"
      >
        GO TO HOME FRONT
      </Link>
    </div>
  );
}
