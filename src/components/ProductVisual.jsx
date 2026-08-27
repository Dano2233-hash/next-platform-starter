import React from 'react';
import { Gamepad2, Smartphone, CreditCard, Zap, Package } from 'lucide-react';

export default function ProductVisual({ name, category, platform, className = '' }) {
  // Generate clean initials from the product name
  const getInitials = (text) => {
    if (!text) return 'DS';
    const words = text.split(' ').filter(Boolean);
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const initials = getInitials(name);

  // Gradient selection based on category/type
  const getGradient = () => {
    switch (category) {
      case 'mobile':
        return 'from-emerald-900/80 via-cyan-950 to-slate-950 border-cyan-500/30';
      case 'gift-cards':
        return 'from-purple-900/80 via-slate-950 to-indigo-950 border-purple-500/30';
      case 'subscriptions':
        return 'from-amber-950/80 via-slate-950 to-rose-950 border-amber-500/30';
      case 'pc':
        return 'from-blue-900/80 via-slate-950 to-indigo-950 border-blue-500/30';
      case 'xbox':
        return 'from-green-900/80 via-slate-950 to-emerald-950 border-green-500/30';
      case 'playstation':
        return 'from-blue-950/90 via-indigo-950 to-slate-950 border-blue-400/30';
      default:
        return 'from-slate-900 via-blue-950 to-slate-950 border-blue-500/20';
    }
  };

  const getIcon = () => {
    switch (category) {
      case 'mobile':
        return <Smartphone className="w-8 h-8 text-cyan-400 opacity-80" />;
      case 'gift-cards':
        return <CreditCard className="w-8 h-8 text-purple-400 opacity-80" />;
      case 'subscriptions':
        return <Zap className="w-8 h-8 text-amber-400 opacity-80" />;
      default:
        return <Gamepad2 className="w-8 h-8 text-blue-400 opacity-80" />;
    }
  };

  return (
    <div
      className={`w-full h-full bg-gradient-to-br ${getGradient()} border flex flex-col items-center justify-between p-4 relative overflow-hidden select-none ${className}`}
    >
      {/* Background Accent Lines */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl pointer-events-none" />

      {/* Top Header info */}
      <div className="w-full flex justify-between items-center z-10">
        <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-slate-900/80 text-slate-300 border border-slate-700/50">
          {platform || 'Digital'}
        </span>
        {getIcon()}
      </div>

      {/* Center Initials Badge */}
      <div className="my-auto text-center z-10">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              {initials}
            </span>
          </div>
        </div>
        <h4 className="mt-2 text-sm font-semibold text-slate-200 line-clamp-1 max-w-[160px] mx-auto">
          {name}
        </h4>
      </div>

      {/* Bottom Footer Info */}
      <div className="w-full text-center z-10 pt-2 border-t border-slate-800/60">
        <span className="text-[11px] text-cyan-400 font-medium tracking-wide">
          OFFICIAL DIGITAL PRODUCT
        </span>
      </div>
    </div>
  );
}
