import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-20 h-20 bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-cyan-500/20">
        <Gamepad2 className="w-10 h-10 text-white" />
      </div>

      <div className="space-y-2">
        <h1 className="text-6xl font-black text-white">404</h1>
        <h2 className="text-xl font-extrabold text-slate-200">Page Not Found</h2>
        <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
          The page or product link you clicked might be expired, deleted, or mistyped.
        </p>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Store Homepage
      </Link>
    </div>
  );
};

export default NotFound;
