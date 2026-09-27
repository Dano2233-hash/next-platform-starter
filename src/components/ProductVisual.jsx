import React from 'react';
import { Gamepad2, Smartphone, Monitor, Box, Zap, CreditCard } from 'lucide-react';

export default function ProductVisual({ name, category, platform, type, className = '' }) {
  const getInitials = (text) => {
    if (!text) return 'DS';
    const words = text.split(' ').filter(Boolean);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return text.slice(0, 2).toUpperCase();
  };

  const getCategoryIcon = () => {
    const cat = (category || '').toLowerCase();
    const plat = (platform || '').toLowerCase();

    if (plat.includes('mobile') || cat.includes('mobile')) return <Smartphone className="w-6 h-6" />;
    if (plat.includes('xbox') || cat.includes('xbox')) return <Box className="w-6 h-6" />;
    if (plat.includes('playstation') || cat.includes('playstation')) return <Gamepad2 className="w-6 h-6" />;
    if (cat.includes('subscription')) return <Zap className="w-6 h-6" />;
    if (cat.includes('gift')) return <CreditCard className="w-6 h-6" />;
    return <Monitor className="w-6 h-6" />;
  };

  const initials = getInitials(name);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 flex flex-col justify-between p-4 border border-blue-900/40 rounded-xl select-none ${className}`}>
      {/* Background glow & subtle pattern */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-blue-600/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

      {/* Top Header Row */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-950/80 border border-blue-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
          {getCategoryIcon()}
          <span>{platform || 'Digital'}</span>
        </div>
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800">
          {type || 'Service'}
        </span>
      </div>

      {/* Center Initials Badge */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1px] shadow-lg shadow-blue-500/20 mb-3 group-hover:scale-105 transition-transform duration-300">
          <div className="w-full h-full bg-slate-950/90 rounded-[15px] flex items-center justify-center text-xl font-extrabold text-cyan-300 tracking-wider">
            {initials}
          </div>
        </div>
        <h4 className="text-sm font-bold text-slate-100 line-clamp-2 max-w-[90%] leading-tight">
          {name}
        </h4>
      </div>

      {/* Footer / Store Watermark */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-semibold text-slate-400 border-t border-slate-800/80 pt-2 mt-2">
        <span className="text-cyan-400 font-bold tracking-wider uppercase">Dano Store</span>
        <span className="text-slate-500">Official Digital Key</span>
      </div>
    </div>
  );
}
