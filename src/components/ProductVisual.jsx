import React from 'react';
import { Gamepad2, Smartphone, Monitor, Box, Tv, Gift, Sparkles } from 'lucide-react';

export default function ProductVisual({ product, className = '' }) {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'mobile':
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'pc':
        return <Monitor className="w-5 h-5 text-blue-400" />;
      case 'xbox':
        return <Box className="w-5 h-5 text-green-400" />;
      case 'playstation':
        return <Tv className="w-5 h-5 text-blue-500" />;
      case 'gift-cards':
        return <Gift className="w-5 h-5 text-yellow-400" />;
      case 'subscriptions':
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      default:
        return <Gamepad2 className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getInitials = (name) => {
    if (!name) return 'DS';
    const words = name.split(' ').filter(Boolean);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div
      className={`relative flex flex-col justify-between p-4 overflow-hidden rounded-t-xl bg-gradient-to-br from-slate-900 via-[#0a1026] to-[#120e2e] border-b border-slate-800 ${className}`}
    >
      {/* Background Decorative Accent Gradients */}
      <div className="absolute -right-8 -top-8 w-28 h-28 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
      <div className="absolute -left-8 -bottom-8 w-28 h-28 bg-purple-500/10 rounded-full blur-xl pointer-events-none" />

      {/* Top Header Row */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/50 backdrop-blur-sm">
          {getCategoryIcon(product.category)}
          <span className="capitalize">{product.platform || product.category}</span>
        </span>
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold text-xs tracking-wider">
          {getInitials(product.name)}
        </div>
      </div>

      {/* Middle Banner Graphic */}
      <div className="relative z-10 my-auto py-3 text-center">
        <h4 className="text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-cyan-200 to-blue-200 drop-shadow-sm line-clamp-2">
          {product.name}
        </h4>
        <p className="mt-1 text-[11px] font-medium text-slate-400 tracking-wider uppercase">
          {product.type || 'Digital Item'}
        </p>
      </div>

      {/* Bottom Footer Bar */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800/60 text-[10px] text-slate-400">
        <span className="font-semibold text-cyan-400">DANO STORE</span>
        <span className="bg-slate-800/60 px-2 py-0.5 rounded text-slate-300 border border-slate-700/40">
          Official Digital Code
        </span>
      </div>
    </div>
  );
}
