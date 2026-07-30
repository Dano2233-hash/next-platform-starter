import React from 'react';

export default function ProductVisual({ name = '', category = '', platform = '', className = '' }) {
  // Generate initials (up to 2 characters)
  const initials = name
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'DS';

  // Choose a clean, premium gradient based on the product name or category
  let gradientClass = 'from-[#0d1527] via-[#0b1b3d] to-[#110724]'; // Default dark navy/purple
  if (category === 'mobile') {
    gradientClass = 'from-[#031d24] via-[#052d3a] to-[#0a1730]'; // Cyan themed
  } else if (category === 'subscriptions') {
    gradientClass = 'from-[#190c30] via-[#110524] to-[#060e22]'; // Deep purple/violet themed
  } else if (category === 'gift-cards') {
    gradientClass = 'from-[#1a1103] via-[#2d1e04] to-[#0a0f1d]'; // Premium golden/brown themed
  } else if (platform === 'Xbox') {
    gradientClass = 'from-[#032408] via-[#05320c] to-[#08101e]'; // Green themed for Xbox
  } else if (platform === 'PlayStation') {
    gradientClass = 'from-[#031535] via-[#002266] to-[#0a0b12]'; // Deep blue for PlayStation
  }

  return (
    <div
      className={`relative w-full h-full flex flex-col justify-between p-4 overflow-hidden select-none bg-gradient-to-br ${gradientClass} border border-white/5 rounded-xl ${className}`}
    >
      {/* Visual background decorations (gaming grids/glows) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]"></div>
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>

      {/* Top row */}
      <div className="flex justify-between items-center z-10">
        <span className="text-[10px] font-semibold tracking-wider text-[#00e5ff] uppercase bg-cyan-950/40 px-2 py-0.5 rounded-md border border-cyan-500/20">
          {platform || 'Digital'}
        </span>
        <span className="text-[9px] font-medium tracking-wide text-white/40 uppercase">
          {category || 'Store'}
        </span>
      </div>

      {/* Center initials badge */}
      <div className="flex justify-center items-center my-auto z-10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/0 border border-white/10 shadow-lg flex justify-center items-center text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">
          {initials}
        </div>
      </div>

      {/* Bottom info */}
      <div className="z-10 text-left mt-2">
        <h4 className="text-xs font-bold text-white/90 line-clamp-1 leading-tight tracking-wide">
          {name}
        </h4>
        <p className="text-[9px] text-white/40 mt-0.5 tracking-wider uppercase font-medium">
          Dano Premium Delivery
        </p>
      </div>

      {/* Decorative overlay badge */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[100px] font-black text-white/[0.02] tracking-tighter select-none pointer-events-none">
        {initials}
      </div>
    </div>
  );
}
