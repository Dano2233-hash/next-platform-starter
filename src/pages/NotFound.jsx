import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="py-16 text-center space-y-6 max-w-lg mx-auto">
      <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-cyan-500/20 via-blue-600/20 to-purple-600/20 border border-cyan-500/30 flex items-center justify-center mx-auto shadow-2xl">
        <Gamepad2 className="w-12 h-12 text-cyan-400" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950 px-3 py-1 rounded-full border border-cyan-500/30">
          Error 404
        </span>
        <h1 className="text-3xl font-black text-slate-100 tracking-tight pt-2">
          Page Not Found
        </h1>
        <p className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed">
          The page or digital product code you are looking for does not exist or has been moved.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <Link
          to="/"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-500/20"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <Link
          to="/products"
          className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-cyan-300 font-bold text-xs hover:bg-slate-800 transition-colors flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          <span>Browse Store</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
