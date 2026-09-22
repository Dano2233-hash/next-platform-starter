import React from 'react';
import { Gamepad2, ShieldCheck, Sparkles, Smartphone, Monitor, Tv, Gift } from 'lucide-react';

export default function ProductVisual({ product, heightClass = 'h-48' }) {
  const name = product?.name || 'Digital Item';
  const category = product?.category || 'Gaming';
  const platform = product?.platform || 'Global';

  // Extract initials (up to 2-3 characters)
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 3)
    .join('')
    .toUpperCase();

  const getPlatformIcon = () => {
    switch (platform?.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="w-4 h-4 text-cyan-400" />;
      case 'pc':
        return <Monitor className="w-4 h-4 text-blue-400" />;
      case 'playstation':
      case 'xbox':
        return <Tv className="w-4 h-4 text-purple-400" />;
      case 'gift card':
        return <Gift className="w-4 h-4 text-amber-400" />;
      default:
        return <Gamepad2 className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div
      className={`relative ${heightClass} w-full overflow-hidden bg-gradient-to-br from-[#0c1322] via-[#101b35] to-[#1a0f35] border border-cyan-500/20 rounded-t-xl flex flex-col justify-between p-4 group select-none`}
    >
      {/* Background ambient lighting */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-300 pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl group-hover:bg-purple-600/20 transition-all duration-300 pointer-events-none" />

      {/* Top badges bar */}
      <div className="flex items-center justify-between z-10 w-full">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-slate-900/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
          {getPlatformIcon()}
          {platform}
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded-md border border-slate-700/50">
          <ShieldCheck className="w-3 h-3 text-cyan-400" />
          Official Code
        </span>
      </div>

      {/* Center Initials Hero Graphic */}
      <div className="my-auto text-center z-10 flex flex-col items-center justify-center py-2">
        <div className="relative mb-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600/30 to-purple-600/30 border border-cyan-400/40 flex items-center justify-center shadow-lg shadow-cyan-950/50 group-hover:scale-105 transition-transform duration-300">
            <span className="text-xl font-black tracking-wider bg-gradient-to-r from-cyan-300 via-blue-200 to-purple-300 bg-clip-text text-transparent">
              {initials}
            </span>
          </div>
          <Sparkles className="w-4 h-4 text-cyan-400 absolute -top-1 -right-1 animate-pulse" />
        </div>
        <h4 className="text-xs font-bold text-slate-200 line-clamp-1 max-w-[85%] uppercase tracking-wider">
          {name}
        </h4>
      </div>

      {/* Bottom Category Tag */}
      <div className="z-10 flex items-center justify-between border-t border-slate-800/80 pt-2 text-[11px] text-slate-400">
        <span className="font-mono text-cyan-400/90 capitalize">{category}</span>
        <span className="text-slate-500 text-[10px]">Instant Delivery</span>
      </div>
    </div>
  );
}
