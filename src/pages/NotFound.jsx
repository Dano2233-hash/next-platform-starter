import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#05070f] text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6 flex-1 flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-black text-3xl shadow-xl shadow-cyan-500/10">
          404
        </div>

        <h1 className="text-3xl font-black text-slate-100 tracking-tight">
          Page Not Found
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
          The page you are looking for does not exist or may have been moved. Return to Dano Store to explore digital games and top-ups.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </main>

      <Footer />
    </div>
  );
};
