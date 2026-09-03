import React from 'react';
import { Gamepad2, Smartphone, Gift, Sparkles, Monitor, Tv } from 'lucide-react';

export const ProductVisual = ({ name, category, platform }) => {
  const getInitials = (text) => {
    if (!text) return 'DS';
    const words = text.trim().split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return text.substring(0, 2).toUpperCase();
  };

  const getPlatformIcon = () => {
    const p = (platform || '').toLowerCase();
    if (p.includes('pc')) return <Monitor className="w-5 h-5 text-cyan-400" />;
    if (p.includes('mobile')) return <Smartphone className="w-5 h-5 text-blue-400" />;
    if (p.includes('playstation') || p.includes('xbox')) return <Gamepad2 className="w-5 h-5 text-purple-400" />;
    if (p.includes('gift')) return <Gift className="w-5 h-5 text-amber-400" />;
    return <Sparkles className="w-5 h-5 text-cyan-400" />;
  };

  return (
    <div className="w-full h-full min-h-[180px] bg-gradient-to-br from-[#0c1329] via-[#09153a] to-[#120a2a] relative overflow-hidden flex flex-col justify-between p-4 rounded-t-xl border-b border-slate-800/60 select-none group">
      {/* Decorative background grid and ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,229,255,0.15),transparent_70%)]" />
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-600/20 rounded-full blur-2xl group-hover:bg-purple-600/30 transition-all duration-500" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl group-hover:bg-blue-600/30 transition-all duration-500" />

      {/* Top row: Platform icon + Category badge */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-700/50 backdrop-blur-md">
          {getPlatformIcon()}
          <span className="text-xs font-semibold text-slate-300">{platform || 'Gaming'}</span>
        </div>
        <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
          {category || 'Digital'}
        </span>
      </div>

      {/* Middle row: Large Initials Emblem */}
      <div className="relative z-10 my-auto flex items-center justify-center py-2">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600/30 via-cyan-500/20 to-purple-600/30 border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-950/50 transform group-hover:scale-105 transition-transform duration-300">
          <span className="text-2xl font-black bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
            {getInitials(name)}
          </span>
        </div>
      </div>

      {/* Bottom row: Product Title */}
      <div className="relative z-10">
        <h4 className="text-xs font-bold text-slate-200 line-clamp-1 text-center drop-shadow">
          {name}
        </h4>
      </div>
    </div>
  );
};
