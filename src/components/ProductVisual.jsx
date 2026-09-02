import React from 'react';
import { Gamepad2, Smartphone, Gift, Crown, Sparkles } from 'lucide-react';

export default function ProductVisual({ name = 'Digital Product', category = '', platform = '' }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  const getPlatformIcon = () => {
    switch (platform) {
      case 'Mobile':
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'Gift Card':
        return <Gift className="w-5 h-5 text-amber-400" />;
      case 'Subscription':
        return <Crown className="w-5 h-5 text-purple-400" />;
      default:
        return <Gamepad2 className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="relative w-full h-full min-h-[180px] bg-gradient-to-br from-[#0c1322] via-[#11192e] to-[#070b14] flex flex-col justify-between p-4 overflow-hidden group border-b border-slate-800/80">
      {/* Background glow effects */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl group-hover:bg-cyan-500/30 transition-all duration-500" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-600/20 rounded-full blur-2xl group-hover:bg-purple-500/30 transition-all duration-500" />

      {/* Top row: Platform & Category badges */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-700/60 text-xs font-semibold text-slate-300 backdrop-blur-md">
          {getPlatformIcon()}
          <span>{platform || 'Digital'}</span>
        </span>
        {category && (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-blue-950/80 border border-blue-800/50 text-blue-300">
            {category}
          </span>
        )}
      </div>

      {/* Center Initials Graphic */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1px] shadow-lg shadow-cyan-950/50 mb-2 group-hover:scale-105 transition-transform duration-300">
          <div className="w-full h-full rounded-[15px] bg-[#0b101d] flex items-center justify-center font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300">
            {initials || 'DS'}
          </div>
        </div>
        <p className="text-sm font-bold text-slate-200 line-clamp-1 group-hover:text-cyan-300 transition-colors">
          {name}
        </p>
      </div>

      {/* Bottom accent tag */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/50">
        <span className="flex items-center gap-1 text-slate-400">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          DANO DIGITAL
        </span>
        <span className="text-cyan-400 font-semibold tracking-wide">INSTANT</span>
      </div>
    </div>
  );
}
