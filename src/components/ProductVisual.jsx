import React from 'react';
import { Gamepad2, Smartphone, CreditCard, Sparkles, Layers } from 'lucide-react';

const CATEGORY_GRADIENTS = {
  'games': 'from-blue-600/30 via-indigo-900/40 to-slate-900',
  'top-ups': 'from-cyan-600/30 via-blue-900/40 to-slate-900',
  'gift-cards': 'from-purple-600/30 via-violet-900/40 to-slate-900',
  'subscriptions': 'from-fuchsia-600/30 via-purple-900/40 to-slate-900',
  'others': 'from-slate-700/30 via-slate-900/60 to-slate-950',
};

const CATEGORY_ICONS = {
  'games': Gamepad2,
  'top-ups': Smartphone,
  'gift-cards': CreditCard,
  'subscriptions': Sparkles,
  'others': Layers,
};

export default function ProductVisual({ name = 'Product', category = 'games', platform = 'PC' }) {
  const words = name.trim().split(/\s+/);
  const initials = words.length > 1
    ? (words[0][0] + words[1][0]).toUpperCase()
    : words[0].slice(0, 2).toUpperCase();

  const gradient = CATEGORY_GRADIENTS[category] || CATEGORY_GRADIENTS.games;
  const IconComponent = CATEGORY_ICONS[category] || Gamepad2;

  return (
    <div className={`w-full h-full relative overflow-hidden flex flex-col justify-between p-4 bg-gradient-to-br ${gradient} border border-slate-800/80 rounded-xl select-none group-hover:border-cyan-500/40 transition-colors`}>
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

      {/* Top Tag & Platform */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-cyan-300 bg-cyan-950/70 border border-cyan-800/60 rounded-md backdrop-blur-sm">
          <IconComponent className="w-3.5 h-3.5" />
          {platform}
        </span>
        <span className="text-[10px] tracking-wider uppercase font-bold text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
          Digital Key
        </span>
      </div>

      {/* Center Initials & Glow */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto py-2">
        <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-500/30 shadow-lg shadow-cyan-950/40 group-hover:scale-105 group-hover:border-cyan-400 transition-all duration-300">
          <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 tracking-wider">
            {initials}
          </span>
        </div>
      </div>

      {/* Bottom Name & Category */}
      <div className="relative z-10 text-left">
        <div className="text-xs uppercase tracking-wider font-semibold text-cyan-400 mb-0.5">
          {category.replace('-', ' ')}
        </div>
        <div className="text-sm font-bold text-slate-100 line-clamp-1 group-hover:text-cyan-300 transition-colors">
          {name}
        </div>
      </div>
    </div>
  );
}
