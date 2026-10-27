import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Gamepad2, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="max-w-md mx-auto py-20 px-4 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 mx-auto shadow-2xl relative">
        <Gamepad2 className="w-10 h-10" />
        <span className="absolute -top-1 -right-1 bg-red-600 text-white font-black text-[10px] px-1.5 py-0.5 rounded-full">
          404
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-black text-white">Page Not Found</h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          The page or digital product link you requested does not exist or has been moved in Dano Store.
        </p>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 text-white font-extrabold text-xs shadow-lg shadow-cyan-950"
      >
        <Home className="w-4 h-4" />
        <span>Return to Home Store</span>
      </Link>
    </div>
  );
};

export default NotFound;
