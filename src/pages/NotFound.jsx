import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center text-cyan-400 mx-auto">
        <Gamepad2 className="w-10 h-10" />
      </div>

      <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        404
      </h1>

      <h2 className="text-xl font-extrabold text-white">Page Not Found</h2>

      <p className="text-slate-400 text-xs leading-relaxed">
        Oops! The page you are looking for doesn't exist or has been moved. Explore our latest digital games and top-ups below.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold text-xs rounded-xl shadow-lg cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Return to Homepage
      </Link>
    </div>
  );
}
