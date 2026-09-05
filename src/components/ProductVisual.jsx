import React from 'react';
import { Gamepad2, Smartphone, CreditCard, Zap, ShieldAlert } from 'lucide-react';

export const ProductVisual = ({ name = 'Product', category = '', platform = '', className = '' }) => {
  // Generate 2 letter initials
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'DS';

  const getCategoryIcon = () => {
    switch (category) {
      case 'mobile-topups':
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'paid-games':
        return <Gamepad2 className="w-5 h-5 text-blue-400" />;
      case 'gift-cards':
        return <CreditCard className="w-5 h-5 text-purple-400" />;
      case 'subscriptions':
        return <Zap className="w-5 h-5 text-amber-400" />;
      default:
        return <Gamepad2 className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div
      className={`relative w-full h-full min-h-[180px] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 flex flex-col items-center justify-between p-4 overflow-hidden select-none border border-slate-800/80 rounded-t-xl group-hover:border-cyan-500/40 transition-colors ${className}`}
    >
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-purple-600/10 opacity-70"></div>
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>
      <div className="absolute -left-8 -top-8 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>

      {/* Top Header Bar inside card */}
      <div className="relative z-10 w-full flex items-center justify-between text-xs text-slate-400 font-medium">
        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-950/60 border border-slate-700/50 backdrop-blur-md">
          {getCategoryIcon()}
          <span className="capitalize">{category ? category.replace('-', ' ') : 'Digital'}</span>
        </span>
        {platform && (
          <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-[11px] font-semibold tracking-wide">
            {platform}
          </span>
        )}
      </div>

      {/* Central Emblem & Initials */}
      <div className="relative z-10 my-auto flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-cyan-500/20 tracking-wider mb-2 border border-cyan-300/30 group-hover:scale-105 transition-transform">
          {initials}
        </div>
        <h4 className="text-sm font-bold text-slate-100 line-clamp-2 max-w-[90%] leading-tight">
          {name}
        </h4>
      </div>

      {/* Bottom Footer Tag */}
      <div className="relative z-10 w-full text-center">
        <span className="inline-block text-[10px] uppercase tracking-widest text-slate-400 font-semibold bg-slate-900/80 px-2.5 py-0.5 rounded-full border border-slate-800">
          Official Digital Code
        </span>
      </div>
    </div>
  );
};
