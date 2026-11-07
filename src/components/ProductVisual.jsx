import React from 'react';
import { Gamepad2, Shield, Smartphone, Gift, Sparkles, Monitor, Tv } from 'lucide-react';

/**
 * Fallback digital visual component for products with missing or broken images.
 * Designed with a sleek gaming aesthetic, distinct platform icons, category badges,
 * and high-contrast styling.
 */
export function ProductVisual({ name = 'Game', category = 'pc', platform = 'PC', className = '' }) {
  // Extract initials (up to 3 characters)
  const initials = name
    .split(/[\s:_-]+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((w) => w[0])
    .join('')
    .toUpperCase() || 'DS';

  const getPlatformIcon = () => {
    const p = (platform || '').toLowerCase();
    if (p.includes('xbox')) return <Gamepad2 className="w-6 h-6 text-emerald-400" />;
    if (p.includes('playstation')) return <Tv className="w-6 h-6 text-blue-400" />;
    if (p.includes('mobile')) return <Smartphone className="w-6 h-6 text-amber-400" />;
    if (p.includes('pc')) return <Monitor className="w-6 h-6 text-cyan-400" />;
    if (category === 'gift-cards') return <Gift className="w-6 h-6 text-rose-400" />;
    if (category === 'subscriptions') return <Sparkles className="w-6 h-6 text-purple-400" />;
    return <Shield className="w-6 h-6 text-indigo-400" />;
  };

  const getGradients = () => {
    const p = (platform || '').toLowerCase();
    const c = (category || '').toLowerCase();

    if (c === 'gift-cards' || p.includes('gift')) {
      return 'from-rose-950/80 via-slate-900 to-amber-950/60 border-rose-500/20';
    }
    if (c === 'subscriptions') {
      return 'from-purple-950/80 via-slate-900 to-indigo-950/60 border-purple-500/20';
    }
    if (p.includes('xbox')) {
      return 'from-emerald-950/80 via-slate-900 to-teal-950/60 border-emerald-500/20';
    }
    if (p.includes('playstation')) {
      return 'from-blue-950/80 via-slate-900 to-indigo-950/60 border-blue-500/20';
    }
    if (p.includes('mobile')) {
      return 'from-amber-950/80 via-slate-900 to-orange-950/60 border-amber-500/20';
    }
    // Default PC / Dark cyber
    return 'from-cyan-950/80 via-slate-900 to-blue-950/60 border-cyan-500/20';
  };

  return (
    <div
      className={`relative w-full h-full flex flex-col justify-between p-4 overflow-hidden bg-gradient-to-br ${getGradients()} border select-none ${className}`}
    >
      {/* Background cyber grid overlay */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: '16px 16px'
        }}
      />

      {/* Top row badges */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/60 border border-white/10 backdrop-blur-md">
          {getPlatformIcon()}
          <span className="text-[11px] font-bold tracking-wider uppercase text-slate-200">
            {platform}
          </span>
        </div>
        <div className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-medium tracking-wide uppercase text-slate-400">
          Digital Key
        </div>
      </div>

      {/* Center initials badge */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-3">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-slate-900 to-slate-800 border border-white/15 flex items-center justify-center shadow-lg shadow-black/50 mb-2">
          <span className="text-2xl font-black tracking-tight bg-gradient-to-br from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            {initials}
          </span>
        </div>
        <div className="text-xs font-bold text-slate-200 line-clamp-1 max-w-[85%] px-1 text-center">
          {name}
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-400 border-t border-white/10 pt-2">
        <span className="uppercase font-semibold tracking-wider text-cyan-400">Dano Store Verified</span>
        <span className="text-slate-500 font-mono">100% LEGAL</span>
      </div>
    </div>
  );
}

export default ProductVisual;
