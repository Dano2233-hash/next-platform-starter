import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="max-w-md mx-auto text-center py-24 px-4 space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center text-cyan-400 shadow-xl shadow-cyan-950">
        <Gamepad2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-black text-cyan-400 uppercase tracking-widest">
          Error 404
        </span>
        <h1 className="text-3xl font-black text-white">Page Not Found</h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          The page you are looking for doesn't exist, was renamed, or is temporarily unavailable.
        </p>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-slate-950 font-black text-xs shadow-xl shadow-cyan-950"
      >
        <ArrowLeft className="w-4 h-4" /> Return to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
