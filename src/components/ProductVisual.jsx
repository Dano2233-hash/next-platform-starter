import React from 'react';
import { Gamepad2, Smartphone, Monitor, Tv, CreditCard, Zap, Sparkles } from 'lucide-react';

export const ProductVisual = ({ title = 'Product', category = '', platform = 'Digital' }) => {
  // Get initials (up to 2 letters)
  const getInitials = (str) => {
    if (!str) return 'DS';
    const words = str.trim().split(/\s+/);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return str.substring(0, 2).toUpperCase();
  };

  const initials = getInitials(title);

  // Pick category/platform icon
  const getIcon = () => {
    const p = (platform || category || '').toLowerCase();
    if (p.includes('mobile')) return <Smartphone className="w-5 h-5 text-cyan-400" />;
    if (p.includes('pc')) return <Monitor className="w-5 h-5 text-blue-400" />;
    if (p.includes('xbox')) return <Gamepad2 className="w-5 h-5 text-emerald-400" />;
    if (p.includes('playstation') || p.includes('tv')) return <Tv className="w-5 h-5 text-indigo-400" />;
    if (p.includes('card') || p.includes('gift')) return <CreditCard className="w-5 h-5 text-purple-400" />;
    if (p.includes('sub')) return <Zap className="w-5 h-5 text-amber-400" />;
    return <Sparkles className="w-5 h-5 text-cyan-400" />;
  };

  return (
    <div className="relative w-full h-full min-h-[180px] bg-gradient-to-br from-[#0c1226] via-[#101836] to-[#0a0e1c] p-4 flex flex-col justify-between overflow-hidden group select-none border border-cyan-500/10 rounded-t-xl">
      {/* Subtle Background Glow Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,229,255,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(112,0,255,0.08),transparent_50%)]" />

      {/* Top Bar: Platform & Category Icon */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-900/80 border border-slate-700/60 text-slate-300 backdrop-blur-md">
          {getIcon()}
          <span>{platform || 'Digital Service'}</span>
        </span>
        <span className="text-[10px] uppercase tracking-wider text-cyan-400 font-extrabold bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/20">
          DANO STORE
        </span>
      </div>

      {/* Center Initials Badge */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center py-2">
        <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/10 group-hover:scale-105 transition-transform duration-300">
          <div className="w-full h-full bg-[#090d1a] rounded-[15px] flex items-center justify-center">
            <span className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              {initials}
            </span>
          </div>
        </div>
        <h4 className="mt-3 text-sm font-bold text-center text-slate-100 line-clamp-1 group-hover:text-cyan-300 transition-colors">
          {title}
        </h4>
      </div>

      {/* Bottom Detail Pill */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800/80">
        <span className="text-[11px] text-slate-400 truncate max-w-[150px]">
          {category ? category.toUpperCase() : 'DIGITAL ITEM'}
        </span>
        <span className="text-[10px] font-medium text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
          INSTANT DELIVERY
        </span>
      </div>
    </div>
  );
};

export default ProductVisual;
