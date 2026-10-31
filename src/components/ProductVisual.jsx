import React from 'react';
import { Gamepad2, Sparkles, Smartphone, CreditCard, Monitor, Tv, Disc } from 'lucide-react';

export default function ProductVisual({ name, category, platform, type, className = '' }) {
  // Derive clean 2-3 letter initials from name
  const initials = (name || 'DS')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');

  // Select icon based on platform/category
  const getIcon = () => {
    switch (platform) {
      case 'PlayStation':
        return <Tv className="w-6 h-6 text-cyan-400" />;
      case 'Xbox':
        return <Gamepad2 className="w-6 h-6 text-emerald-400" />;
      case 'PC':
        return <Monitor className="w-6 h-6 text-blue-400" />;
      case 'Mobile':
        return <Smartphone className="w-6 h-6 text-amber-400" />;
      case 'Gift Card':
        return <CreditCard className="w-6 h-6 text-purple-400" />;
      case 'Subscription':
        return <Sparkles className="w-6 h-6 text-pink-400" />;
      default:
        return <Disc className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <div
      className={`relative w-full h-full min-h-[160px] bg-gradient-to-br from-[#0c1326] via-[#101a36] to-[#070b16] border border-cyan-950/40 rounded-xl overflow-hidden flex flex-col justify-between p-4 group select-none ${className}`}
    >
      {/* Subtle gaming backdrop graphic lines */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#00e5ff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Top row: Platform & Category chips */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/20 backdrop-blur-sm">
          {platform || 'Digital'}
        </span>
        <div className="w-8 h-8 rounded-lg bg-slate-900/80 border border-slate-700/50 flex items-center justify-center shadow-inner">
          {getIcon()}
        </div>
      </div>

      {/* Center initials badge */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-2">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600/20 to-blue-600/30 border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-950/50 group-hover:scale-105 transition-transform duration-300">
          <span className="font-extrabold text-2xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
            {initials}
          </span>
        </div>
        <p className="mt-2 text-xs font-semibold text-slate-300 line-clamp-1 max-w-[90%]">
          {name}
        </p>
      </div>

      {/* Bottom row: Type label */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800/60">
        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
          {type || category || 'Digital Key'}
        </span>
        <span className="text-[10px] font-bold text-cyan-400 tracking-wide">
          DANO STORE
        </span>
      </div>
    </div>
  );
}
