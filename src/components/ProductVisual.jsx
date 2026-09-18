import React from 'react';
import { Gamepad2, Smartphone, CreditCard, Sparkles, ShieldCheck } from 'lucide-react';

export function ProductVisual({ name, category, platform, heightClass = 'h-48' }) {
  // Get initials (up to 2-3 characters)
  const initials = (name || 'DS')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');

  // Icon based on platform/category
  const renderIcon = () => {
    if (category === 'top-up' || platform === 'Mobile') {
      return <Smartphone class="w-8 h-8 text-cyan-400 opacity-80" />;
    }
    if (category === 'gift-cards' || platform === 'Gift Card') {
      return <CreditCard class="w-8 h-8 text-purple-400 opacity-80" />;
    }
    if (category === 'subscriptions') {
      return <Sparkles class="w-8 h-8 text-blue-400 opacity-80" />;
    }
    return <Gamepad2 class="w-8 h-8 text-cyan-400 opacity-80" />;
  };

  return (
    <div
      className={`relative w-full ${heightClass} bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/60 flex flex-col justify-between p-4 overflow-hidden rounded-t-xl border-b border-slate-800/60 group`}
    >
      {/* Decorative background grid pattern & glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:12px_12px] opacity-30 pointer-events-none" />
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-300" />
      <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-600/20 transition-all duration-300" />

      {/* Top Bar: Badges */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-slate-800/80 text-cyan-400 border border-cyan-500/20 backdrop-blur-sm">
          {platform || 'Digital'}
        </span>
        <div className="flex items-center gap-1 text-[10px] text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-800">
          <ShieldCheck class="w-3 h-3 text-emerald-400" />
          <span>Verified</span>
        </div>
      </div>

      {/* Center Visual: Large Initials + Graphic */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto py-2">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-950/30 mb-2 group-hover:scale-105 transition-transform duration-300">
          <span className="text-xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 bg-clip-text text-transparent">
            {initials}
          </span>
        </div>
        <div className="text-xs font-medium text-slate-300 max-w-[90%] text-center line-clamp-1">
          {name}
        </div>
      </div>

      {/* Bottom Info */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/40">
        <span className="capitalize">{category?.replace('-', ' ') || 'Digital Code'}</span>
        <div className="flex items-center gap-1">
          {renderIcon()}
        </div>
      </div>
    </div>
  );
}
