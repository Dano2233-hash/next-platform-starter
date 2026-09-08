import React from 'react';
import { Gamepad2, Monitor, Smartphone, CreditCard, Zap, Package } from 'lucide-react';

export const ProductVisual = ({ name, category, platform, type, className = "h-48" }) => {
  // Get initials (up to 2 letters)
  const getInitials = (str) => {
    if (!str) return 'DS';
    const words = str.trim().split(/\s+/);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return str.slice(0, 2).toUpperCase();
  };

  const getPlatformIcon = () => {
    switch (platform?.toLowerCase()) {
      case 'pc':
        return <Monitor className="w-5 h-5 text-cyan-400" />;
      case 'mobile':
        return <Smartphone className="w-5 h-5 text-purple-400" />;
      case 'gift card':
        return <CreditCard className="w-5 h-5 text-emerald-400" />;
      case 'service':
        return <Zap className="w-5 h-5 text-amber-400" />;
      default:
        return <Gamepad2 className="w-5 h-5 text-blue-400" />;
    }
  };

  const initials = getInitials(name);

  return (
    <div className={`relative w-full ${className} rounded-t-xl overflow-hidden bg-gradient-to-br from-[#0c1427] via-[#091120] to-[#120a2a] p-4 flex flex-col justify-between border-b border-slate-800/80 group-hover:border-blue-500/30 transition-colors`}>
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      {/* Top row: Platform icon & Type badge */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-700/50 backdrop-blur-md text-xs font-semibold text-slate-200">
          {getPlatformIcon()}
          <span>{platform || 'Digital'}</span>
        </div>
        <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
          {type || 'Item'}
        </span>
      </div>

      {/* Center: Monogram / Initials Badge */}
      <div className="relative z-10 my-auto text-center py-2">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-[1px] shadow-lg shadow-blue-900/30">
          <div className="w-full h-full bg-[#080d1a] rounded-[15px] flex items-center justify-center">
            <span className="text-xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              {initials}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom: Title & Category label */}
      <div className="relative z-10">
        <p className="text-xs font-medium text-slate-400 line-clamp-1 truncate">{category ? category.toUpperCase() : 'GAMING STORE'}</p>
        <h4 className="text-sm font-bold text-white tracking-wide line-clamp-1 truncate group-hover:text-cyan-300 transition-colors">
          {name}
        </h4>
      </div>
    </div>
  );
};
