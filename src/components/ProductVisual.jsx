import React from 'react';
import { Gamepad2, Sparkles, CreditCard, Monitor, Smartphone } from 'lucide-react';

export const ProductVisual = ({ name = 'Product', category = '', platform = '' }) => {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase() || 'DS';

  const getPlatformIcon = (plat) => {
    const p = (plat || '').toLowerCase();
    if (p.includes('xbox') || p.includes('playstation') || p.includes('game')) return <Gamepad2 className="w-5 h-5 text-cyan-400" />;
    if (p.includes('mobile')) return <Smartphone className="w-5 h-5 text-purple-400" />;
    if (p.includes('gift')) return <CreditCard className="w-5 h-5 text-blue-400" />;
    if (p.includes('sub')) return <Sparkles className="w-5 h-5 text-amber-400" />;
    return <Monitor className="w-5 h-5 text-cyan-400" />;
  };

  return (
    <div className="w-full h-full min-h-[180px] bg-gradient-to-br from-[#0c1427] via-[#111c38] to-[#080d1a] border border-slate-800/80 rounded-lg p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-cyan-500/50 transition-all duration-300 select-none">
      {/* Subtle background glow circle */}
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
      <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>

      {/* Top row */}
      <div className="flex items-center justify-between z-10">
        <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded">
          {category || 'Digital'}
        </span>
        <div className="p-1.5 rounded-md bg-slate-900/80 border border-slate-800">
          {getPlatformIcon(platform)}
        </div>
      </div>

      {/* Center Initials Badge */}
      <div className="my-auto text-center z-10 py-2">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-slate-950 font-black text-2xl shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
          {initials}
        </div>
      </div>

      {/* Bottom title & platform label */}
      <div className="z-10 text-center">
        <p className="text-xs font-semibold text-slate-200 line-clamp-1">{name}</p>
        <span className="text-[11px] text-slate-400">{platform || 'Instant Delivery'}</span>
      </div>
    </div>
  );
};

export default ProductVisual;
