import React from 'react';
import { Gamepad2, Smartphone, Gift, Sparkles, ShieldCheck } from 'lucide-react';

export default function ProductVisual({ name, category, platform, className = '' }) {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .filter(Boolean)
        .slice(0, 3)
        .join('')
        .toUpperCase()
    : 'DS';

  const getCategoryIcon = () => {
    switch (category) {
      case 'mobile-topups':
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'gift-cards':
        return <Gift className="w-5 h-5 text-purple-400" />;
      case 'subscriptions':
        return <Sparkles className="w-5 h-5 text-amber-400" />;
      default:
        return <Gamepad2 className="w-5 h-5 text-blue-400" />;
    }
  };

  const getGradient = () => {
    switch (category) {
      case 'mobile-topups':
        return 'from-slate-900 via-cyan-950/40 to-slate-950 border-cyan-500/20';
      case 'gift-cards':
        return 'from-slate-900 via-purple-950/40 to-slate-950 border-purple-500/20';
      case 'subscriptions':
        return 'from-slate-900 via-amber-950/40 to-slate-950 border-amber-500/20';
      default:
        return 'from-slate-900 via-blue-950/40 to-slate-950 border-blue-500/20';
    }
  };

  return (
    <div
      className={`relative w-full h-full min-h-[180px] bg-gradient-to-br ${getGradient()} border flex flex-col justify-between p-4 overflow-hidden select-none ${className}`}
    >
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" />

      {/* Top Bar: Category Icon & Platform */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-sm border border-slate-800 px-2.5 py-1 rounded-md">
          {getCategoryIcon()}
          <span className="text-xs font-semibold tracking-wider text-slate-300 uppercase">
            {platform || 'Digital'}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-bold tracking-widest text-blue-400 bg-blue-950/50 border border-blue-800/40 px-2 py-0.5 rounded">
          <ShieldCheck className="w-3 h-3" /> OFFICIAL
        </div>
      </div>

      {/* Center Initials & Title Visual */}
      <div className="relative z-10 my-auto py-2 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-700/60 shadow-lg text-lg font-black tracking-widest text-white mb-2">
          {initials}
        </div>
        <h4 className="text-sm font-bold text-slate-200 line-clamp-1 px-2">
          {name}
        </h4>
      </div>

      {/* Bottom Footer Accent */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 font-medium border-t border-slate-800/60 pt-2 mt-1">
        <span>Instant Delivery</span>
        <span className="text-cyan-400 font-semibold">100% Verified</span>
      </div>
    </div>
  );
}
