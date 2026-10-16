import React from 'react';
import { Gamepad2, Smartphone, Gift, Zap, ShieldCheck } from 'lucide-react';

export const ProductVisual = ({ name = 'Product', category = '', platform = '', className = '' }) => {
  const getInitials = (str) => {
    if (!str) return 'DS';
    const words = str.trim().split(' ');
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const getCategoryIcon = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'mobile-topups':
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'paid-games':
        return <Gamepad2 className="w-5 h-5 text-blue-400" />;
      case 'gift-cards':
        return <Gift className="w-5 h-5 text-purple-400" />;
      case 'subscriptions':
        return <Zap className="w-5 h-5 text-amber-400" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-slate-900 via-[#0d1527] to-[#151c33] border border-slate-800/80 rounded-xl flex flex-col justify-between p-4 selection:bg-none select-none ${className}`}
    >
      {/* Background Decorative Pattern */}
      <div className="absolute top-0 right-0 -mt-6 -mr-6 w-28 h-28 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-28 h-28 bg-purple-500/10 rounded-full blur-xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between z-10">
        <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 bg-slate-800/80 border border-slate-700/50 rounded-md text-cyan-400">
          {platform || 'Digital'}
        </span>
        <div className="p-1.5 bg-slate-800/60 rounded-lg border border-slate-700/40">
          {getCategoryIcon(category)}
        </div>
      </div>

      {/* Center Initials & Title Badge */}
      <div className="my-auto flex flex-col items-center justify-center text-center py-3 z-10">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-blue-600/20 to-purple-600/20 border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-950/30 mb-2">
          <span className="text-xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400">
            {getInitials(name)}
          </span>
        </div>
        <h4 className="text-sm font-bold text-slate-200 line-clamp-1 px-2">
          {name}
        </h4>
        <p className="text-[11px] text-slate-400 capitalize mt-0.5">
          {category ? category.replace('-', ' ') : 'Digital Code'}
        </p>
      </div>

      {/* Bottom Footer Branding */}
      <div className="flex items-center justify-between border-t border-slate-800/60 pt-2 z-10">
        <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Instant Delivery
        </span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          DANO STORE
        </span>
      </div>
    </div>
  );
};
