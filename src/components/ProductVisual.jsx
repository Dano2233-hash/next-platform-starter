import React from 'react';
import { Gamepad2, Smartphone, Monitor, CreditCard, Sparkles, Box, Flame } from 'lucide-react';

export default function ProductVisual({ name = 'Digital Product', category = '', platform = '', className = 'h-48' }) {
  const getInitials = (str) => {
    if (!str) return 'DS';
    const words = str.trim().split(/\s+/);
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const getCategoryIcon = () => {
    const cat = (category || '').toLowerCase();
    const plat = (platform || '').toLowerCase();
    if (cat.includes('mobile') || plat.includes('mobile')) return <Smartphone className="w-8 h-8 text-cyan-400" />;
    if (cat.includes('pc') || plat.includes('pc')) return <Monitor className="w-8 h-8 text-blue-400" />;
    if (cat.includes('playstation') || plat.includes('playstation')) return <Gamepad2 className="w-8 h-8 text-indigo-400" />;
    if (cat.includes('xbox') || plat.includes('xbox')) return <Box className="w-8 h-8 text-emerald-400" />;
    if (cat.includes('gift') || plat.includes('gift')) return <CreditCard className="w-8 h-8 text-amber-400" />;
    if (cat.includes('sub') || plat.includes('digital')) return <Sparkles className="w-8 h-8 text-purple-400" />;
    return <Flame className="w-8 h-8 text-blue-400" />;
  };

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#090d16] border border-slate-800/80 rounded-t-xl flex flex-col justify-between p-4 select-none ${className}`}>
      {/* Decorative Grid Patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-[#0066ff]_1px,transparent_1px] [background-size:16px_16px]" />

      {/* Top bar with category & icon */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-700/50">
          {getCategoryIcon()}
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">{platform || category || 'Digital'}</span>
        </div>
        <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center font-bold text-white shadow-lg text-sm tracking-wider">
          {getInitials(name)}
        </div>
      </div>

      {/* Middle visual title */}
      <div className="relative z-10 my-auto text-center py-2">
        <h3 className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-cyan-300 drop-shadow line-clamp-2">
          {name}
        </h3>
        <span className="inline-block mt-1 text-[10px] font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded uppercase tracking-widest">
          DANO STORE DIGITAL
        </span>
      </div>

      {/* Bottom accent glow */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/60 pt-2">
        <span className="flex items-center gap-1 font-medium text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Instant Delivery
        </span>
        <span className="font-semibold text-blue-400">100% Verified</span>
      </div>
    </div>
  );
}
