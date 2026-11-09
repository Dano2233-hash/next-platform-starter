import React from 'react';
import { Gamepad2, Smartphone, CreditCard, Tv, Layers } from 'lucide-react';

/**
 * High-grade digital fallback visual for products.
 * Never looks like a blank placeholder: renders stylish initials, category icon, platform badge and neon accents.
 */
export default function ProductVisual({ name = 'Product', category = 'games', platform = 'PC' }) {
  // Extract initials
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  // Category visual presets
  const getCategoryTheme = (cat) => {
    switch (cat) {
      case 'mobile-topup':
        return {
          icon: Smartphone,
          gradient: 'from-cyan-950 via-slate-900 to-blue-950',
          accent: 'text-cyan-400',
          glow: 'rgba(6, 182, 212, 0.15)',
          border: 'border-cyan-500/20'
        };
      case 'gift-cards':
        return {
          icon: CreditCard,
          gradient: 'from-amber-950/70 via-slate-900 to-purple-950',
          accent: 'text-amber-400',
          glow: 'rgba(245, 158, 11, 0.15)',
          border: 'border-amber-500/20'
        };
      case 'subscriptions':
        return {
          icon: Tv,
          gradient: 'from-purple-950 via-slate-900 to-indigo-950',
          accent: 'text-purple-400',
          glow: 'rgba(168, 85, 247, 0.15)',
          border: 'border-purple-500/20'
        };
      default:
        return {
          icon: Gamepad2,
          gradient: 'from-blue-950 via-slate-900 to-slate-950',
          accent: 'text-blue-400',
          glow: 'rgba(59, 130, 246, 0.15)',
          border: 'border-blue-500/20'
        };
    }
  };

  const theme = getCategoryTheme(category);
  const IconComponent = theme.icon;

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center p-4 select-none overflow-hidden bg-gradient-to-br ${theme.gradient} border ${theme.border}`}
      style={{
        boxShadow: `inset 0 0 35px ${theme.glow}`
      }}
    >
      {/* Background cyber grid pattern */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '16px 16px'
        }}
      />

      {/* Decorative digital corner brackets */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-white/20" />
      <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-white/20" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-white/20" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-white/20" />

      {/* Centered Initials Emblem */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-900/90 border border-white/10 flex items-center justify-center shadow-xl backdrop-blur-md mb-2 group-hover:scale-105 transition-transform duration-300">
          <span className={`text-2xl font-black tracking-wider ${theme.accent} font-heading`}>
            {initials || 'DS'}
          </span>
        </div>

        {/* Product Title */}
        <p className="text-center text-xs font-semibold text-slate-200 line-clamp-1 max-w-[90%] px-1">
          {name}
        </p>

        {/* Platform & Category info tag */}
        <div className="flex items-center gap-1.5 mt-1.5 opacity-80">
          <IconComponent className={`w-3 h-3 ${theme.accent}`} />
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            {platform} • {category.replace('-', ' ')}
          </span>
        </div>
      </div>
    </div>
  );
}
