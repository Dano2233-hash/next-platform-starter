import React from 'react';
import { Gamepad2, Smartphone, CreditCard, Tv, Zap, Shield, Sparkles } from 'lucide-react';

export const ProductVisual = ({ name = 'Product', category = '', platform = '', className = 'h-48' }) => {
  const getInitials = (str) => {
    if (!str) return 'DS';
    const words = str.trim().split(/\s+/);
    if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const getCategoryTheme = () => {
    switch (category) {
      case 'mobile-topup':
        return {
          gradient: 'from-blue-900/90 via-slate-900 to-cyan-950',
          accent: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
          glow: 'from-cyan-500/20 to-blue-600/20',
          Icon: Smartphone
        };
      case 'paid-games':
        return {
          gradient: 'from-purple-950/90 via-slate-900 to-indigo-950',
          accent: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
          glow: 'from-purple-500/20 to-indigo-600/20',
          Icon: Gamepad2
        };
      case 'gift-cards':
        return {
          gradient: 'from-emerald-950/90 via-slate-900 to-teal-950',
          accent: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
          glow: 'from-emerald-500/20 to-teal-600/20',
          Icon: CreditCard
        };
      case 'subscriptions':
        return {
          gradient: 'from-rose-950/90 via-slate-900 to-amber-950',
          accent: 'border-rose-500/30 text-rose-400 bg-rose-500/10',
          glow: 'from-rose-500/20 to-amber-600/20',
          Icon: Tv
        };
      default:
        return {
          gradient: 'from-slate-900 via-blue-950 to-slate-900',
          accent: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
          glow: 'from-blue-500/20 to-cyan-600/20',
          Icon: Sparkles
        };
    }
  };

  const theme = getCategoryTheme();
  const CategoryIcon = theme.Icon;
  const initials = getInitials(name);

  return (
    <div className={`relative w-full overflow-hidden bg-gradient-to-br ${theme.gradient} flex flex-col justify-between p-4 border border-slate-800/80 rounded-t-xl group ${className}`}>
      {/* Background Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${theme.glow} opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-300 pointer-events-none`} />

      {/* Geometric Decorative Mesh */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none transform translate-x-8 -translate-y-8" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl pointer-events-none transform -translate-x-6 translate-y-6" />

      {/* Top Header Bar */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase rounded-md border border-slate-700/60 bg-slate-900/80 text-slate-300 backdrop-blur-md">
          <CategoryIcon className="w-3 h-3 text-cyan-400" />
          {platform || 'Digital'}
        </span>
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400/80 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800/60">
          DANO STORE
        </span>
      </div>

      {/* Center Initials Badge */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-2">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 shadow-xl shadow-black/40 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform duration-300 border-cyan-500/30">
          <span className="text-xl font-black tracking-wider bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
            {initials}
          </span>
        </div>
        <h3 className="text-sm font-bold text-slate-100 line-clamp-1 max-w-[85%] drop-shadow-md">
          {name}
        </h3>
      </div>

      {/* Bottom Footer Badge */}
      <div className="relative z-10 flex items-center justify-between text-[11px] border-t border-slate-800/80 pt-2 text-slate-400">
        <span className="flex items-center gap-1 font-medium text-slate-300">
          <Zap className="w-3 h-3 text-amber-400 fill-amber-400/20" /> Instant Key
        </span>
        <span className="flex items-center gap-1 font-semibold text-emerald-400">
          <Shield className="w-3 h-3" /> 100% Legal
        </span>
      </div>
    </div>
  );
};
