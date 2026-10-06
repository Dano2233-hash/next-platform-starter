import React from 'react';
import { Gamepad2, Smartphone, Monitor, CreditCard, Zap, Box } from 'lucide-react';

export const ProductVisual = ({ name, category, platform, type, className = '' }) => {
  const getInitials = (text) => {
    if (!text) return 'DS';
    const words = text.trim().split(/\s+/);
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const getPlatformIcon = (plt) => {
    switch (plt) {
      case 'Mobile':
        return <Smartphone className="w-4 h-4 text-cyan-400" />;
      case 'PC':
        return <Monitor className="w-4 h-4 text-blue-400" />;
      case 'PlayStation':
        return <Gamepad2 className="w-4 h-4 text-indigo-400" />;
      case 'Xbox':
        return <Box className="w-4 h-4 text-emerald-400" />;
      case 'Gift Card':
        return <CreditCard className="w-4 h-4 text-amber-400" />;
      default:
        return <Zap className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div
      className={`relative w-full h-48 rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 via-[#0a1128] to-[#120826] border border-slate-800 flex flex-col justify-between p-4 group-hover:border-cyan-500/50 transition-colors duration-300 ${className}`}
    >
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00e5ff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -left-8 -top-8 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Row */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 backdrop-blur-md">
          {getPlatformIcon(platform)}
          <span className="text-xs font-semibold text-slate-300">
            {platform || 'Digital'}
          </span>
        </div>
        {type && (
          <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-blue-500/10 text-cyan-400 border border-cyan-500/20">
            {type}
          </span>
        )}
      </div>

      {/* Center Initials Badge */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-purple-600/20 border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-950/50 group-hover:scale-105 transition-transform duration-300">
          <span className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-300">
            {getInitials(name)}
          </span>
        </div>
      </div>

      {/* Bottom Title & Category Footer */}
      <div className="relative z-10">
        <p className="text-xs font-semibold text-cyan-400/90 truncate uppercase tracking-wider mb-0.5">
          {category || 'Dano Store'}
        </p>
        <h4 className="text-sm font-bold text-slate-100 line-clamp-1 group-hover:text-cyan-300 transition-colors">
          {name || 'Digital Item'}
        </h4>
      </div>
    </div>
  );
};
