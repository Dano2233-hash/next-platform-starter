import React from 'react';
import { Gamepad2, Smartphone, Gift, Zap, Monitor, Box, Tv } from 'lucide-react';

export default function ProductVisual({ name, category, platform, type, className = "h-48" }) {
  const getInitials = (text) => {
    if (!text) return 'DS';
    return text
      .split(' ')
      .map((w) => w[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const getCategoryIcon = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'mobile-topups':
      case 'mobile':
        return <Smartphone className="w-8 h-8 text-cyan-400" />;
      case 'gift-cards':
      case 'gift card':
        return <Gift className="w-8 h-8 text-purple-400" />;
      case 'subscriptions':
        return <Zap className="w-8 h-8 text-amber-400" />;
      case 'xbox':
        return <Box className="w-8 h-8 text-emerald-400" />;
      case 'playstation':
        return <Tv className="w-8 h-8 text-blue-400" />;
      default:
        return <Gamepad2 className="w-8 h-8 text-cyan-400" />;
    }
  };

  const initials = getInitials(name);

  return (
    <div
      className={`relative w-full ${className} rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 via-[#0a1228] to-[#120a2a] p-4 flex flex-col justify-between border border-cyan-500/20 shadow-lg group-hover:border-cyan-500/40 transition-all duration-300`}
    >
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,229,255,0.12),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(112,0,255,0.15),transparent_50%)] pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-1.5 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700/50">
          {getCategoryIcon(category)}
          <span className="text-[11px] font-semibold tracking-wide uppercase text-slate-300 ml-1">
            {platform || category || 'Gaming'}
          </span>
        </div>
        <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-black text-slate-950 text-sm shadow-md">
          {initials}
        </div>
      </div>

      {/* Middle Graphic Banner */}
      <div className="relative z-10 my-2 flex flex-col items-center justify-center text-center">
        <h4 className="text-base font-bold text-white tracking-wide line-clamp-1 drop-shadow-md">
          {name}
        </h4>
        <span className="text-xs text-cyan-300/80 font-medium mt-0.5 uppercase tracking-wider">
          {type || 'Digital Item'}
        </span>
      </div>

      {/* Bottom Sub-tag */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
        <span className="font-semibold text-cyan-400">Dano Store Official</span>
        <span className="text-slate-500">100% Guaranteed</span>
      </div>
    </div>
  );
}
