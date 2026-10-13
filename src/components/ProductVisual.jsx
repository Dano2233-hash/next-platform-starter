import React from 'react';

export default function ProductVisual({ name = '', platform = '', category = '' }) {
  const initials = name
    ? name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map(n => n[0].toUpperCase())
        .join('')
    : 'DS';

  return (
    <div className="w-full h-full min-h-[160px] bg-gradient-to-br from-[#0c1226] via-[#101b3b] to-[#080d1e] border border-cyan-500/20 rounded-lg p-4 flex flex-col justify-between relative overflow-hidden group select-none">
      {/* Background glowing ambient graphics */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500"></div>
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl group-hover:bg-purple-600/20 transition-all duration-500"></div>

      {/* Top row: Platform / Category badge */}
      <div className="flex items-center justify-between z-10">
        <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
          {platform || 'Digital'}
        </span>
        <span className="text-[10px] font-medium text-slate-400 tracking-wider uppercase">
          {category || 'Store'}
        </span>
      </div>

      {/* Center initials badge */}
      <div className="my-auto py-2 flex flex-col items-center justify-center z-10 text-center">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500/20 via-blue-600/20 to-purple-600/20 border border-cyan-400/40 flex items-center justify-center shadow-lg shadow-cyan-950/50 mb-2 group-hover:scale-105 transition-transform">
          <span className="font-orbitron font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
            {initials}
          </span>
        </div>
        <h4 className="font-semibold text-xs text-slate-200 line-clamp-2 px-1 max-w-[180px]">
          {name}
        </h4>
      </div>

      {/* Bottom accent lines */}
      <div className="w-full pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 z-10">
        <span className="flex items-center gap-1 text-cyan-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          INSTANT DIGITAL
        </span>
        <span className="font-orbitron text-purple-400 font-bold">DANO</span>
      </div>
    </div>
  );
}
