import React from 'react';

export default function ProductVisual({ name, category, platform }) {
  // Generate initials (up to 2 letters)
  const initials = name
    ? name
        .split(' ')
        .map((w) => w[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'DS';

  // Determine a color theme based on platform or category
  let gradientClass = 'from-blue-900 via-slate-900 to-cyan-950 border-blue-500/30';
  let badgeColor = 'bg-blue-500/20 text-blue-400 border-blue-500/30';

  if (platform === 'PlayStation') {
    gradientClass = 'from-blue-950 via-slate-900 to-indigo-950 border-blue-500/30';
    badgeColor = 'bg-blue-500/20 text-blue-300 border-blue-500/30';
  } else if (platform === 'Xbox') {
    gradientClass = 'from-emerald-950 via-slate-900 to-teal-950 border-emerald-500/30';
    badgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
  } else if (category === 'Subscriptions') {
    gradientClass = 'from-purple-950 via-slate-900 to-fuchsia-950 border-purple-500/30';
    badgeColor = 'bg-purple-500/20 text-purple-300 border-purple-500/30';
  } else if (category === 'Gift Cards') {
    gradientClass = 'from-amber-950 via-slate-900 to-cyan-950 border-amber-500/30';
    badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
  } else if (category === 'Mobile Top-Ups') {
    gradientClass = 'from-cyan-950 via-slate-900 to-blue-950 border-cyan-500/30';
    badgeColor = 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
  }

  return (
    <div
      className={`w-full h-full min-h-[190px] bg-gradient-to-br ${gradientClass} rounded-t-xl flex flex-col justify-between p-4 relative overflow-hidden border-b selection:bg-none select-none`}
    >
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top badges */}
      <div className="flex items-center justify-between gap-2 z-10">
        <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border backdrop-blur-md ${badgeColor}`}>
          {platform || 'DIGITAL'}
        </span>
        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
          DANO DIGITAL
        </span>
      </div>

      {/* Center initials badge */}
      <div className="my-auto py-2 flex flex-col items-center justify-center z-10">
        <div className="w-14 h-14 rounded-2xl bg-slate-900/80 border border-slate-700/60 shadow-xl flex items-center justify-center backdrop-blur-sm group-hover:scale-105 transition-transform duration-300">
          <span className="text-xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {initials}
          </span>
        </div>
      </div>

      {/* Bottom product title & category */}
      <div className="z-10">
        <div className="text-xs text-slate-400 font-medium truncate">{category}</div>
        <div className="text-sm font-bold text-slate-100 truncate group-hover:text-cyan-400 transition-colors">
          {name}
        </div>
      </div>
    </div>
  );
}
