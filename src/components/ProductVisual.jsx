import React from 'react';
import { Gamepad2, Smartphone, CreditCard, Sparkles, ShieldCheck } from 'lucide-react';

export const ProductVisual = ({ title, category, platform }) => {
  const getIcon = () => {
    switch (category) {
      case 'mobile-topup':
        return <Smartphone className="w-12 h-12 text-cyan-400" />;
      case 'paid-games':
        return <Gamepad2 className="w-12 h-12 text-blue-400" />;
      case 'gift-cards':
        return <CreditCard className="w-12 h-12 text-purple-400" />;
      case 'subscriptions':
        return <Sparkles className="w-12 h-12 text-amber-400" />;
      default:
        return <Gamepad2 className="w-12 h-12 text-cyan-400" />;
    }
  };

  const getInitials = (text) => {
    if (!text) return 'DS';
    const words = text.trim().split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return text.substring(0, 2).toUpperCase();
  };

  return (
    <div className="w-full h-full min-h-[190px] bg-gradient-to-br from-[#0c1427] via-[#091122] to-[#121c38] flex flex-col items-center justify-between p-4 relative overflow-hidden group-hover:scale-105 transition-transform duration-500 rounded-lg select-none border border-cyan-500/10">
      {/* Background Subtle Pattern & Glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>

      {/* Top Badge */}
      <div className="w-full flex justify-between items-center z-10">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800 backdrop-blur-sm">
          {platform || 'DIGITAL'}
        </span>
        <div className="flex items-center gap-1 text-[10px] text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
          <ShieldCheck className="w-3 h-3" />
          <span>INSTANT</span>
        </div>
      </div>

      {/* Center Icon & Initials */}
      <div className="my-auto flex flex-col items-center justify-center gap-2 z-10 text-center px-2">
        <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-700/50 shadow-lg group-hover:border-cyan-500/40 transition-colors">
          {getIcon()}
        </div>
        <span className="text-xl font-extrabold tracking-widest text-slate-200 opacity-90">
          {getInitials(title)}
        </span>
      </div>

      {/* Bottom Title bar */}
      <div className="w-full z-10 text-center">
        <p className="text-xs font-semibold text-slate-300 truncate max-w-full">
          {title}
        </p>
      </div>
    </div>
  );
};
