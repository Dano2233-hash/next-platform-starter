import React from 'react';
import { Gamepad2, Smartphone, CreditCard, Sparkles, ShieldCheck } from 'lucide-react';

export default function ProductVisual({ name, category, platform, className = '' }) {
  const getInitials = (text) => {
    if (!text) return 'DS';
    const words = text.split(' ').filter(Boolean);
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const getThemeGradient = () => {
    switch (category) {
      case 'mobile':
        return 'from-cyan-950 via-slate-900 to-blue-900 border-cyan-500/30 text-cyan-400';
      case 'paid-games':
        return 'from-blue-950 via-slate-900 to-purple-950 border-blue-500/30 text-blue-400';
      case 'gift-cards':
        return 'from-purple-950 via-slate-900 to-indigo-950 border-purple-500/30 text-purple-400';
      case 'subscriptions':
        return 'from-indigo-950 via-slate-900 to-cyan-950 border-cyan-500/30 text-cyan-300';
      default:
        return 'from-slate-900 via-slate-950 to-blue-950 border-blue-500/30 text-blue-400';
    }
  };

  const getCategoryIcon = () => {
    switch (category) {
      case 'mobile':
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'paid-games':
        return <Gamepad2 className="w-5 h-5 text-blue-400" />;
      case 'gift-cards':
        return <CreditCard className="w-5 h-5 text-purple-400" />;
      case 'subscriptions':
        return <Sparkles className="w-5 h-5 text-cyan-300" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div
      className={`relative w-full h-full bg-gradient-to-br ${getThemeGradient()} border rounded-xl flex flex-col justify-between p-4 overflow-hidden select-none transition-transform duration-300 ${className}`}
    >
      {/* Background Subtle Tech Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />

      {/* Top Bar: Platform & Category Icon */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-700/60 backdrop-blur-md text-slate-300 shadow-sm">
          {platform || 'DIGITAL'}
        </span>
        <div className="p-1.5 rounded-lg bg-slate-900/60 border border-slate-700/50 backdrop-blur-md">
          {getCategoryIcon()}
        </div>
      </div>

      {/* Center Hero Initials Badge */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center py-3">
        <div className="w-14 h-14 rounded-2xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-center shadow-lg shadow-black/50 mb-2 group-hover:scale-105 transition-transform">
          <span className="text-xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {getInitials(name)}
          </span>
        </div>
        <h4 className="text-sm font-bold text-center text-slate-100 line-clamp-1 max-w-[90%] px-1 drop-shadow-sm">
          {name}
        </h4>
      </div>

      {/* Bottom Footer Label */}
      <div className="relative z-10 flex items-center justify-between border-t border-slate-800/80 pt-2.5 text-[10px] font-medium text-slate-400">
        <span className="truncate uppercase tracking-widest text-slate-400">DANO STORE</span>
        <span className="px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono">
          100% DIGITAL
        </span>
      </div>
    </div>
  );
}
