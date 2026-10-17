import React from 'react';
import { Gamepad2 } from 'lucide-react';

export default function ProductVisual({ name, category, platform, className = '' }) {
  const getInitials = (text) => {
    if (!text) return 'DS';
    return text
      .split(' ')
      .slice(0, 2)
      .map(w => w[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div
      className={`relative overflow-hidden w-full h-full min-h-[160px] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 flex flex-col items-center justify-center p-4 border border-slate-800/80 group-hover:border-cyan-500/30 transition-all ${className}`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

      {/* Center Initials Badge */}
      <div className="z-10 flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center mb-2 shadow-lg backdrop-blur-sm">
          <span className="text-xl font-bold text-cyan-400 tracking-wider">
            {getInitials(name)}
          </span>
        </div>

        <h4 className="text-sm font-semibold text-slate-200 line-clamp-1 max-w-[90%] mb-1">
          {name || 'Digital Game'}
        </h4>

        <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
          <span className="px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700/60 uppercase tracking-wider text-[10px] text-cyan-300">
            {platform || 'GLOBAL'}
          </span>
          <span className="capitalize">{category || 'Digital'}</span>
        </div>
      </div>

      {/* Decorative Gaming Emblem */}
      <Gamepad2 className="absolute -bottom-4 -right-4 w-20 h-20 text-slate-800/30 pointer-events-none rotate-12" />
    </div>
  );
}
