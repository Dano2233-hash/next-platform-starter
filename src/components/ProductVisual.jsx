import React from 'react';
import { Gamepad2, Smartphone, CreditCard, Sparkles, Layers } from 'lucide-react';

export const ProductVisual = ({ name = '', category = '', platform = '' }) => {
  // Get initials for badge
  const getInitials = (str) => {
    if (!str) return 'DS';
    const words = str.trim().split(/\s+/);
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const getCategoryIcon = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'games':
        return <Gamepad2 className="w-5 h-5 text-cyan-400" />;
      case 'topups':
        return <Smartphone className="w-5 h-5 text-blue-400" />;
      case 'giftcards':
        return <CreditCard className="w-5 h-5 text-purple-400" />;
      case 'subscriptions':
        return <Sparkles className="w-5 h-5 text-yellow-400" />;
      default:
        return <Layers className="w-5 h-5 text-cyan-400" />;
    }
  };

  const initials = getInitials(name);

  return (
    <div className="relative w-full h-full min-h-[160px] bg-gradient-to-br from-[#0c1427] via-[#091020] to-[#120a2a] p-4 flex flex-col justify-between overflow-hidden group select-none border border-slate-800/80 rounded-t-xl">
      {/* Background Decorative Accent Grids */}
      <div className="absolute inset-0 bg-[radial-gradient(#00e5ff_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500" />

      {/* Top Header Row */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700/50 text-[11px] font-semibold text-slate-300 backdrop-blur-md">
          {getCategoryIcon(category)}
          <span className="capitalize">{category || 'Digital'}</span>
        </div>

        {platform && (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-cyan-950/80 text-cyan-300 border border-cyan-800/50">
            {platform}
          </span>
        )}
      </div>

      {/* Center Initials & Branding */}
      <div className="relative z-10 my-auto py-2 flex flex-col items-center justify-center text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-600/30 border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-950/50 mb-2 group-hover:scale-105 transition-transform duration-300">
          <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-cyan-300 via-blue-200 to-purple-300 bg-clip-text text-transparent">
            {initials}
          </span>
        </div>
        <h4 className="text-sm font-bold text-slate-200 line-clamp-1 max-w-[90%] px-1">
          {name}
        </h4>
      </div>

      {/* Footer Branding Line */}
      <div className="relative z-10 flex items-center justify-between border-t border-slate-800/80 pt-2 text-[10px] font-semibold text-slate-400">
        <span className="tracking-wider uppercase text-cyan-400/80">Dano Store</span>
        <span className="text-slate-500">Digital Code</span>
      </div>
    </div>
  );
};
