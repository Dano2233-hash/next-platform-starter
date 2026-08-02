import React, { useState } from 'react';

export default function ProductVisual({ name, category, platform }) {
  // Generate stable color theme based on name length or category
  let gradientClasses = "from-blue-900 to-indigo-950";
  let borderGlow = "border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]";

  if (category === 'mobile' || platform === 'Mobile') {
    gradientClasses = "from-cyan-950 to-emerald-950";
    borderGlow = "border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]";
  } else if (category === 'subscriptions' || platform === 'Gift Card') {
    gradientClasses = "from-purple-950 to-fuchsia-950";
    borderGlow = "border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1)]";
  }

  // Initials logic
  const initials = name
    ? name
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase()
    : 'DS';

  return (
    <div className={`w-full h-full min-h-[160px] bg-gradient-to-br ${gradientClasses} border ${borderGlow} rounded-xl relative flex flex-col justify-between p-4 overflow-hidden select-none`}>
      {/* Absolute design grid overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      {/* Top Header Section */}
      <div className="flex justify-between items-start z-10">
        <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/80 px-2 py-1 rounded-md border border-cyan-800/50">
          {platform || 'DIGITAL'}
        </span>
        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-extrabold text-sm text-gray-200">
          {initials}
        </div>
      </div>

      {/* Center Graphic */}
      <div className="my-auto flex flex-col items-center justify-center z-10 text-center py-2">
        <div className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-1 line-clamp-1 px-2">
          {category ? category.replace('-', ' ') : 'STORE'}
        </div>
        <div className="text-lg font-black text-white px-2 tracking-tight leading-tight line-clamp-2">
          {name}
        </div>
      </div>

      {/* Footer Branding */}
      <div className="flex justify-between items-center z-10 mt-2 border-t border-white/5 pt-2">
        <span className="text-[10px] font-semibold text-gray-400">DANO STORE</span>
        <span className="text-[9px] font-bold text-cyan-400/90 tracking-widest">SECURE LICENSE</span>
      </div>
    </div>
  );
}
