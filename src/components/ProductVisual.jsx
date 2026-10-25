import React from 'react';
import { Gamepad2, ShieldCheck } from 'lucide-react';

export default function ProductVisual({ name = 'Gaming Item', category = 'Games', platform = 'PC' }) {
  // Generate initials (e.g. "PUBG Mobile UC" -> "PU")
  const getInitials = (text) => {
    if (!text) return 'DS';
    const words = text.trim().split(/\s+/);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return text.substring(0, 2).toUpperCase();
  };

  const initials = getInitials(name);

  return (
    <div className="relative w-full h-full min-h-[180px] bg-gradient-to-br from-[#0c1428] via-[#070e1e] to-[#120e2e] flex flex-col justify-between p-4 overflow-hidden border border-slate-800/80 rounded-t-xl group">

      {/* Decorative background grid and ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(#00e5ff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none"></div>
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl group-hover:bg-cyan-500/30 transition-all pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-600/20 rounded-full blur-2xl group-hover:bg-purple-600/30 transition-all pointer-events-none"></div>

      {/* Top badges */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-500/10 text-cyan-400 border border-cyan-500/20">
          {platform}
        </span>
        <ShieldCheck className="w-4 h-4 text-emerald-400/80" />
      </div>

      {/* Center initials badge & title */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center my-2">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5 shadow-xl shadow-cyan-500/20 mb-2 group-hover:scale-105 transition-transform">
          <div className="w-full h-full bg-[#080d1e] rounded-[14px] flex items-center justify-center font-black text-xl text-white tracking-widest">
            {initials}
          </div>
        </div>
        <h3 className="text-xs font-bold text-slate-200 line-clamp-1 max-w-[90%]">
          {name}
        </h3>
      </div>

      {/* Bottom info */}
      <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800/60 pt-2 mt-1">
        <span className="capitalize">{category.replace('-', ' ')}</span>
        <span className="text-cyan-400 font-semibold flex items-center gap-1">
          <Gamepad2 className="w-3 h-3" /> Dano Store
        </span>
      </div>
    </div>
  );
}
