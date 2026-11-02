import React from 'react';
import { Gamepad2, Sparkles, Smartphone, CreditCard, ShieldCheck } from 'lucide-react';

/**
 * Reusable fallback visual for products without images or where images fail to load.
 * Premium gaming gradient, initials badge, category, and platform indicators.
 */
export default function ProductVisual({ name = 'Game', category = 'games', platform = 'PC', className = '' }) {
  // Extract initials (up to 2-3 characters)
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 3)
    .map((word) => word[0].toUpperCase())
    .join('');

  // Contextual icon based on category/platform
  const getIcon = () => {
    switch (category) {
      case 'mobile':
        return <Smartphone className="w-5 h-5 text-cyan-300" />;
      case 'gift-cards':
        return <CreditCard className="w-5 h-5 text-amber-300" />;
      case 'subscriptions':
        return <Sparkles className="w-5 h-5 text-purple-300" />;
      default:
        return <Gamepad2 className="w-5 h-5 text-blue-300" />;
    }
  };

  // Coordinated dark gaming gradient backgrounds
  const getGradient = () => {
    switch (category) {
      case 'mobile':
        return 'from-[#0b1b36] via-[#092d3f] to-[#041527] border-cyan-500/30';
      case 'gift-cards':
        return 'from-[#2a1b06] via-[#1a142e] to-[#05070f] border-amber-500/30';
      case 'subscriptions':
        return 'from-[#1e0e38] via-[#120826] to-[#05070f] border-purple-500/30';
      default:
        return 'from-[#0a192f] via-[#0b1426] to-[#05070f] border-blue-500/30';
    }
  };

  return (
    <div
      className={`relative w-full h-48 bg-gradient-to-br ${getGradient()} border border-slate-800/80 rounded-xl overflow-hidden flex flex-col items-center justify-center p-4 text-center select-none shadow-inner group-hover:border-cyan-500/50 transition-colors duration-300 ${className}`}
    >
      {/* Background cyber grid & glow accents */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-25"></div>
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>

      {/* Floating Badges */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-[10px] font-semibold tracking-wider text-slate-300 uppercase backdrop-blur-xs">
        {getIcon()}
        <span>{platform}</span>
      </div>

      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-[10px] font-bold text-cyan-300 uppercase tracking-widest backdrop-blur-xs">
        <ShieldCheck className="w-3 h-3 text-cyan-400" />
        <span>Official</span>
      </div>

      {/* Central Visual Badge */}
      <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 border border-slate-700 flex items-center justify-center shadow-lg mb-2 shadow-cyan-950/40 transform transition-transform duration-300 group-hover:scale-105">
        <span className="text-xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
          {initials || 'DS'}
        </span>
      </div>

      {/* Product Title */}
      <h4 className="relative z-10 text-sm font-bold text-slate-200 line-clamp-1 px-2 group-hover:text-cyan-300 transition-colors">
        {name}
      </h4>
      <span className="relative z-10 text-[11px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">
        {category.replace('-', ' ')}
      </span>
    </div>
  );
}
