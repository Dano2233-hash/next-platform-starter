import React from 'react';
import { Gamepad2, Smartphone, Gift, Sparkles, Layers } from 'lucide-react';

export const ProductVisual = ({ name = 'Product', category = 'games', platform = 'PC', type = 'Digital' }) => {
  // Get initials (up to 2 letters)
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'DS';

  // Category gradients & icons
  const getGradientAndIcon = () => {
    switch (category?.toLowerCase()) {
      case 'topups':
        return {
          gradient: 'from-blue-900/90 via-slate-900 to-cyan-950',
          accentBorder: 'border-cyan-500/30',
          badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
          glow: 'from-cyan-500/10 to-blue-600/10',
          Icon: Smartphone
        };
      case 'giftcards':
        return {
          gradient: 'from-purple-900/90 via-slate-900 to-indigo-950',
          accentBorder: 'border-purple-500/30',
          badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
          glow: 'from-purple-500/10 to-indigo-600/10',
          Icon: Gift
        };
      case 'subscriptions':
        return {
          gradient: 'from-sky-900/90 via-slate-900 to-blue-950',
          accentBorder: 'border-sky-500/30',
          badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
          glow: 'from-sky-500/10 to-cyan-600/10',
          Icon: Sparkles
        };
      case 'games':
      default:
        return {
          gradient: 'from-slate-900 via-blue-950 to-slate-950',
          accentBorder: 'border-blue-500/30',
          badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
          glow: 'from-blue-500/10 to-purple-600/10',
          Icon: Gamepad2
        };
    }
  };

  const { gradient, accentBorder, badgeBg, glow, Icon } = getGradientAndIcon();

  return (
    <div
      className={`relative w-full h-full flex flex-col justify-between p-4 bg-gradient-to-br ${gradient} border ${accentBorder} overflow-hidden select-none group`}
    >
      {/* Background Decorative Pattern */}
      <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gradient-to-br ${glow} blur-xl pointer-events-none`} />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

      {/* Top Bar: Platform & Type */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <span className={`text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded border backdrop-blur-sm ${badgeBg}`}>
          {platform}
        </span>
        <span className="text-[10px] font-medium text-slate-400 bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800">
          {type}
        </span>
      </div>

      {/* Center Visual: Large Initials & Icon */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto py-2 text-center">
        <div className="relative mb-2">
          <div className="w-14 h-14 rounded-2xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
            <span className="text-xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-heading">
              {initials}
            </span>
          </div>
          <div className="absolute -bottom-1 -right-1 p-1 bg-slate-950 rounded-lg border border-slate-700 text-cyan-400">
            <Icon size={12} />
          </div>
        </div>

        <h3 className="text-xs font-bold text-slate-100 line-clamp-2 max-w-[90%] leading-snug font-heading">
          {name}
        </h3>
      </div>

      {/* Bottom Bar: DANO STORE Badge */}
      <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800/80">
        <span className="font-semibold text-slate-400 tracking-wider">DANO STORE</span>
        <span className="flex items-center gap-1 text-cyan-400 font-medium">
          <Layers size={10} /> Instant Code
        </span>
      </div>
    </div>
  );
};

export default ProductVisual;
