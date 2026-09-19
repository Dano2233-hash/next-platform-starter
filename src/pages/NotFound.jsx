import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-20 text-center space-y-6 max-w-md">
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-[1.5px] mx-auto shadow-2xl shadow-cyan-500/20">
        <div className="w-full h-full bg-[#070a12] rounded-[22px] flex items-center justify-center">
          <Gamepad2 className="w-10 h-10 text-cyan-400" />
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-cyan-400">
          404 Error - Page Not Found
        </span>
        <h1 className="text-3xl font-black text-white">Lost in the Game Grid?</h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          The page or product link you requested could not be found or has moved to another realm.
        </p>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-extrabold rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-white shadow-xl shadow-cyan-500/20 hover:opacity-95 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home Page</span>
      </Link>
    </div>
  );
};
