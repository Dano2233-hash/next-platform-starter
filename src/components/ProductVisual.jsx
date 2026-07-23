import React from 'react';

/**
 * Fallback visual for products that don't have an image.
 * Uses a clean, premium dark gaming aesthetic gradient instead of a blank placeholder.
 * Shows product name, category, platform, and initials badge.
 */
export function ProductVisual({ name, category, platform, className = '' }) {
  // Get initials from the name
  const getInitials = (str) => {
    if (!str) return 'DS';
    const parts = str.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return str.slice(0, 2).toUpperCase();
  };

  const initials = getInitials(name);

  // Platform styling helper
  const getPlatformColors = (plat) => {
    switch (plat?.toLowerCase()) {
      case 'pc':
        return 'from-cyan-500/20 to-blue-600/20 text-cyan-400 border-cyan-500/30';
      case 'xbox':
        return 'from-green-500/20 to-emerald-600/20 text-green-400 border-green-500/30';
      case 'playstation':
        return 'from-blue-600/20 to-indigo-700/20 text-blue-400 border-blue-500/30';
      case 'mobile':
        return 'from-amber-500/20 to-red-600/20 text-yellow-400 border-yellow-500/30';
      case 'giftcard':
        return 'from-purple-500/20 to-pink-600/20 text-purple-400 border-purple-500/30';
      default:
        return 'from-indigo-600/20 to-purple-600/20 text-indigo-400 border-indigo-500/30';
    }
  };

  const colorClasses = getPlatformColors(platform);

  return (
    <div className={`relative flex flex-col justify-between p-4 h-full w-full select-none overflow-hidden rounded-xl bg-gradient-to-br ${colorClasses} border border-brand-border/40 ${className}`}>
      {/* Visual Ambient Glow Pattern */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-cyan/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-brand-purple/10 blur-3xl rounded-full pointer-events-none" />

      {/* Top Section: Badge / Initials & Category */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-black/40 border border-white/10 font-bold tracking-wider text-sm shadow-md">
          {initials}
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-widest bg-black/50 px-2 py-0.5 rounded-full border border-white/5 text-gray-300">
          {category || 'Gaming'}
        </span>
      </div>

      {/* Middle Section: Center Graphic */}
      <div className="flex flex-col items-center justify-center my-2 py-4 z-10">
        <div className="text-center font-extrabold text-2xl tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent drop-shadow-md line-clamp-2 px-1">
          {name}
        </div>
      </div>

      {/* Bottom Section: Platform label */}
      <div className="flex items-center justify-between mt-auto z-10 pt-2 border-t border-white/5">
        <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
          PLATFORM
        </span>
        <span className="text-xs font-bold uppercase tracking-widest">
          {platform || 'DIGITAL'}
        </span>
      </div>
    </div>
  );
}

export default ProductVisual;
