import React from 'react';
import { Gamepad2, Smartphone, Gift, ShieldCheck, Sparkles, Monitor, Tv } from 'lucide-react';

export const ProductVisual = ({ name = '', category = '', platform = '' }) => {
  const getInitials = (str) => {
    if (!str) return 'DS';
    const words = str.trim().split(/\s+/);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return str.slice(0, 2).toUpperCase();
  };

  const initials = getInitials(name);

  // Platform icon selection
  const renderIcon = () => {
    const p = (platform || category || '').toLowerCase();
    if (p.includes('mobile') || p.includes('pubg') || p.includes('free fire')) {
      return <Smartphone className="w-8 h-8 text-cyan-400" />;
    }
    if (p.includes('xbox')) {
      return <Gamepad2 className="w-8 h-8 text-emerald-400" />;
    }
    if (p.includes('playstation') || p.includes('ps')) {
      return <Tv className="w-8 h-8 text-blue-400" />;
    }
    if (p.includes('gift') || p.includes('card')) {
      return <Gift className="w-8 h-8 text-purple-400" />;
    }
    if (p.includes('subscription') || p.includes('discord') || p.includes('netflix')) {
      return <Sparkles className="w-8 h-8 text-amber-400" />;
    }
    return <Monitor className="w-8 h-8 text-blue-400" />;
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#0d1527] to-[#150d2a] flex flex-col justify-between p-4 select-none group-hover:scale-105 transition-transform duration-500">
      {/* Subtle Background Pattern & Glow */}
      <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Bar Badges */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="p-2 bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-700/50 shadow-inner">
          {renderIcon()}
        </div>
        <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
          {platform || 'Digital Key'}
        </span>
      </div>

      {/* Center Visual Initials & Glow */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto py-2">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-extrabold text-2xl tracking-widest border border-white/10 mb-2">
          {initials}
        </div>
        <h4 className="text-sm font-semibold text-slate-200 text-center line-clamp-1 px-2">
          {name}
        </h4>
      </div>

      {/* Bottom Footer Info */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
        <span className="capitalize">{category || 'Digital Item'}</span>
        <span className="flex items-center gap-1 text-cyan-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5" /> Instant Delivery
        </span>
      </div>
    </div>
  );
};
