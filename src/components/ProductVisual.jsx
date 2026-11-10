import React from 'react';
import { Gamepad2, Smartphone, CreditCard, Crown, Sparkles } from 'lucide-react';

export default function ProductVisual({ name = 'Game Item', category = 'games', platform = 'PC', className = '' }) {
  // Extract initials (up to 3 chars)
  const initials = name
    .split(' ')
    .filter((w) => w.length > 0 && !w.startsWith('('))
    .slice(0, 3)
    .map((w) => w[0].toUpperCase())
    .join('');

  // Icon selector based on category
  const renderCategoryIcon = () => {
    switch (category) {
      case 'mobile-topups':
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'gift-cards':
        return <CreditCard className="w-5 h-5 text-amber-400" />;
      case 'subscriptions':
        return <Crown className="w-5 h-5 text-purple-400" />;
      default:
        return <Gamepad2 className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center p-4 overflow-hidden select-none bg-gradient-to-br from-slate-900 via-[#0d1527] to-[#141c33] border border-slate-800/80 rounded-t-xl group-hover:border-blue-500/40 transition-colors ${className}`}
    >
      {/* Background glow effects */}
      <div className="absolute -top-12 -left-12 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f615_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

      {/* Initials Badge */}
      <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600/40 via-cyan-500/30 to-purple-600/40 border border-cyan-400/30 shadow-[0_0_20px_rgba(0,229,255,0.15)] flex items-center justify-center mb-3 backdrop-blur-sm group-hover:scale-105 transition-transform duration-300">
        <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-blue-200 tracking-wider">
          {initials || 'DS'}
        </span>
      </div>

      {/* Title */}
      <div className="relative z-10 text-center max-w-[85%] mb-2">
        <h4 className="text-xs font-bold text-slate-200 truncate uppercase tracking-wider">
          {name}
        </h4>
      </div>

      {/* Badges footer inside card visual */}
      <div className="relative z-10 flex items-center gap-1.5 text-[10px] text-slate-400 font-medium bg-black/40 px-2.5 py-1 rounded-full border border-slate-700/60 backdrop-blur-sm">
        {renderCategoryIcon()}
        <span>{platform}</span>
        <span className="text-slate-600">•</span>
        <span className="text-cyan-400 font-semibold uppercase">{category.replace('-', ' ')}</span>
      </div>
    </div>
  );
}
