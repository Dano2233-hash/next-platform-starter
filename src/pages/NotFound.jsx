import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="text-center space-y-4 max-w-md">
        <div className="w-20 h-20 rounded-2xl bg-[#0b101e] border border-slate-800 flex items-center justify-center mx-auto text-cyan-400">
          <Gamepad2 className="w-10 h-10 animate-bounce" />
        </div>
        <div className="text-5xl font-black text-white tracking-tight">404</div>
        <h1 className="text-xl font-bold text-slate-200">Page Not Found</h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          The page or game product you are searching for does not exist or has been relocated.
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs rounded-xl shadow transition"
          >
            <Home className="w-4 h-4" />
            <span>Return to Dano Store</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
