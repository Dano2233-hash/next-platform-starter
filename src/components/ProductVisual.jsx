import React from 'react';
import { Gamepad2, Shield, Smartphone, Gift, Zap } from 'lucide-react';

export const ProductVisual = ({ title = '', category = '', platform = '', className = '' }) => {
  // Generate initials from title
  const initials = title
    ? title
        .split(' ')
        .map((word) => word[0])
        .filter(Boolean)
        .slice(0, 3)
        .join('')
        .toUpperCase()
    : 'DS';

  const getCategoryIcon = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'giftcards':
      case 'gift card':
        return <Gift className="w-5 h-5 text-purple-400" />;
      case 'subscriptions':
      case 'subscription':
        return <Zap className="w-5 h-5 text-amber-400" />;
      default:
        return <Gamepad2 className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div
      className={`relative w-full h-full min-h-[180px] bg-gradient-to-br from-[#0f172a] via-[#131d38] to-[#1e1035] flex flex-col justify-between p-4 rounded-xl border border-slate-800/80 overflow-hidden select-none group ${className}`}
    >
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500"></div>

      {/* Top badges */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold tracking-wider text-slate-300 uppercase bg-slate-900/80 backdrop-blur-md rounded-md border border-slate-700/50">
          {getCategoryIcon(category)}
          {category || 'Digital'}
        </span>
        {platform && (
          <span className="px-2 py-0.5 text-[10px] font-bold tracking-wide text-cyan-300 uppercase bg-cyan-950/80 border border-cyan-800/50 rounded">
            {platform}
          </span>
        )}
      </div>

      {/* Center initials branding */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-2">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/10 mb-2">
          <div className="w-full h-full bg-[#090d16] rounded-[11px] flex items-center justify-center">
            <span className="text-sm font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              {initials}
            </span>
          </div>
        </div>
        <h4 className="text-xs font-bold text-slate-200 line-clamp-2 px-1 max-w-[200px]">
          {title}
        </h4>
      </div>

      {/* Bottom tag */}
      <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/60">
        <span className="flex items-center gap-1 font-medium text-slate-400">
          <Shield className="w-3 h-3 text-emerald-400" /> Digital Product
        </span>
        <span className="font-semibold text-slate-300">Dano Store</span>
      </div>
    </div>
  );
};
