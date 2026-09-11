import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16 px-4">
      <div className="text-center space-y-5 bg-[#0b0f19] border border-slate-800 rounded-3xl p-10 max-w-md w-full shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
          <Gamepad2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-4xl font-black text-cyan-400">404</span>
          <h1 className="text-xl font-bold text-white">Page Not Found</h1>
          <p className="text-xs text-slate-400">
            The page you are looking for doesn't exist or has been moved to a different URL.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/20"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
