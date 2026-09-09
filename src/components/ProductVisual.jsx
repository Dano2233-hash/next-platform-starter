import React from 'react';
import { Gamepad2, Smartphone, CreditCard, Tv, Layers } from 'lucide-react';

export const ProductVisual = ({ title = 'Product', category = '', platform = '' }) => {
  const getInitials = (str) => {
    if (!str) return 'DS';
    const words = str.trim().split(/\s+/);
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const getCategoryIcon = () => {
    switch (category) {
      case 'mobile':
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'paid-games':
        return <Gamepad2 className="w-5 h-5 text-blue-400" />;
      case 'gift-cards':
        return <CreditCard className="w-5 h-5 text-purple-400" />;
      case 'subscriptions':
        return <Tv className="w-5 h-5 text-indigo-400" />;
      default:
        return <Layers className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#0a1224] to-[#0d071d] border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between select-none group">
      {/* Decorative Gaming Background Grid Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:12px_12px] opacity-30 pointer-events-none" />
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500" />

      {/* Top Bar with Platform Badge & Category Icon */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700/60 shadow-inner">
          {platform || 'DIGITAL'}
        </span>
        <div className="p-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50 backdrop-blur-xs">
          {getCategoryIcon()}
        </div>
      </div>

      {/* Center Initials Badge */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center py-2">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600/20 via-blue-600/30 to-purple-600/20 border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-950/40 group-hover:scale-105 transition-transform duration-300">
          <span className="text-xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-purple-300">
            {getInitials(title)}
          </span>
        </div>
      </div>

      {/* Bottom Title Bar */}
      <div className="relative z-10 text-center">
        <h4 className="text-xs font-semibold text-slate-200 line-clamp-1 group-hover:text-cyan-300 transition-colors">
          {title}
        </h4>
        <p className="text-[10px] text-slate-400 capitalize mt-0.5">
          {category ? category.replace('-', ' ') : 'Digital Store'}
        </p>
      </div>
    </div>
  );
};
