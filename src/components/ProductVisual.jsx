import React from 'react';

export default function ProductVisual({ name, category, platform, type, className = '' }) {
  // Extract up to 2 uppercase initials from the title
  const initials = (name || 'DS')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');

  return (
    <div
      className={`relative w-full h-full min-h-[180px] bg-gradient-to-br from-[#0c1329] via-[#101b3b] to-[#080d1e] flex flex-col items-center justify-between p-4 border border-cyan-500/20 overflow-hidden select-none ${className}`}
    >
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Row with Badges */}
      <div className="w-full flex items-center justify-between text-[11px] font-semibold tracking-wider z-10">
        <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase">
          {platform || 'DIGITAL'}
        </span>
        <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase">
          {type || 'PACKAGE'}
        </span>
      </div>

      {/* Center Initials Graphic */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto py-2">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-cyan-300/40 transform group-hover:scale-105 transition-transform duration-300">
          <span className="text-2xl font-black text-white tracking-widest drop-shadow-md">
            {initials}
          </span>
        </div>
      </div>

      {/* Bottom Title & Branding */}
      <div className="w-full text-center z-10">
        <p className="text-xs font-bold text-slate-200 line-clamp-1 group-hover:text-cyan-400 transition-colors">
          {name || 'Dano Store Digital'}
        </p>
        <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5 font-medium">
          DANO STORE OFFICIAL
        </p>
      </div>
    </div>
  );
}
