import React from 'react';
import { Gamepad2, Smartphone, Monitor, Tv, CreditCard, Sparkles, ShieldCheck } from 'lucide-react';

export const ProductVisual = ({ name = 'Gaming Item', category = 'Digital', platform = 'PC' }) => {
  // Get initials for badge
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  // Choose icon based on platform or category
  const getIcon = () => {
    const p = (platform || '').toLowerCase();
    const c = (category || '').toLowerCase();
    if (p.includes('mobile') || c.includes('mobile')) return <Smartphone className="w-8 h-8 text-cyan-400" />;
    if (p.includes('xbox') || c.includes('xbox')) return <Gamepad2 className="w-8 h-8 text-emerald-400" />;
    if (p.includes('playstation') || c.includes('playstation')) return <Tv className="w-8 h-8 text-blue-400" />;
    if (p.includes('card') || c.includes('card')) return <CreditCard className="w-8 h-8 text-purple-400" />;
    if (c.includes('sub')) return <Sparkles className="w-8 h-8 text-amber-400" />;
    return <Monitor className="w-8 h-8 text-cyan-400" />;
  };

  return (
    <div className="w-full h-full min-h-[190px] bg-gradient-to-br from-[#0c1329] via-[#090d1a] to-[#120e2e] relative overflow-hidden flex flex-col justify-between p-4 border border-cyan-500/10 group-hover:border-cyan-500/30 transition-all duration-300 select-none">
      {/* Background Decorative Pattern */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:12px_12px] opacity-20" />

      {/* Top Bar: Platform & Initials Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-slate-900/80 border border-slate-700/60 rounded-md text-slate-300 backdrop-blur-md">
          {platform || 'DIGITAL'}
        </span>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 flex items-center justify-center font-extrabold text-xs text-cyan-300 shadow-sm">
          {initials || 'DS'}
        </div>
      </div>

      {/* Middle: Icon & Product Name */}
      <div className="relative z-10 my-auto py-2 flex flex-col items-center text-center">
        <div className="p-3 mb-2 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-inner group-hover:scale-110 transition-transform duration-300">
          {getIcon()}
        </div>
        <h4 className="font-bold text-sm text-slate-100 line-clamp-1 group-hover:text-cyan-400 transition-colors">
          {name}
        </h4>
        <span className="text-[11px] text-slate-400 font-medium">
          {category || 'Digital Store Item'}
        </span>
      </div>

      {/* Bottom Bar: Trust badge */}
      <div className="relative z-10 flex items-center justify-between border-t border-slate-800/80 pt-2 text-[10px] text-slate-400 font-medium">
        <div className="flex items-center gap-1 text-cyan-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verified Code</span>
        </div>
        <span className="text-slate-500 uppercase tracking-widest text-[9px]">Dano Store</span>
      </div>
    </div>
  );
};
