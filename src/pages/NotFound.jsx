import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md space-y-6 bg-[#090d1a] border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <div className="w-20 h-20 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto text-slate-950 font-black">
          <Gamepad2 className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-black text-white">404</h1>
        <h2 className="text-lg font-bold text-slate-200">Page Not Found</h2>
        <p className="text-xs text-slate-400">
          The page you are looking for doesn't exist or has been moved to another level.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-950"
        >
          <ArrowLeft className="w-4 h-4" />
          Back To Home
        </Link>
      </div>
    </div>
  );
};
