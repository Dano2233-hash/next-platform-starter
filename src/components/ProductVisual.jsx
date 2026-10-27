import React from 'react';
import { Gamepad2, ShieldCheck, Sparkles } from 'lucide-react';

const ProductVisual = ({ product, name, category, platform }) => {
  const title = product?.name || name || 'Digital Product';
  const cat = product?.category || category || 'Gaming';
  const plat = product?.platform || platform || 'PC';

  // Get first letters of two words
  const words = title.split(' ').filter(Boolean);
  const initials = words.length > 1
    ? (words[0][0] + words[1][0]).toUpperCase()
    : (title.slice(0, 2)).toUpperCase();

  // Color theme generator based on title length
  const gradients = [
    'from-slate-900 via-blue-950 to-cyan-950 border-cyan-500/30',
    'from-slate-900 via-purple-950 to-indigo-950 border-purple-500/30',
    'from-slate-900 via-blue-900 to-slate-950 border-blue-500/30',
    'from-slate-900 via-slate-800 to-cyan-900 border-cyan-400/30'
  ];

  const gradientIdx = title.length % gradients.length;
  const gradientClass = gradients[gradientIdx];

  return (
    <div className={`relative w-full h-48 rounded-t-xl bg-gradient-to-br ${gradientClass} border-b border-slate-800/80 flex flex-col items-center justify-between p-4 overflow-hidden select-none group`}>
      {/* Background Subtle Mesh Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#00e5ff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity"></div>

      {/* Top Header Badges */}
      <div className="w-full flex items-center justify-between z-10 text-xs font-semibold">
        <span className="px-2.5 py-0.5 rounded-full bg-slate-900/80 text-cyan-400 border border-cyan-500/30 backdrop-blur-sm uppercase tracking-wider flex items-center gap-1">
          <Gamepad2 className="w-3 h-3 text-cyan-400" />
          {plat}
        </span>
        <span className="px-2 py-0.5 rounded bg-slate-900/80 text-slate-300 border border-slate-700/50 backdrop-blur-sm capitalize">
          {cat}
        </span>
      </div>

      {/* Center Graphic Badge */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 border border-cyan-400/30 flex items-center justify-center shadow-lg shadow-cyan-950/50 group-hover:scale-105 transition-transform">
          <span className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-purple-300">
            {initials}
          </span>
        </div>
      </div>

      {/* Bottom Title Label */}
      <div className="w-full text-center z-10">
        <h4 className="text-xs font-bold text-slate-200 truncate px-2 tracking-wide flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
          <span className="truncate">{title}</span>
        </h4>
      </div>
    </div>
  );
};

export default ProductVisual;
