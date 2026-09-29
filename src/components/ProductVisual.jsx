import React from 'react';
import { Gamepad2, Smartphone, CreditCard, Zap, Sparkles } from 'lucide-react';

export default function ProductVisual({ name, category, platform }) {
  // Get initials from name
  const initials = name
    ? name
        .split(' ')
        .map((word) => word[0])
        .filter(Boolean)
        .slice(0, 3)
        .join('')
        .toUpperCase()
    : 'DS';

  const getCategoryIcon = () => {
    switch (category) {
      case 'Mobile Top-Ups':
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'Gift Cards':
        return <CreditCard className="w-5 h-5 text-purple-400" />;
      case 'Subscriptions':
        return <Zap className="w-5 h-5 text-amber-400" />;
      default:
        return <Gamepad2 className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#0c142c] via-[#111936] to-[#080d1e] flex flex-col justify-between p-4 border border-slate-800/80 rounded-t-xl group-hover:border-cyan-500/40 transition-all duration-300">
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      {/* Top Bar with Badges */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-900/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
          {getCategoryIcon()}
          {category || 'Digital'}
        </span>
        {platform && (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-slate-800/90 text-slate-300 border border-slate-700/60">
            {platform}
          </span>
        )}
      </div>

      {/* Center Digital Emblem & Initials */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-2">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-blue-600/20 to-purple-600/20 border border-cyan-400/30 flex items-center justify-center shadow-lg shadow-cyan-950/50 group-hover:scale-105 group-hover:border-cyan-400 transition-all duration-300">
          <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-cyan-300 via-blue-200 to-purple-300 bg-clip-text text-transparent">
            {initials}
          </span>
        </div>
        <p className="mt-3 text-sm font-bold text-slate-100 line-clamp-1 px-2 group-hover:text-cyan-300 transition-colors">
          {name}
        </p>
      </div>

      {/* Bottom Footer Accent */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/60 pt-2">
        <span className="flex items-center gap-1 text-slate-400">
          <Sparkles className="w-3 h-3 text-amber-400" /> Digital Key
        </span>
        <span className="font-semibold text-cyan-400 uppercase tracking-widest text-[9px]">
          DANO STORE
        </span>
      </div>
    </div>
  );
}
