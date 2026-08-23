import React from 'react';

export function ProductVisual({ name, category, platform, height = 'h-48' }) {
  const getInitials = (str) => {
    if (!str) return 'DS';
    return str
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div
      className={`w-full ${height} bg-gradient-to-br from-slate-900 via-indigo-950 to-cyan-950 p-4 rounded-t-xl flex flex-col justify-between relative overflow-hidden group-hover:scale-105 transition-transform duration-300 border-b border-cyan-500/10`}
    >
      {/* Subtle background glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top badges */}
      <div className="flex justify-between items-center z-10">
        <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
          {platform || 'Digital'}
        </span>
        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
          {category || 'Gaming'}
        </span>
      </div>

      {/* Center Initials Badge */}
      <div className="my-auto text-center z-10 flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-cyan-500/20 mb-2 border border-cyan-400/30">
          {getInitials(name)}
        </div>
        <h4 className="text-sm font-bold text-slate-100 line-clamp-1 max-w-[85%]">{name}</h4>
      </div>

      {/* Bottom accent tag */}
      <div className="z-10 flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-800/80 pt-2">
        <span className="text-cyan-400 font-medium">DANO STORE</span>
        <span className="text-emerald-400 font-semibold">100% Legal Digital Key</span>
      </div>
    </div>
  );
}
