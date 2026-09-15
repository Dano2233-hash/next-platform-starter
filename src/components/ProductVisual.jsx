import React from 'react';

const ProductVisual = ({ title = '', category = '', platform = '', className = '' }) => {
  // Get product initials for badge (e.g. PUBG Mobile -> PM)
  const initials = title
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');

  // Determine accent color gradient based on platform/category
  const getGradient = () => {
    const lowerCategory = category.toLowerCase();
    const lowerPlatform = platform.toLowerCase();

    if (lowerPlatform.includes('playstation')) {
      return 'from-blue-900 via-indigo-950 to-slate-950 border-blue-500/30';
    }
    if (lowerPlatform.includes('xbox')) {
      return 'from-emerald-950 via-teal-950 to-slate-950 border-emerald-500/30';
    }
    if (lowerPlatform.includes('mobile')) {
      return 'from-purple-950 via-slate-900 to-slate-950 border-purple-500/30';
    }
    if (lowerCategory.includes('gift')) {
      return 'from-cyan-950 via-blue-950 to-slate-950 border-cyan-500/30';
    }
    return 'from-slate-900 via-blue-950 to-slate-950 border-blue-500/30';
  };

  return (
    <div
      className={`relative w-full h-full min-h-[160px] flex flex-col justify-between p-4 rounded-xl bg-gradient-to-br ${getGradient()} border shadow-inner overflow-hidden select-none ${className}`}
    >
      {/* Dynamic background gaming pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,102,255,0.15),transparent_60%)] pointer-events-none" />

      {/* Top row: Initials badge & category label */}
      <div className="flex items-center justify-between z-10">
        <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center font-bold text-cyan-400 text-sm tracking-wider shadow-sm backdrop-blur-md">
          {initials || 'DS'}
        </div>
        <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/50">
          {category || 'Digital'}
        </span>
      </div>

      {/* Middle/Bottom section: Title & platform tag */}
      <div className="z-10 mt-auto pt-4">
        <h4 className="text-sm font-bold text-slate-100 line-clamp-2 leading-tight tracking-wide drop-shadow-sm">
          {title}
        </h4>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-medium text-slate-400">
            {platform || 'Global'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductVisual;
