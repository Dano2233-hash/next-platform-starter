import React from 'react';
import { Gamepad2, Shield, Sparkles, Smartphone, Gift, Monitor, Tv, Layers } from 'lucide-react';

const getCategoryIcon = (category, platform) => {
  const cat = (category || '').toLowerCase();
  const plat = (platform || '').toLowerCase();

  if (plat.includes('xbox') || cat.includes('xbox')) return <Gamepad2 className="w-8 h-8 text-green-400" />;
  if (plat.includes('playstation') || cat.includes('playstation')) return <Tv className="w-8 h-8 text-blue-400" />;
  if (plat.includes('pc') || cat.includes('pc')) return <Monitor className="w-8 h-8 text-cyan-400" />;
  if (plat.includes('mobile') || cat.includes('mobile')) return <Smartphone className="w-8 h-8 text-purple-400" />;
  if (plat.includes('gift') || cat.includes('gift')) return <Gift className="w-8 h-8 text-pink-400" />;
  if (cat.includes('subscription')) return <Sparkles className="w-8 h-8 text-amber-400" />;
  return <Layers className="w-8 h-8 text-blue-400" />;
};

const getCategoryGradient = (category) => {
  const cat = (category || '').toLowerCase();
  if (cat.includes('xbox')) return 'from-emerald-950 via-slate-900 to-green-950 border-green-500/20';
  if (cat.includes('playstation')) return 'from-blue-950 via-slate-900 to-indigo-950 border-blue-500/20';
  if (cat.includes('mobile')) return 'from-purple-950 via-slate-900 to-fuchsia-950 border-purple-500/20';
  if (cat.includes('gift')) return 'from-pink-950 via-slate-900 to-rose-950 border-pink-500/20';
  if (cat.includes('subscription')) return 'from-amber-950 via-slate-900 to-orange-950 border-amber-500/20';
  return 'from-slate-900 via-blue-950 to-cyan-950 border-cyan-500/20';
};

export const ProductVisual = ({ name, category, platform }) => {
  const initials = (name || 'DS')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  const gradientClass = getCategoryGradient(category);

  return (
    <div
      className={`w-full h-full min-h-[190px] bg-gradient-to-br ${gradientClass} border relative overflow-hidden flex flex-col justify-between p-4 rounded-t-xl select-none group-hover:scale-[1.02] transition-transform duration-300`}
    >
      {/* Background Accent Mesh */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[11px] font-semibold text-slate-300">
          <Shield className="w-3 h-3 text-cyan-400" />
          <span>{platform || 'Digital'}</span>
        </div>
        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs text-cyan-300 shadow-inner">
          {initials}
        </div>
      </div>

      {/* Center Icon & Title */}
      <div className="flex flex-col items-center justify-center text-center my-auto z-10 py-2">
        <div className="p-3 bg-slate-950/60 rounded-2xl border border-white/10 shadow-lg mb-2 group-hover:border-cyan-500/30 transition-colors">
          {getCategoryIcon(category, platform)}
        </div>
        <h4 className="font-extrabold text-sm text-slate-100 line-clamp-2 leading-snug px-1 max-w-[90%]">
          {name}
        </h4>
      </div>

      {/* Bottom Footer Tag */}
      <div className="flex items-center justify-between z-10 pt-2 border-t border-white/5">
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
          {category || 'Digital Store'}
        </span>
        <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
          INSTANT DELIVERY
        </span>
      </div>
    </div>
  );
};

export default ProductVisual;
