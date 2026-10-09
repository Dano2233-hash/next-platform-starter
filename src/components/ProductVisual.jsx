import React from 'react';
import { Gamepad2, Smartphone, Monitor, CreditCard, Zap, ShieldAlert } from 'lucide-react';

export default function ProductVisual({ name, category, platform, type, className = '' }) {
  const getInitials = (str) => {
    if (!str) return 'DS';
    const words = str.split(' ').filter(Boolean);
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const getPlatformIcon = () => {
    switch (platform?.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'pc':
        return <Monitor className="w-5 h-5 text-blue-400" />;
      case 'playstation':
      case 'xbox':
        return <Gamepad2 className="w-5 h-5 text-purple-400" />;
      case 'gift card':
        return <CreditCard className="w-5 h-5 text-amber-400" />;
      default:
        return <Zap className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div
      className={`relative w-full h-full min-h-[180px] bg-gradient-to-br from-[#0c1329] via-[#091024] to-[#130b29] flex flex-col items-center justify-center p-4 select-none overflow-hidden group ${className}`}
    >
      {/* Background ambient lighting */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

      {/* Center Initials Badge */}
      <div className="relative z-10 mb-3 flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-[1px] shadow-lg shadow-cyan-950/50 group-hover:scale-105 transition-transform duration-300">
        <div className="w-full h-full bg-[#080d1e] rounded-[15px] flex items-center justify-center">
          <span className="text-xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-wider">
            {getInitials(name)}
          </span>
        </div>
      </div>

      {/* Title */}
      <h4 className="relative z-10 text-xs font-bold text-slate-200 text-center line-clamp-1 max-w-[90%] tracking-wide group-hover:text-cyan-300 transition-colors">
        {name || 'Digital Item'}
      </h4>

      {/* Subtitle / Platform badge */}
      <div className="relative z-10 mt-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400">
        {getPlatformIcon()}
        <span className="font-medium text-slate-300">{platform || 'Digital'}</span>
        {type && (
          <>
            <span className="text-slate-600">•</span>
            <span className="text-cyan-400 font-semibold">{type}</span>
          </>
        )}
      </div>
    </div>
  );
}
