import React from 'react';

export default function ProductVisual({ title = 'Dano Store', category = '', platform = '' }) {
  // Extract initials (up to 2-3 characters)
  const words = title.trim().split(' ');
  const initials = words.length > 1
    ? (words[0][0] + words[1][0]).toUpperCase()
    : title.slice(0, 2).toUpperCase();

  return (
    <div className="w-full h-full min-h-[160px] bg-gradient-to-br from-slate-900 via-indigo-950/80 to-slate-950 flex flex-col justify-between p-4 relative overflow-hidden border border-slate-800/80 rounded-t-xl group-hover:border-cyan-500/40 transition-colors">
      {/* Background Subtle Accent Lights */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Bar: Platform / Category Tags */}
      <div className="flex items-center justify-between z-10 gap-2">
        {platform && (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
            {platform}
          </span>
        )}
        {category && (
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider ml-auto">
            {category}
          </span>
        )}
      </div>

      {/* Center Initials Graphic */}
      <div className="my-auto py-2 flex items-center justify-center z-10">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-slate-950 font-black text-2xl tracking-tighter border border-cyan-300/30">
          {initials}
        </div>
      </div>

      {/* Bottom Title */}
      <div className="z-10">
        <p className="text-xs font-bold text-slate-200 line-clamp-1 group-hover:text-cyan-400 transition-colors">
          {title}
        </p>
        <span className="text-[10px] text-slate-500 font-medium">Digital Product</span>
      </div>
    </div>
  );
}
