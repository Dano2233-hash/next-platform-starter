import React from 'react';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound({ navigate }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/5 animate-bounce">
          <Compass className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-white tracking-tight uppercase">404 - LOST IN SPACE</h1>
          <p className="text-sm text-zinc-500 max-w-xs mx-auto leading-relaxed">
            The page or digital keys section you are looking for has been moved, renamed, or deleted.
          </p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black py-3 px-6 rounded-xl text-xs flex items-center justify-center gap-1.5 uppercase tracking-widest mx-auto shadow-lg transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Store Home</span>
        </button>
      </div>
    </div>
  );
}
