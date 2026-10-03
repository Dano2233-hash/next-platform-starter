import React from 'react';
import { Gamepad2, Smartphone, Gift, Sparkles, Monitor } from 'lucide-react';

export const ProductVisual = ({ name, category, platform }) => {
  const getInitials = (str) => {
    if (!str) return 'DS';
    return str
      .split(' ')
      .filter(Boolean)
      .map((word) => word[0])
      .join('')
      .substring(0, 3)
      .toUpperCase();
  };

  const getIcon = () => {
    switch (platform) {
      case 'PC':
        return <Monitor className="w-8 h-8 text-cyan-400" />;
      case 'Mobile':
        return <Smartphone className="w-8 h-8 text-cyan-400" />;
      case 'Gift Card':
        return <Gift className="w-8 h-8 text-purple-400" />;
      default:
        if (category === 'subscriptions') return <Sparkles className="w-8 h-8 text-purple-400" />;
        return <Gamepad2 className="w-8 h-8 text-blue-400" />;
    }
  };

  return (
    <div className="w-full h-full min-h-[160px] bg-gradient-to-br from-[#0c1329] via-[#091536] to-[#040817] flex flex-col items-center justify-center p-4 relative overflow-hidden group select-none border border-slate-800/80 rounded-lg">
      {/* Background Decorative Rings */}
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all duration-300 pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-blue-600/10 rounded-full blur-xl group-hover:bg-blue-600/20 transition-all duration-300 pointer-events-none" />

      {/* Main Icon & Initials */}
      <div className="z-10 flex flex-col items-center text-center space-y-2">
        <div className="w-12 h-12 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
          {getIcon()}
        </div>
        <span className="text-xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 uppercase">
          {getInitials(name)}
        </span>
        <span className="text-xs font-semibold text-slate-300 line-clamp-1 max-w-[180px]">
          {name || 'Digital Game'}
        </span>
      </div>

      {/* Footer Badges */}
      <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-[10px] font-medium text-slate-400 px-1">
        <span className="bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800 text-cyan-400">
          {platform || 'Digital'}
        </span>
        <span className="bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800 text-purple-400">
          {category || 'Store'}
        </span>
      </div>
    </div>
  );
};
