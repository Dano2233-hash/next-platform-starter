import React from 'react';
import { Gamepad2, Smartphone, CreditCard, Calendar, Sparkles } from 'lucide-react';

/**
 * Fallback visualizer component for products without images or when images fail to load.
 * Premium digital styling with initials badge, category, and platform details.
 */
export function ProductVisual({ name = 'Game', category = 'games', platform = 'PC', className = '' }) {
  // Extract initials
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  const getCategoryIcon = () => {
    switch (category?.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'gift-cards':
        return <CreditCard className="w-5 h-5 text-amber-400" />;
      case 'subscriptions':
        return <Calendar className="w-5 h-5 text-purple-400" />;
      default:
        return <Gamepad2 className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div
      className={`relative w-full h-full flex flex-col justify-between p-4 overflow-hidden bg-gradient-to-br from-slate-900 via-[#0d1424] to-[#0a192f] border border-slate-800/80 ${className}`}
    >
      {/* Background digital glow accents */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top row: platform tag & category icon */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-slate-800/90 text-cyan-400 border border-cyan-500/20">
          {platform || 'Digital'}
        </span>
        <div className="p-1 rounded-md bg-slate-800/60 border border-slate-700/40">
          {getCategoryIcon()}
        </div>
      </div>

      {/* Middle: Digital Monogram / Initials */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 p-[1px] shadow-lg shadow-cyan-500/10 flex items-center justify-center">
          <div className="w-full h-full rounded-xl bg-slate-950/85 backdrop-blur-sm flex items-center justify-center">
            <span className="text-xl font-extrabold tracking-tight text-white font-mono">
              {initials || 'DS'}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom: Clean product title */}
      <div className="relative z-10">
        <h4 className="text-xs font-semibold text-slate-200 line-clamp-1 text-center tracking-wide">
          {name}
        </h4>
        <div className="flex items-center justify-center gap-1 mt-1 text-[10px] text-slate-400">
          <Sparkles className="w-3 h-3 text-cyan-400 inline" />
          <span>Instant Digital Key</span>
        </div>
      </div>
    </div>
  );
}

export default ProductVisual;
