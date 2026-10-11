import React from 'react';
import { Gamepad2, Smartphone, CreditCard, Zap } from 'lucide-react';

export default function ProductVisual({ name, category, platform, type }) {
  const getInitials = (str) => {
    if (!str) return 'DS';
    const words = str.trim().split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return str.substring(0, 2).toUpperCase();
  };

  const getCategoryIcon = () => {
    switch (category) {
      case 'mobile-topups':
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'gift-cards':
        return <CreditCard className="w-5 h-5 text-purple-400" />;
      case 'subscriptions':
        return <Zap className="w-5 h-5 text-blue-400" />;
      default:
        return <Gamepad2 className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="w-full h-full min-h-[160px] bg-gradient-to-br from-slate-900 via-[#0b132b] to-[#1c2541] p-4 flex flex-col justify-between relative overflow-hidden group select-none">
      {/* Decorative background ambient lighting */}
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all duration-500" />
      <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-blue-600/10 rounded-full blur-xl group-hover:bg-blue-600/20 transition-all duration-500" />

      {/* Top Header Row */}
      <div className="flex items-center justify-between z-10">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/60 border border-slate-700/50 text-[11px] font-semibold text-slate-300 uppercase tracking-wider backdrop-blur-sm">
          {getCategoryIcon()}
          <span>{platform || 'Digital'}</span>
        </span>
        <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400/80 bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded">
          {type || 'Digital Item'}
        </span>
      </div>

      {/* Center Initials Badge */}
      <div className="my-auto py-2 text-center z-10 flex flex-col items-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1px] shadow-lg shadow-cyan-900/20 group-hover:scale-105 transition-transform duration-300">
          <div className="w-full h-full bg-slate-950/90 rounded-[15px] flex items-center justify-center">
            <span className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-blue-400 font-heading">
              {getInitials(name)}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Name Row */}
      <div className="z-10 bg-slate-950/70 p-2 rounded-lg border border-slate-800/60 backdrop-blur-sm">
        <h4 className="text-xs font-semibold text-slate-200 line-clamp-1 text-center font-heading tracking-wide">
          {name || 'Dano Store Digital'}
        </h4>
      </div>
    </div>
  );
}
