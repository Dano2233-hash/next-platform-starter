import React from 'react';
import { Gamepad2, Smartphone, CreditCard, Zap, Sparkles } from 'lucide-react';

export function ProductVisual({ name, category, platform, height = 'h-48' }) {
  // Get initials (up to 2 letters)
  const initials = name
    ? name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .join('')
    : 'DS';

  // Choose icon based on category or platform
  const getIcon = () => {
    switch (category) {
      case 'mobile':
        return <Smartphone className="w-8 h-8 text-cyan-400" />;
      case 'games':
        return <Gamepad2 className="w-8 h-8 text-blue-400" />;
      case 'giftcards':
        return <CreditCard className="w-8 h-8 text-purple-400" />;
      case 'subscriptions':
        return <Zap className="w-8 h-8 text-amber-400" />;
      default:
        return <Sparkles className="w-8 h-8 text-cyan-400" />;
    }
  };

  return (
    <div
      className={`relative w-full ${height} overflow-hidden rounded-t-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex flex-col justify-between p-4 border-b border-slate-800/80 group-hover:from-slate-850 group-hover:to-slate-900 transition-all duration-300`}
    >
      {/* Background glow effects */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>

      {/* Top row: Platform & Initials Badge */}
      <div className="flex items-center justify-between z-10">
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-900/80 text-slate-300 border border-slate-700/50 backdrop-blur-xs uppercase tracking-wider">
          {platform || category || 'Digital'}
        </span>
        <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1px] shadow-lg shadow-cyan-500/20">
          <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center text-xs font-bold text-cyan-300 tracking-wider">
            {initials}
          </div>
        </div>
      </div>

      {/* Middle: Icon & Title */}
      <div className="flex flex-col items-center justify-center text-center my-auto z-10 px-2 py-1">
        <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 shadow-inner mb-2 group-hover:scale-110 transition-transform duration-300">
          {getIcon()}
        </div>
        <h4 className="text-sm font-bold text-slate-100 line-clamp-2 leading-tight tracking-tight">
          {name}
        </h4>
      </div>

      {/* Bottom Bar: Watermark Label */}
      <div className="flex items-center justify-between z-10 text-[10px] text-slate-400 font-medium border-t border-slate-800/60 pt-2">
        <span className="truncate uppercase text-cyan-400 font-semibold">{category}</span>
        <span className="text-slate-500">DANO STORE</span>
      </div>
    </div>
  );
}

export default ProductVisual;
