import React from 'react';
import { Gamepad2, Smartphone, Gift, Sparkles, Monitor, Tv } from 'lucide-react';

export default function ProductVisual({ name, category, platform, className = '' }) {
  const initials = name
    ? name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .slice(0, 3)
        .toUpperCase()
    : 'DS';

  const getIcon = () => {
    switch (platform?.toLowerCase()) {
      case 'pc':
        return <Monitor className="w-8 h-8 text-cyan-400 opacity-80" />;
      case 'xbox':
      case 'playstation':
        return <Gamepad2 className="w-8 h-8 text-purple-400 opacity-80" />;
      case 'mobile':
        return <Smartphone className="w-8 h-8 text-blue-400 opacity-80" />;
      case 'gift card':
        return <Gift className="w-8 h-8 text-amber-400 opacity-80" />;
      default:
        return <Sparkles className="w-8 h-8 text-cyan-400 opacity-80" />;
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 flex flex-col items-center justify-between p-4 text-center select-none border border-cyan-500/10 ${className}`}
    >
      {/* Background glow and decorative elements */}
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-purple-500/10 rounded-full blur-xl pointer-events-none" />

      {/* Category / Platform Header Tag */}
      <div className="w-full flex items-center justify-between z-10">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
          {platform || 'Digital Store'}
        </span>
        {getIcon()}
      </div>

      {/* Main Branding Initials / Badge */}
      <div className="my-auto z-10 flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 mb-2 border border-cyan-300/30">
          <span className="text-xl font-extrabold text-white tracking-wider">{initials}</span>
        </div>
        <h4 className="text-sm font-bold text-slate-100 line-clamp-2 max-w-[180px]">
          {name}
        </h4>
      </div>

      {/* Footer Tagline */}
      <div className="w-full pt-2 border-t border-slate-800/80 z-10 flex items-center justify-between text-[11px] text-slate-400">
        <span className="text-slate-400 uppercase tracking-wider text-[9px] font-medium">Dano Store</span>
        <span className="text-cyan-400/90 font-mono text-[10px] font-bold">100% Instant</span>
      </div>
    </div>
  );
}
