import React from 'react';
import { Gamepad2, ShieldCheck, Zap } from 'lucide-react';

export const ProductVisual = ({ name, category, platform, type }) => {
  const getInitials = (str) => {
    if (!str) return 'DS';
    const words = str.trim().split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return str.slice(0, 2).toUpperCase();
  };

  const getGradient = (plat) => {
    switch (plat?.toLowerCase()) {
      case 'playstation':
        return 'from-blue-900 via-indigo-950 to-slate-950 border-blue-500/30 text-blue-400';
      case 'xbox':
        return 'from-emerald-950 via-teal-950 to-slate-950 border-emerald-500/30 text-emerald-400';
      case 'pc':
        return 'from-purple-950 via-slate-900 to-slate-950 border-purple-500/30 text-purple-400';
      case 'mobile':
        return 'from-cyan-950 via-sky-950 to-slate-950 border-cyan-500/30 text-cyan-400';
      case 'gift card':
        return 'from-amber-950 via-yellow-950 to-slate-950 border-amber-500/30 text-amber-400';
      default:
        return 'from-slate-900 via-blue-950 to-slate-950 border-cyan-500/30 text-cyan-400';
    }
  };

  return (
    <div
      className={`w-full h-full bg-gradient-to-br ${getGradient(
        platform
      )} flex flex-col items-center justify-between p-5 border border-slate-800/80 rounded-xl relative overflow-hidden group select-none`}
    >
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      {/* Top badges */}
      <div className="w-full flex justify-between items-center z-10">
        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-700/50 text-slate-300">
          {platform || 'Digital'}
        </span>
        <span className="flex items-center gap-1 text-[10px] font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded-full">
          <Zap className="w-3 h-3" /> Digital Key
        </span>
      </div>

      {/* Center Icon & Initials */}
      <div className="my-auto flex flex-col items-center text-center z-10 px-2 py-3">
        <div className="w-16 h-16 rounded-2xl bg-slate-900/90 border border-slate-700/60 flex items-center justify-center shadow-xl shadow-black/50 group-hover:scale-105 transition-transform duration-300 mb-3">
          <span className="text-2xl font-extrabold tracking-wider bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            {getInitials(name)}
          </span>
        </div>
        <h3 className="text-sm font-bold text-slate-100 line-clamp-2 leading-tight">
          {name}
        </h3>
      </div>

      {/* Bottom Footer Details */}
      <div className="w-full flex items-center justify-between pt-2 border-t border-slate-800/80 z-10 text-[11px] text-slate-400">
        <span className="capitalize">{type || category || 'Gaming Service'}</span>
        <span className="flex items-center gap-1 text-slate-400">
          <ShieldCheck className="w-3 h-3 text-emerald-400" /> Guaranteed
        </span>
      </div>
    </div>
  );
};
