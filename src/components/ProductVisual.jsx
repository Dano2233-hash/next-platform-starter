import React from 'react';
import { Gamepad2, Smartphone, Monitor, Tv, Box, CreditCard, Sparkles } from 'lucide-react';

const CATEGORY_ICONS = {
  mobile: Smartphone,
  pc: Monitor,
  playstation: Tv,
  xbox: Box,
  'gift-cards': CreditCard,
  subscriptions: Sparkles,
};

export default function ProductVisual({ name = 'Game Item', category = 'pc', platform = 'PC', className = '' }) {
  // Extract clean initials (e.g., "GTA V" -> "GV", "Discord Nitro" -> "DN", "Palworld" -> "PW")
  const getInitials = (str) => {
    if (!str) return 'DS';
    const words = str.trim().split(/\s+/);
    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }
    return (words[0][0] + (words[1] ? words[1][0] : '')).toUpperCase();
  };

  const IconComponent = CATEGORY_ICONS[category?.toLowerCase()] || Gamepad2;
  const initials = getInitials(name);

  // Gradient themes based on platform/category
  const getGradient = (plat) => {
    switch (plat?.toLowerCase()) {
      case 'xbox':
        return 'from-emerald-950 via-slate-900 to-green-900/60 border-emerald-500/30 text-emerald-400';
      case 'playstation':
        return 'from-blue-950 via-slate-900 to-indigo-900/60 border-blue-500/30 text-blue-400';
      case 'mobile':
        return 'from-amber-950/60 via-slate-900 to-rose-900/40 border-amber-500/30 text-amber-400';
      case 'gift card':
        return 'from-purple-950 via-slate-900 to-fuchsia-900/50 border-purple-500/30 text-purple-400';
      default:
        return 'from-cyan-950/70 via-slate-900 to-blue-900/50 border-cyan-500/30 text-cyan-400';
    }
  };

  const gradientClasses = getGradient(platform);

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br border select-none overflow-hidden ${gradientClasses} ${className}`}
    >
      {/* Background decorative subtle grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Platform & Category subtle pill at top */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
        <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs border border-white/10 text-slate-300">
          {platform}
        </span>
        <div className="p-1 rounded bg-black/40 text-slate-400">
          <IconComponent size={14} />
        </div>
      </div>

      {/* Center Initials Badge */}
      <div className="relative z-10 flex flex-col items-center my-auto">
        <div className="w-16 h-16 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-xl mb-2.5">
          <span className="text-2xl font-black tracking-tight text-white font-mono">
            {initials}
          </span>
        </div>
        <p className="text-center font-bold text-sm text-white line-clamp-1 max-w-[90%] px-1 drop-shadow-sm">
          {name}
        </p>
        <span className="text-[11px] text-slate-400 uppercase tracking-widest mt-0.5 font-semibold">
          Digital Edition
        </span>
      </div>

      {/* Bottom glowing accent bar */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60" />
    </div>
  );
}
