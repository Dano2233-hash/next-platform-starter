import React from 'react';
import { Gamepad2, Smartphone, Monitor, Box, CreditCard, Zap } from 'lucide-react';

export const ProductVisual = ({ product, heightClass = 'h-48' }) => {
  const name = product?.name || 'Digital Product';
  const category = product?.category || 'Gaming';
  const platform = product?.platform || 'Multi';

  // Get initials (up to 2 letters)
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .substring(0, 3)
    .toUpperCase();

  // Dynamic gradient themes based on category/platform
  const getGradient = () => {
    const cat = category.toLowerCase();
    const plat = platform.toLowerCase();

    if (plat.includes('xbox')) return 'from-emerald-950 via-slate-900 to-teal-950 border-emerald-500/30';
    if (plat.includes('playstation')) return 'from-blue-950 via-slate-900 to-indigo-950 border-blue-500/30';
    if (cat.includes('mobile')) return 'from-cyan-950 via-slate-900 to-blue-950 border-cyan-500/30';
    if (cat.includes('gift')) return 'from-fuchsia-950 via-slate-900 to-purple-950 border-fuchsia-500/30';
    if (cat.includes('sub')) return 'from-purple-950 via-slate-900 to-indigo-950 border-purple-500/30';
    return 'from-blue-950 via-slate-900 to-cyan-950 border-cyan-500/30';
  };

  const renderIcon = () => {
    const plat = platform.toLowerCase();
    if (plat.includes('mobile')) return <Smartphone className="w-5 h-5 text-cyan-400" />;
    if (plat.includes('xbox')) return <Box className="w-5 h-5 text-emerald-400" />;
    if (plat.includes('playstation')) return <Gamepad2 className="w-5 h-5 text-blue-400" />;
    if (plat.includes('pc')) return <Monitor className="w-5 h-5 text-cyan-400" />;
    if (platform.includes('Gift')) return <CreditCard className="w-5 h-5 text-fuchsia-400" />;
    return <Zap className="w-5 h-5 text-purple-400" />;
  };

  return (
    <div
      className={`relative w-full ${heightClass} bg-gradient-to-br ${getGradient()} rounded-t-xl overflow-hidden flex flex-col justify-between p-4 border-b select-none group-hover:scale-[1.02] transition-transform duration-300`}
    >
      {/* Subtle Background Pattern Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,229,255,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Bar: Icon & Category */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700/50 text-xs font-semibold text-slate-300 backdrop-blur-md">
          {renderIcon()}
          <span>{platform}</span>
        </div>
        <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/30 text-cyan-300">
          {category}
        </span>
      </div>

      {/* Center: Initials Badge & Name */}
      <div className="relative z-10 my-auto text-center flex flex-col items-center justify-center">
        <div className="w-12 h-12 mb-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-slate-950 text-lg shadow-lg shadow-cyan-500/20 tracking-wider">
          {initials}
        </div>
        <h3 className="font-extrabold text-sm text-slate-100 line-clamp-1 max-w-[90%] tracking-wide drop-shadow-md">
          {name}
        </h3>
      </div>

      {/* Bottom Bar: Digital Tag */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 font-medium pt-1 border-t border-slate-800/60">
        <span>DANO DIGITAL</span>
        <span className="text-cyan-400 font-semibold uppercase tracking-wider">Verified</span>
      </div>
    </div>
  );
};
