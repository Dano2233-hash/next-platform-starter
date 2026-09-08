import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowRight } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-16 px-4 space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-[1.5px] shadow-xl">
        <div className="w-full h-full bg-[#080d1a] rounded-[22px] flex items-center justify-center">
          <Gamepad2 className="w-10 h-10 text-cyan-400" />
        </div>
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
          404 Page Not Found
        </span>
        <h1 className="text-3xl font-black text-white">Lost In Game World?</h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          The page you are looking for doesn't exist or has been moved to another level.
        </p>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 text-white font-extrabold text-xs shadow-lg shadow-cyan-950/50"
      >
        <span>Return to Home</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};
