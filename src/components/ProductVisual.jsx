import React from 'react';

export default function ProductVisual({ name, category, platform }) {
  const initials = name
    ? name
        .split(' ')
        .map((word) => word[0])
        .filter(Boolean)
        .slice(0, 3)
        .join('')
        .toUpperCase()
    : 'DS';

  return (
    <div className="w-full h-full min-h-[180px] bg-gradient-to-br from-[#0c1427] via-[#090e1c] to-[#120b24] relative overflow-hidden flex flex-col justify-between p-4 border border-cyan-500/10 group-hover:border-cyan-500/30 transition-colors">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -mt-6 -mr-6 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-28 h-28 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Bar Badges */}
      <div className="flex items-center justify-between z-10">
        <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-slate-800/80 text-cyan-400 border border-cyan-500/20">
          {platform || 'Digital'}
        </span>
        <span className="text-[10px] font-medium tracking-wide text-slate-400 capitalize">
          {category ? category.replace('-', ' ') : 'Store Item'}
        </span>
      </div>

      {/* Center Initials & Branding */}
      <div className="my-auto text-center py-2 z-10">
        <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/10 mb-2">
          <div className="w-full h-full bg-[#070b16] rounded-[11px] flex items-center justify-center">
            <span className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 tracking-wider">
              {initials}
            </span>
          </div>
        </div>
        <p className="text-xs font-semibold text-slate-200 line-clamp-1 px-1">
          {name}
        </p>
      </div>

      {/* Bottom Footer Line */}
      <div className="z-10 flex items-center justify-between border-t border-slate-800/80 pt-2">
        <span className="text-[10px] text-slate-500 tracking-widest uppercase font-semibold">
          DANO STORE
        </span>
        <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Instant Digital
        </span>
      </div>
    </div>
  );
}
