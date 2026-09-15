import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Home, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="max-w-md mx-auto text-center py-20 px-4 space-y-6">

      <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-cyan-400 shadow-2xl">
        <Gamepad2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold text-red-400 uppercase tracking-widest">404 Error</span>
        <h1 className="text-3xl font-black text-slate-100">Page Not Found</h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xs mx-auto">
          The page or digital game package you are looking for doesn't exist or has been relocated.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <Link
          to="/"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-bold text-xs text-white shadow-lg flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" /> Go to Home
        </Link>
        <Link
          to="/products"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 font-semibold text-xs text-slate-300 hover:text-white flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4 text-cyan-400" /> Browse Games
        </Link>
      </div>

    </div>
  );
};

export default NotFound;
