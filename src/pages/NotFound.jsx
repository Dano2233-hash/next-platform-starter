import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-24 max-w-md mx-auto text-center space-y-5">
      <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-cyan-400 shadow-2xl">
        <Gamepad2 className="w-10 h-10 animate-bounce" />
      </div>
      <h1 className="text-4xl font-black text-white font-['Rajdhani',sans-serif]">
        404 - Page Not Found
      </h1>
      <p className="text-xs text-slate-400 leading-relaxed">
        The digital game, item, or page you are looking for has been moved or does not exist on Dano Store.
      </p>
      <div className="pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-950 hover:from-cyan-400 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
