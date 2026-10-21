import React from 'react';
import { Gamepad2, Smartphone, Gift, Zap, ShieldCheck } from 'lucide-react';

export default function ProductVisual({ name, category, platform }) {
  const getInitials = (str) => {
    if (!str) return 'DS';
    const words = str.trim().split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return str.slice(0, 2).toUpperCase();
  };

  const getCategoryIcon = () => {
    switch (category) {
      case 'mobile':
        return <Smartphone className="w-8 h-8 text-cyan-400" />;
      case 'gift-cards':
        return <Gift className="w-8 h-8 text-purple-400" />;
      case 'subscriptions':
        return <Zap className="w-8 h-8 text-yellow-400" />;
      default:
        return <Gamepad2 className="w-8 h-8 text-blue-400" />;
    }
  };

  return (
    <div className="w-full h-full min-h-[180px] bg-gradient-to-br from-[#0c1226] via-[#111936] to-[#070b1a] relative flex flex-col items-center justify-center p-4 border border-slate-800/80 rounded-xl overflow-hidden group-hover:border-cyan-500/50 transition-all duration-300">
      {/* Background Subtle Tech Grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#00e5ff_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>

      {/* Glowing accent orb */}
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-blue-600/20 rounded-full blur-2xl group-hover:bg-cyan-500/30 transition-all"></div>

      {/* Category/Platform Top Badge */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-[10px] font-bold tracking-wider uppercase text-cyan-400 backdrop-blur-md">
        <ShieldCheck className="w-3 h-3 text-cyan-400" />
        <span>{platform || 'Digital'}</span>
      </div>

      {/* Main Visual Center Piece */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-lg shadow-cyan-950/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          {getCategoryIcon()}
        </div>

        <div className="space-y-0.5">
          <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 drop-shadow-sm">
            {getInitials(name)}
          </span>
          <p className="text-xs font-semibold text-slate-300 line-clamp-1 max-w-[160px] px-1">
            {name}
          </p>
        </div>
      </div>

      {/* Bottom Branding */}
      <div className="absolute bottom-2.5 text-[9px] font-bold tracking-widest text-slate-500 uppercase">
        Dano Store
      </div>
    </div>
  );
}
