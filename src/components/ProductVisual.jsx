import React from 'react';
import { Gamepad2, Smartphone, Monitor, Tv, Zap, CreditCard } from 'lucide-react';

export default function ProductVisual({ name, category, platform }) {
  const initials = name
    ? name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((n) => n[0].toUpperCase())
        .join('')
    : 'DS';

  const getPlatformIcon = () => {
    switch (platform?.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="w-6 h-6 text-cyan-400" />;
      case 'pc':
        return <Monitor className="w-6 h-6 text-blue-400" />;
      case 'xbox':
        return <Tv className="w-6 h-6 text-green-400" />;
      case 'playstation':
        return <Gamepad2 className="w-6 h-6 text-indigo-400" />;
      case 'gift card':
        return <CreditCard className="w-6 h-6 text-amber-400" />;
      default:
        return <Zap className="w-6 h-6 text-purple-400" />;
    }
  };

  return (
    <div className="w-full h-full min-h-[160px] bg-gradient-to-br from-[#0b1329] via-[#090d16] to-[#140b29] flex flex-col items-center justify-center p-4 text-center relative overflow-hidden group border border-slate-800/60 rounded-t-xl select-none">
      {/* Background ambient lighting */}
      <div className="absolute -top-10 -left-10 w-28 h-28 bg-blue-600/10 rounded-full blur-xl group-hover:bg-blue-600/20 transition-all duration-500"></div>
      <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-purple-600/10 rounded-full blur-xl group-hover:bg-purple-600/20 transition-all duration-500"></div>

      {/* Main visual badge */}
      <div className="w-14 h-14 rounded-2xl bg-slate-900/90 border border-slate-700/60 flex items-center justify-center shadow-lg mb-3 relative z-10 group-hover:scale-105 transition-transform duration-300">
        <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">
          {initials}
        </span>
      </div>

      {/* Title preview */}
      <div className="text-xs font-semibold text-slate-300 line-clamp-1 max-w-[90%] relative z-10 mb-1">
        {name}
      </div>

      {/* Meta tags */}
      <div className="flex items-center gap-1.5 relative z-10 text-[10px] text-slate-400">
        {getPlatformIcon()}
        <span className="uppercase tracking-wider font-semibold text-slate-400">{platform || 'Digital'}</span>
      </div>
    </div>
  );
}
