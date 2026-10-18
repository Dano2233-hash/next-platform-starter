import React from 'react';
import { Gamepad2, Smartphone, Gift, Sparkles, ShieldCheck } from 'lucide-react';

const getInitials = (name) => {
  if (!name) return 'DS';
  const words = name.split(' ').filter(Boolean);
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
};

const getCategoryIcon = (category) => {
  switch (category) {
    case 'paid-games':
      return <Gamepad2 className="w-5 h-5 text-cyan-400" />;
    case 'mobile-topups':
      return <Smartphone className="w-5 h-5 text-blue-400" />;
    case 'gift-cards':
      return <Gift className="w-5 h-5 text-purple-400" />;
    case 'subscriptions':
      return <Sparkles className="w-5 h-5 text-indigo-400" />;
    default:
      return <Gamepad2 className="w-5 h-5 text-cyan-400" />;
  }
};

const getGradientClass = (category) => {
  switch (category) {
    case 'paid-games':
      return 'from-slate-900 via-cyan-950/60 to-slate-900 border-cyan-500/30';
    case 'mobile-topups':
      return 'from-slate-900 via-blue-950/60 to-slate-900 border-blue-500/30';
    case 'gift-cards':
      return 'from-slate-900 via-purple-950/60 to-slate-900 border-purple-500/30';
    case 'subscriptions':
      return 'from-slate-900 via-indigo-950/60 to-slate-900 border-indigo-500/30';
    default:
      return 'from-slate-900 via-slate-800 to-slate-900 border-slate-700/50';
  }
};

export default function ProductVisual({ name, category, platform, className = '' }) {
  const initials = getInitials(name);
  const gradient = getGradientClass(category);

  return (
    <div
      className={`relative w-full h-full bg-gradient-to-br ${gradient} border flex flex-col items-center justify-between p-4 overflow-hidden select-none ${className}`}
    >
      {/* Subtle Background Glow Patterns */}
      <div className="absolute -top-10 -left-10 w-28 h-28 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-purple-500/10 rounded-full blur-xl pointer-events-none" />

      {/* Top Bar: Platform & Category Icon */}
      <div className="w-full flex items-center justify-between text-xs z-10">
        <span className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 font-medium border border-slate-700/60 backdrop-blur-sm">
          {platform || 'Digital'}
        </span>
        <div className="p-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
          {getCategoryIcon(category)}
        </div>
      </div>

      {/* Center Initials Badge */}
      <div className="my-auto text-center z-10 flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-cyan-500/20 mb-2 border border-cyan-300/30">
          {initials}
        </div>
        <h4 className="text-slate-200 font-bold text-sm tracking-wide line-clamp-1 max-w-[90%] px-1">
          {name || 'Digital Game'}
        </h4>
      </div>

      {/* Bottom Bar: Dano Store Seal */}
      <div className="w-full flex items-center justify-center gap-1 text-[10px] text-slate-400 font-medium pt-1 border-t border-slate-800/80 z-10">
        <ShieldCheck className="w-3 h-3 text-cyan-400" />
        <span>Official Dano Key</span>
      </div>
    </div>
  );
}
