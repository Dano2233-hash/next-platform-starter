import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto text-center py-20 pb-24">
      <div className="bg-[#0a0f1d] border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-5">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-rose-600 to-purple-600 p-0.5 shadow-lg shadow-rose-600/20 flex items-center justify-center">
          <div className="w-full h-full bg-[#050811] rounded-[14px] flex items-center justify-center">
            <Gamepad2 className="w-8 h-8 text-rose-400" />
          </div>
        </div>

        <h1 className="text-4xl font-black text-white">404</h1>
        <h2 className="text-lg font-bold text-slate-200">Page Not Found</h2>

        <p className="text-xs text-slate-400 leading-relaxed">
          The digital realm page you are searching for does not exist or has been relocated.
        </p>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-cyan-600/25 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Dano Store Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
