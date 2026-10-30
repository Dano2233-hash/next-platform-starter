import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#05070f] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center my-12">
        <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-6 shadow-2xl">
          <Gamepad2 className="w-10 h-10" />
        </div>

        <h1 className="text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
          404
        </h1>
        <h2 className="text-xl font-bold text-slate-200 mb-2">Page Not Found</h2>
        <p className="text-xs text-slate-400 max-w-sm mb-8 leading-relaxed">
          The gaming page or digital code route you are looking for does not exist on Dano Store.
        </p>

        <Link
          to="/"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Dano Store Home</span>
        </Link>
      </main>

      <Footer />
    </div>
  );
}
