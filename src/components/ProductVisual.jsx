import React from 'react';
import { Gamepad2, Smartphone, Monitor, CreditCard, Sparkles, Box } from 'lucide-react';

export const ProductVisual = ({ name = 'Product', category = '', platform = '' }) => {
  const getInitials = (str) => {
    if (!str) return 'DS';
    const words = str.split(' ').filter(Boolean);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return str.slice(0, 2).toUpperCase();
  };

  const getPlatformIcon = (plat) => {
    const p = (plat || '').toLowerCase();
    if (p.includes('mobile')) return <Smartphone className="w-5 h-5" />;
    if (p.includes('pc')) return <Monitor className="w-5 h-5" />;
    if (p.includes('xbox')) return <Box className="w-5 h-5" />;
    if (p.includes('playstation')) return <Gamepad2 className="w-5 h-5" />;
    if (p.includes('gift')) return <CreditCard className="w-5 h-5" />;
    return <Sparkles className="w-5 h-5" />;
  };

  return (
    <div className="w-full h-full min-h-[180px] bg-gradient-to-br from-[#0c1333] via-[#091b42] to-[#040817] p-4 flex flex-col justify-between relative overflow-hidden group select-none">
      {/* Background glowing shapes */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-blue-600/20 transition-all duration-500"></div>

      {/* Top bar with platform badge */}
      <div className="flex justify-between items-center z-10">
        <span className="text-[10px] font-bold tracking-wider uppercase bg-blue-950/80 text-cyan-400 px-2.5 py-1 rounded-md border border-cyan-500/20 backdrop-blur-sm">
          {category || 'Digital Service'}
        </span>
        <div className="text-cyan-400/80 p-1 bg-cyan-950/30 rounded-md border border-cyan-500/20">
          {getPlatformIcon(platform)}
        </div>
      </div>

      {/* Center Initials Badge */}
      <div className="my-auto flex flex-col items-center justify-center z-10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[1px] shadow-lg shadow-cyan-500/10 group-hover:shadow-cyan-500/30 transition-all duration-300">
          <div className="w-full h-full bg-[#070d24] rounded-[15px] flex items-center justify-center">
            <span className="text-xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {getInitials(name)}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom text info */}
      <div className="z-10 text-center">
        <div className="text-xs font-semibold text-slate-300 truncate max-w-full px-2">
          {name}
        </div>
        <span className="text-[10px] text-cyan-400/60 font-mono tracking-wider uppercase">
          {platform || 'Digital Code'}
        </span>
      </div>
    </div>
  );
};
