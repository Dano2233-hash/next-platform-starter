import React from 'react';
import { Gamepad2, ShieldCheck, Zap, Sparkles, Smartphone, Gift, Layers } from 'lucide-react';

export function ProductVisual({ name, category, platform, type, className = '' }) {
  // Extract initials for product badge (e.g., PUBG Mobile UC -> PM, GTA V -> GT)
  const getInitials = (text) => {
    if (!text) return 'DS';
    const words = text.trim().split(/\s+/);
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const initials = getInitials(name);

  // Platform icon chooser
  const getPlatformIcon = () => {
    switch (platform?.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="w-4 h-4 text-cyan-400" />;
      case 'gift cards':
      case 'gift card':
        return <Gift className="w-4 h-4 text-purple-400" />;
      default:
        return <Gamepad2 className="w-4 h-4 text-blue-400" />;
    }
  };

  // Select dynamic gradient variant based on initials hash
  const getGradientClass = () => {
    const charCode = (name || '').charCodeAt(0) || 0;
    const variants = [
      'from-slate-900 via-blue-950/80 to-cyan-950/90 border-cyan-500/30',
      'from-slate-900 via-purple-950/80 to-indigo-950/90 border-purple-500/30',
      'from-slate-900 via-cyan-950/80 to-blue-950/90 border-blue-500/30',
      'from-slate-900 via-indigo-950/80 to-purple-950/90 border-indigo-500/30',
    ];
    return variants[charCode % variants.length];
  };

  return (
    <div
      className={`relative w-full h-full min-h-[180px] bg-gradient-to-br ${getGradientClass()} border overflow-hidden rounded-lg flex flex-col justify-between p-4 group-hover:scale-[1.02] transition-transform duration-300 ${className}`}
    >
      {/* Background Subtle Tech Pattern / Grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00e5ff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Top Header Row */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-700/60 backdrop-blur-md">
          {getPlatformIcon()}
          <span className="text-[11px] font-semibold text-slate-200 uppercase tracking-wider">
            {platform || 'Digital'}
          </span>
        </div>

        <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono">
          <ShieldCheck className="w-3 h-3 text-cyan-400" />
          <span>OFFICIAL CODE</span>
        </div>
      </div>

      {/* Center Featured Logo / Initials Emblem */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-2">
        <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/20 mb-2">
          <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 tracking-wider">
            {initials}
          </div>
          <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-cyan-300 animate-pulse" />
        </div>
        <p className="text-xs font-bold text-slate-100 line-clamp-1 max-w-[90%] px-1 drop-shadow-md">
          {name}
        </p>
      </div>

      {/* Bottom Row Footer Info */}
      <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800/80">
        <span className="truncate max-w-[60%] font-medium text-slate-300">{category || 'Digital Store'}</span>
        <div className="flex items-center gap-1 text-cyan-400 font-medium">
          <Zap className="w-3 h-3 fill-cyan-400/20" />
          <span>INSTANT</span>
        </div>
      </div>
    </div>
  );
}

export default ProductVisual;
