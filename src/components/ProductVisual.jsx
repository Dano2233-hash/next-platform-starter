import React from 'react';
import { Gamepad2, Smartphone, Gift, Sparkles, CreditCard, ShieldCheck } from 'lucide-react';

export default function ProductVisual({ name = 'Digital Item', category = 'Gaming', platform = 'PC', type = 'Game', className = '' }) {
  // Extract initials (e.g., PUBG Mobile UC -> PMU)
  const getInitials = (text) => {
    if (!text) return 'DS';
    const words = text.trim().split(/\s+/);
    if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
    return words.slice(0, 3).map(w => w[0]).join('').toUpperCase();
  };

  const getPlatformIcon = (plat) => {
    const p = String(plat).toLowerCase();
    if (p.includes('mobile')) return <Smartphone className="w-5 h-5 text-cyan-400" />;
    if (p.includes('gift')) return <Gift className="w-5 h-5 text-amber-400" />;
    if (p.includes('sub')) return <CreditCard className="w-5 h-5 text-purple-400" />;
    return <Gamepad2 className="w-5 h-5 text-blue-400" />;
  };

  return (
    <div className={`relative w-full h-full bg-gradient-to-br from-slate-900 via-indigo-950/80 to-slate-950 flex flex-col justify-between p-4 overflow-hidden border border-slate-800/80 rounded-xl group ${className}`}>
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,229,255,0.15),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(112,0,255,0.12),transparent_50%)] pointer-events-none" />
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />

      {/* Top Header Row */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900/80 border border-slate-700/60 rounded-md backdrop-blur-md">
          {getPlatformIcon(platform)}
          <span className="text-[11px] font-semibold tracking-wider text-slate-300 uppercase">{platform}</span>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
          {type || 'Digital'}
        </span>
      </div>

      {/* Center Main Visual Badges */}
      <div className="relative z-10 flex flex-col items-center justify-center my-3">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-300 font-extrabold text-lg font-heading tracking-wider">
            {getInitials(name)}
          </div>
        </div>
      </div>

      {/* Bottom Name & Category Info */}
      <div className="relative z-10 text-left">
        <span className="text-[10px] font-medium tracking-wide text-cyan-400 uppercase block mb-0.5">
          {category ? category.replace('-', ' ') : 'Digital Store'}
        </span>
        <h4 className="text-xs font-bold text-slate-100 line-clamp-1 group-hover:text-cyan-300 transition-colors">
          {name}
        </h4>
      </div>
    </div>
  );
}
