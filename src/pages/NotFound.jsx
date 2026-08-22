import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Gamepad2 } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shadow-2xl">
        <ShieldAlert className="w-10 h-10" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
          404 Error
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-white pt-2">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          The requested gaming page or product key URL does not exist or has been relocated in Dano Store.
        </p>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-slate-950 font-black text-xs rounded-2xl shadow-xl shadow-cyan-500/20"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return To Home Page</span>
      </Link>
    </div>
  );
};

export default NotFound;
