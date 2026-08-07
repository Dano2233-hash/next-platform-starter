import React from 'react';

export function ProductVisual({ name = '', category = '', platform = '', type = '' }) {
  // Get initials
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase() || 'DS';

  // Determine premium color gradient based on platform or category
  let gradientClasses = 'from-blue-900 via-indigo-950 to-slate-950';
  if (platform.toLowerCase().includes('xbox')) {
    gradientClasses = 'from-emerald-950 via-zinc-900 to-slate-950';
  } else if (platform.toLowerCase().includes('playstation')) {
    gradientClasses = 'from-blue-950 via-slate-900 to-slate-950';
  } else if (category.toLowerCase() === 'subscriptions') {
    gradientClasses = 'from-purple-950 via-zinc-950 to-slate-950';
  } else if (category.toLowerCase() === 'mobile') {
    gradientClasses = 'from-cyan-950 via-slate-900 to-slate-950';
  }

  return (
    <div className={`relative w-full h-full flex flex-col justify-between p-5 bg-gradient-to-br ${gradientClasses} overflow-hidden rounded-lg select-none group`}>
      {/* Background decoration */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500"></div>

      {/* Top row: Platform & Type Badges */}
      <div className="flex justify-between items-center z-10">
        <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-500/20 shadow-sm">
          {platform}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 bg-purple-950/60 px-2.5 py-1 rounded border border-purple-500/20 shadow-sm">
          {type || 'Digital'}
        </span>
      </div>

      {/* Middle row: Initials Badge */}
      <div className="flex justify-center items-center my-auto py-2 z-10">
        <div className="w-16 h-16 rounded-2xl bg-slate-900/80 border border-slate-700/50 flex justify-center items-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative">
          {/* Inner ring */}
          <div className="absolute inset-1 rounded-xl border border-dashed border-slate-600/30"></div>
          <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
            {initials}
          </span>
        </div>
      </div>

      {/* Bottom row: Product Name & Category */}
      <div className="z-10 mt-auto">
        <p className="text-xs text-slate-400 font-medium tracking-wide uppercase mb-1">
          {category.replace('-', ' ')}
        </p>
        <h4 className="text-base font-bold text-white tracking-tight line-clamp-1 group-hover:text-cyan-400 transition-colors duration-200">
          {name}
        </h4>
      </div>

      {/* Decorative premium gloss line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 opacity-60"></div>
    </div>
  );
}
