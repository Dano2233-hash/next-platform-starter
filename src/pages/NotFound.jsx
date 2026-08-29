import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-24 text-center max-w-md mx-auto space-y-4">
      <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 mx-auto shadow-xl">
        <Gamepad2 className="w-10 h-10" />
      </div>
      <h1 className="text-4xl font-black text-white">404</h1>
      <h2 className="text-lg font-bold text-slate-200">Page Not Found</h2>
      <p className="text-slate-400 text-xs leading-relaxed">
        The page you are looking for does not exist or has been moved. Check the URL or return to the store homepage.
      </p>
      <div className="pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-600/20"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
