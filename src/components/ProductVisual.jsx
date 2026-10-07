import React from 'react';
import { Gamepad2, Monitor, Smartphone, Tv, CreditCard, Zap, Sparkles } from 'lucide-react';

const categoryGradients = {
  'pc-games': 'from-blue-900/80 via-slate-900 to-cyan-950',
  'xbox': 'from-emerald-950 via-slate-900 to-green-900/80',
  'playstation': 'from-blue-950 via-slate-900 to-indigo-950',
  'mobile': 'from-purple-950 via-slate-900 to-pink-950',
  'gift-cards': 'from-amber-950 via-slate-900 to-yellow-950',
  'subscriptions': 'from-cyan-950 via-slate-900 to-blue-950'
};

const categoryIcons = {
  'pc-games': Monitor,
  'xbox': Gamepad2,
  'playstation': Tv,
  'mobile': Smartphone,
  'gift-cards': CreditCard,
  'subscriptions': Zap
};

export default function ProductVisual({ product, className = "h-48" }) {
  const name = product?.name || 'Digital Gaming Item';
  const category = product?.category || 'pc-games';
  const platform = product?.platform || 'PC';
  const type = product?.type || 'Digital';

  // Get initials
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0].toUpperCase())
    .join('');

  const gradientClass = categoryGradients[category] || 'from-blue-950 via-slate-900 to-purple-950';
  const IconComponent = categoryIcons[category] || Sparkles;

  return (
    <div className={`relative w-full ${className} rounded-lg overflow-hidden bg-gradient-to-br ${gradientClass} border border-slate-800/80 flex flex-col justify-between p-4 shadow-inner group-hover:border-cyan-500/50 transition-colors duration-300`}>
      {/* Background ambient lighting */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header bar: Platform & Type Badges */}
      <div className="flex items-center justify-between z-10">
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-slate-900/90 text-cyan-400 border border-cyan-500/30 backdrop-blur-sm">
          <IconComponent className="w-3 h-3" />
          {platform}
        </span>
        <span className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-500/30 backdrop-blur-sm">
          {type}
        </span>
      </div>

      {/* Center Initials & Branding Visual */}
      <div className="flex flex-col items-center justify-center my-auto z-10 text-center">
        <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-center text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 shadow-md group-hover:scale-110 transition-transform duration-300">
          {initials || 'DS'}
        </div>
        <h3 className="mt-2 text-sm font-bold text-slate-100 line-clamp-1 max-w-[90%] px-1">
          {name}
        </h3>
      </div>

      {/* Footer bar: Branding watermark */}
      <div className="flex items-center justify-between z-10 pt-2 border-t border-slate-800/60 text-[10px] text-slate-400 font-medium tracking-wider uppercase">
        <span>Dano Store</span>
        <span className="text-cyan-400/80">Digital Edition</span>
      </div>
    </div>
  );
}
