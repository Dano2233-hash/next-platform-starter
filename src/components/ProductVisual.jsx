import React from 'react';
import { Gamepad2, Smartphone, Gift, Sparkles, Monitor, Tv } from 'lucide-react';

export const ProductVisual = ({ title = 'Product', category = '', platform = '', className = '' }) => {
  const getInitials = (str) => {
    if (!str) return 'DS';
    const words = str.trim().split(' ');
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const getPlatformIcon = () => {
    const p = (platform || category || '').toLowerCase();
    if (p.includes('mobile')) return <Smartphone className="w-6 h-6 text-cyan-400" />;
    if (p.includes('xbox')) return <Gamepad2 className="w-6 h-6 text-emerald-400" />;
    if (p.includes('playstation')) return <Tv className="w-6 h-6 text-blue-400" />;
    if (p.includes('gift')) return <Gift className="w-6 h-6 text-purple-400" />;
    if (p.includes('sub')) return <Sparkles className="w-6 h-6 text-pink-400" />;
    return <Monitor className="w-6 h-6 text-cyan-400" />;
  };

  const initials = getInitials(title);

  return (
    <div
      className={`relative w-full h-full min-h-[180px] bg-gradient-to-br from-slate-900 via-[#0b1329] to-[#150d2a] p-5 flex flex-col justify-between overflow-hidden select-none border border-slate-800/80 rounded-xl ${className}`}
    >
      {/* Subtle background glowing orb */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between z-10">
        <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-slate-800/90 text-slate-300 rounded-md border border-slate-700/50 backdrop-blur-md">
          {platform || category || 'Digital'}
        </span>
        <div className="p-2 bg-slate-800/60 rounded-lg border border-slate-700/40">
          {getPlatformIcon()}
        </div>
      </div>

      {/* Center Initials Badge */}
      <div className="my-auto py-2 flex flex-col items-center justify-center z-10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-purple-600 flex items-center justify-center font-extrabold text-2xl text-white shadow-lg shadow-cyan-500/10 border border-white/10">
          {initials}
        </div>
      </div>

      {/* Bottom Title */}
      <div className="z-10 text-center">
        <h4 className="text-xs font-bold text-slate-200 line-clamp-1 group-hover:text-cyan-400 transition-colors">
          {title}
        </h4>
        <p className="text-[10px] text-slate-400 mt-0.5">Dano Digital Store</p>
      </div>
    </div>
  );
};

export default ProductVisual;
