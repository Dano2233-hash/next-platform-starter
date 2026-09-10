import React from 'react';

export default function ProductVisual({ name, category, platform, type, className = '' }) {
  const initials = name
    ? name
        .split(' ')
        .map((word) => word[0])
        .filter(Boolean)
        .slice(0, 3)
        .join('')
        .toUpperCase()
    : 'DANO';

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex flex-col justify-between p-4 select-none border border-slate-800 ${className}`}
    >
      {/* Background glow effects */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-600/20 rounded-full blur-2xl pointer-events-none" />

      {/* Top Tag & Platform */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800/80 text-cyan-400 border border-cyan-500/30 backdrop-blur-sm">
          {platform || 'Gaming'}
        </span>
        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
          {type || 'Digital'}
        </span>
      </div>

      {/* Center Initials Graphic */}
      <div className="relative z-10 my-auto py-3 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 border border-cyan-500/40 text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 shadow-lg shadow-cyan-950/50">
          {initials}
        </div>
        <div className="mt-2 text-xs font-bold text-slate-200 line-clamp-1 px-1">
          {name}
        </div>
      </div>

      {/* Bottom Footer Info */}
      <div className="relative z-10 flex items-center justify-between border-t border-slate-800/80 pt-2 text-[10px] text-slate-400">
        <span className="truncate">{category ? category.replace('-', ' ') : 'Dano Store'}</span>
        <span className="font-semibold text-cyan-400">100% Legal</span>
      </div>
    </div>
  );
}
