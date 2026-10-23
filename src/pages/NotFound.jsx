import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto text-center py-20 space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center text-cyan-400 shadow-xl">
        <Gamepad2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-cyan-400">404 Error</span>
        <h1 className="text-3xl font-black text-white">Page Not Found</h1>
        <p className="text-xs text-slate-400 max-w-xs mx-auto">
          The page you are looking for doesn't exist or has been moved in Dano Store.
        </p>
      </div>

      <Link
        to="/"
        className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
}
