import React from 'react';

/**
 * Fallback visual when a real product image is unavailable or fails to load.
 * Renders a gaming digital card with initials badge, title, category, and platform.
 */
export default function ProductVisual({ name, category, platform, heightClass = 'h-48' }) {
  // Generate initials from name
  const initials = name
    ? name
        .split(' ')
        .filter((w) => w.length > 0)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join('')
    : 'DS';

  // Dynamic gradient based on platform or fallback
  const getGradient = (plat) => {
    switch (plat?.toLowerCase()) {
      case 'pc':
        return 'from-blue-900 via-slate-900 to-cyan-950 border-cyan-500/30';
      case 'xbox':
        return 'from-emerald-950 via-slate-900 to-green-900 border-emerald-500/30';
      case 'playstation':
        return 'from-blue-950 via-indigo-950 to-slate-900 border-indigo-500/30';
      case 'mobile':
        return 'from-purple-950 via-slate-900 to-violet-950 border-purple-500/30';
      default:
        return 'from-slate-900 via-slate-800 to-indigo-950 border-blue-500/30';
    }
  };

  return (
    <div
      className={`w-full ${heightClass} relative overflow-hidden bg-gradient-to-br ${getGradient(
        platform
      )} flex flex-col justify-between p-4 rounded-xl border select-none group-hover:scale-[1.02] transition-transform duration-300`}
    >
      {/* Background glow & mesh patterns */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top row: Initials badge & Platform tag */}
      <div className="flex items-center justify-between z-10">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 text-black font-extrabold flex items-center justify-center text-sm shadow-lg shadow-cyan-500/20 tracking-wider">
          {initials}
        </div>
        <span className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full bg-slate-900/80 text-cyan-400 border border-cyan-500/30 backdrop-blur-sm">
          {platform || 'DIGITAL'}
        </span>
      </div>

      {/* Middle/Bottom text overlay */}
      <div className="z-10 mt-auto pt-2">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
          {category || 'Digital Store'}
        </span>
        <h4 className="text-white font-bold text-base line-clamp-2 leading-snug drop-shadow-md">
          {name}
        </h4>
      </div>
    </div>
  );
}
