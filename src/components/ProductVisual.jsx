import React from 'react';
import { Gamepad2, ShieldAlert } from 'lucide-react';

export function ProductVisual({ name, category, platform }) {
  const getInitials = (str) => {
    if (!str) return 'DS';
    const words = str.trim().split(/\s+/);
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const getGradient = (cat) => {
    switch (cat) {
      case 'mobile':
        return 'from-blue-600 via-indigo-700 to-purple-900';
      case 'pc':
        return 'from-cyan-600 via-blue-700 to-slate-900';
      case 'xbox':
        return 'from-emerald-600 via-teal-800 to-slate-900';
      case 'playstation':
        return 'from-blue-700 via-indigo-900 to-black';
      case 'gift-cards':
        return 'from-purple-600 via-pink-700 to-slate-900';
      case 'subscriptions':
        return 'from-violet-600 via-purple-800 to-slate-900';
      default:
        return 'from-blue-600 via-purple-700 to-slate-900';
    }
  };

  return (
    <div
      className={`w-full h-full bg-gradient-to-br ${getGradient(
        category
      )} p-4 flex flex-col justify-between items-center text-center relative overflow-hidden select-none border border-slate-700/50 rounded-lg group-hover:border-cyan-500/50 transition-all`}
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

      {/* Top Header Badge */}
      <div className="z-10 w-full flex justify-between items-center text-[10px] uppercase tracking-wider text-slate-300 font-bold bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
        <span className="truncate max-w-[70px] text-cyan-400">{platform || 'Gaming'}</span>
        <span className="text-purple-400 truncate max-w-[70px]">{category || 'Digital'}</span>
      </div>

      {/* Center Initials & Gamepad Icon */}
      <div className="z-10 my-auto flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-lg flex items-center justify-center border border-white/20 shadow-xl mb-2 group-hover:scale-110 transition-transform duration-300">
          <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-300">
            {getInitials(name)}
          </span>
        </div>
        <p className="text-xs font-semibold text-slate-200 line-clamp-2 px-1 max-w-[180px] drop-shadow">
          {name}
        </p>
      </div>

      {/* Footer Branding */}
      <div className="z-10 w-full flex items-center justify-center gap-1 text-[10px] text-cyan-300/80 font-mono tracking-widest uppercase bg-slate-950/60 py-1 rounded border border-cyan-500/20">
        <Gamepad2 className="w-3 h-3 text-cyan-400" />
        <span>Dano Store Digital</span>
      </div>
    </div>
  );
}
