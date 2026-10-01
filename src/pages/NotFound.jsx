import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Home, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-1 shadow-2xl shadow-cyan-500/20 animate-bounce">
        <div className="w-full h-full bg-[#050814] rounded-[22px] flex items-center justify-center text-cyan-400">
          <Gamepad2 className="w-12 h-12 stroke-[2.2]" />
        </div>
      </div>

      <div className="space-y-2 max-w-md">
        <h1 className="text-4xl font-black text-white">404 - Page Not Found</h1>
        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
          Oops! The page you are looking for does not exist or has been moved in Dano Store.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="px-6 py-3 bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-gray-950 font-black text-xs rounded-xl shadow-lg shadow-cyan-500/20 flex items-center gap-2"
        >
          <Home className="w-4 h-4" /> Go to Dano Store Home
        </Link>
        <Link
          to="/products"
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs rounded-xl flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Browse Products
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
