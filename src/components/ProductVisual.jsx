import React from 'react';
import { Gamepad2, Gift, Sparkles, Monitor, Smartphone, Layers } from 'lucide-react';

export default function ProductVisual({ name, category, platform }) {
  // Get initials for display badge
  const initials = name
    ? name
        .split(' ')
        .map(word => word[0])
        .filter(Boolean)
        .slice(0, 3)
        .join('')
        .toUpperCase()
    : 'DS';

  const getCategoryIcon = () => {
    switch ((category || '').toLowerCase()) {
      case 'xbox':
      case 'playstation':
      case 'pc':
        return <Gamepad2 className="w-8 h-8 text-cyan-400 opacity-80" />;
      case 'mobile':
        return <Smartphone className="w-8 h-8 text-cyan-400 opacity-80" />;
      case 'gift-cards':
        return <Gift className="w-8 h-8 text-purple-400 opacity-80" />;
      case 'subscriptions':
        return <Sparkles className="w-8 h-8 text-blue-400 opacity-80" />;
      default:
        return <Layers className="w-8 h-8 text-indigo-400 opacity-80" />;
    }
  };

  return (
    <div className="w-full h-full min-h-[160px] bg-gradient-to-br from-[#0e1628] via-[#111936] to-[#0a0c1a] border border-slate-800/80 rounded-t-xl flex flex-col items-center justify-center p-4 relative overflow-hidden group-hover:border-cyan-500/30 transition-all duration-300">
      {/* Background Subtle Mesh / Glow */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top badges */}
      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
        <span className="px-2 py-0.5 text-[10px] font-semibold bg-slate-900/90 text-slate-300 border border-slate-700/80 rounded">
          {platform || 'Digital'}
        </span>
      </div>

      {/* Visual Centerpiece */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-blue-600/20 to-purple-600/20 border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-950/40 mb-2 group-hover:scale-105 transition-transform duration-300">
          <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {initials}
          </span>
        </div>
        <h4 className="text-xs font-semibold text-slate-200 line-clamp-1 max-w-[150px] px-1">
          {name}
        </h4>
        <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">
          {category || 'Digital Service'}
        </span>
      </div>

      {/* Subtle Bottom Pattern */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
    </div>
  );
}
