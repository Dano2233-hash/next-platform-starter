import React from 'react';
import { Gamepad2, Smartphone, Monitor, CreditCard, Zap } from 'lucide-react';

const ProductVisual = ({ name = 'Gaming Product', category = 'games', platform = 'PC' }) => {
  // Generate initials
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  const getCategoryIcon = () => {
    switch (category?.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'gift-cards':
        return <CreditCard className="w-5 h-5 text-amber-400" />;
      case 'subscriptions':
        return <Zap className="w-5 h-5 text-purple-400" />;
      case 'games':
      default:
        return <Monitor className="w-5 h-5 text-blue-400" />;
    }
  };

  const getGradient = () => {
    switch (category?.toLowerCase()) {
      case 'mobile':
        return 'from-slate-900 via-cyan-950/80 to-blue-950 border-cyan-500/30';
      case 'gift-cards':
        return 'from-slate-900 via-amber-950/80 to-orange-950 border-amber-500/30';
      case 'subscriptions':
        return 'from-slate-900 via-purple-950/80 to-indigo-950 border-purple-500/30';
      case 'games':
      default:
        return 'from-slate-900 via-blue-950/80 to-cyan-950 border-blue-500/30';
    }
  };

  return (
    <div
      className={`relative w-full h-full min-h-[160px] bg-gradient-to-br ${getGradient()} border rounded-xl flex flex-col justify-between p-4 overflow-hidden select-none group`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl"></div>

      {/* Grid line pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d0f_1px,transparent_1px),linear-gradient(to_bottom,#1f293d0f_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>

      {/* Top row: Platform badge and Icon */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-950/80 border border-slate-700/80 text-slate-300 backdrop-blur-sm">
          {platform}
        </span>
        <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-700/50 shadow-inner">
          {getCategoryIcon()}
        </div>
      </div>

      {/* Middle: Initials Badge */}
      <div className="relative z-10 my-auto flex items-center justify-center py-2">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center font-extrabold text-xl text-white shadow-lg shadow-blue-500/20 border border-cyan-300/30 tracking-wider">
          {initials || 'DS'}
        </div>
      </div>

      {/* Bottom: Product title */}
      <div className="relative z-10 mt-1">
        <h3 className="text-sm font-bold text-slate-100 line-clamp-1 group-hover:text-cyan-400 transition-colors">
          {name}
        </h3>
        <p className="text-[11px] text-slate-400 font-medium capitalize tracking-wide">
          {category.replace('-', ' ')} Digital Edition
        </p>
      </div>
    </div>
  );
};

export default ProductVisual;
