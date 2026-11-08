import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <div className="py-24 text-center max-w-md mx-auto space-y-5">
      <div className="w-20 h-20 rounded-3xl bg-cyan-950/60 border border-cyan-800/80 flex items-center justify-center text-cyan-400 mx-auto shadow-2xl">
        <Gamepad2 className="w-10 h-10" />
      </div>
      <div>
        <span className="text-4xl font-extrabold text-cyan-400 font-mono">404</span>
        <h1 className="text-2xl font-bold text-white mt-1">Page Not Found</h1>
        <p className="text-xs text-slate-400 mt-2">
          The gaming page or top-up link you requested does not exist or has been relocated.
        </p>
      </div>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-950"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>
    </div>
  );
}

export default NotFound;
