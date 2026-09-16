import React from 'react';
import { Gamepad2, Smartphone, Gift, Zap, Monitor, Cpu } from 'lucide-react';

export default function ProductVisual({ name, category, platform }) {
  // Extract initials (up to 2 letters)
  const getInitials = (text) => {
    if (!text) return 'DS';
    const words = text.trim().split(/\s+/);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return text.substring(0, 2).toUpperCase();
  };

  const getCategoryIcon = (cat, plat) => {
    const combined = `${cat} ${plat}`.toLowerCase();
    if (combined.includes('mobile') || combined.includes('phone')) {
      return <Smartphone className="w-8 h-8 text-cyan-400" />;
    }
    if (combined.includes('gift') || combined.includes('card')) {
      return <Gift className="w-8 h-8 text-purple-400" />;
    }
    if (combined.includes('sub') || combined.includes('nitro')) {
      return <Zap className="w-8 h-8 text-amber-400" />;
    }
    if (combined.includes('pc')) {
      return <Monitor className="w-8 h-8 text-blue-400" />;
    }
    return <Gamepad2 className="w-8 h-8 text-cyan-400" />;
  };

  const initials = getInitials(name);

  return (
    <div className="w-full h-full min-h-[180px] bg-gradient-to-br from-[#0a1128] via-[#0f172a] to-[#0d1424] relative overflow-hidden flex flex-col items-center justify-center p-4 border border-slate-800/80 rounded-t-xl group-hover:border-cyan-500/40 transition-colors">
      {/* Decorative background grid and lighting glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#00e5ff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Main visual emblem */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2">
        <div className="w-16 h-16 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-lg flex items-center justify-center group-hover:scale-105 group-hover:border-cyan-400/60 transition-all duration-300">
          <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-mono tracking-wider">
            {initials}
          </span>
        </div>

        <div className="flex items-center gap-1.5 pt-1">
          {getCategoryIcon(category, platform)}
        </div>

        <span className="text-xs font-semibold text-slate-300 line-clamp-1 max-w-[180px]">
          {name}
        </span>

        <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider text-slate-400">
          <span className="px-1.5 py-0.5 rounded bg-slate-800/80 border border-slate-700">
            {platform || 'DIGITAL'}
          </span>
          <span>•</span>
          <span className="text-cyan-400">
            {category || 'GAME'}
          </span>
        </div>
      </div>
    </div>
  );
}
