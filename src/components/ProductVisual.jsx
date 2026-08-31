import React from 'react';

export default function ProductVisual({ name, category, platform }) {
  const getInitials = (str) => {
    if (!str) return 'DS';
    const words = str.trim().split(/\s+/);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return str.substring(0, 2).toUpperCase();
  };

  const getPlatformColor = (plat) => {
    switch (plat?.toLowerCase()) {
      case 'playstation':
        return 'from-blue-600 to-indigo-900 border-blue-500/30 text-blue-300';
      case 'xbox':
        return 'from-emerald-600 to-teal-950 border-emerald-500/30 text-emerald-300';
      case 'pc':
        return 'from-cyan-600 to-blue-950 border-cyan-500/30 text-cyan-300';
      case 'mobile':
        return 'from-purple-600 to-pink-950 border-purple-500/30 text-purple-300';
      default:
        return 'from-slate-700 to-slate-900 border-slate-600/30 text-slate-300';
    }
  };

  return (
    <div className="relative w-full h-full min-h-[190px] bg-gradient-to-br from-[#0c1222] via-[#090d16] to-[#040711] p-4 flex flex-col justify-between overflow-hidden border border-slate-800/80 rounded-xl group select-none">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500" />

      {/* Top Header Row */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase rounded-md bg-slate-900/90 text-slate-300 border border-slate-700/60 shadow-sm backdrop-blur-md">
          {category || 'Digital Store'}
        </span>
        <div className={`px-2.5 py-1 text-[11px] font-bold uppercase rounded-md bg-gradient-to-r border shadow-sm backdrop-blur-md ${getPlatformColor(platform)}`}>
          {platform || 'Digital'}
        </div>
      </div>

      {/* Central Visual Icon & Initials Badge */}
      <div className="relative z-10 my-auto py-2 flex flex-col items-center justify-center text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600/30 via-cyan-500/20 to-purple-600/30 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(0,102,255,0.25)] group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all duration-300">
          <span className="text-xl font-black tracking-wider text-cyan-300 drop-shadow">
            {getInitials(name)}
          </span>
        </div>
        <div className="mt-2 text-xs font-semibold tracking-widest text-slate-400 uppercase">
          Dano Store Digital
        </div>
      </div>

      {/* Footer Title */}
      <div className="relative z-10 text-center">
        <h4 className="text-sm font-bold text-slate-100 line-clamp-1 group-hover:text-cyan-300 transition-colors">
          {name}
        </h4>
      </div>
    </div>
  );
}
