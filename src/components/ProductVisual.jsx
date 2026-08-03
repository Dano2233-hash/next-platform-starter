import React from 'react';

export default function ProductVisual({ name, category, platform }) {
  // Generate reliable visual initials
  const initials = name
    ? name
        .split(' ')
        .slice(0, 2)
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'DS';

  // Get matching badge style or gradients for a premium digital feeling
  const getGradient = () => {
    switch (platform?.toLowerCase()) {
      case 'xbox':
        return 'from-[#0e7a0d] to-[#052b05] border-[#107c10]';
      case 'playstation':
        return 'from-[#00439c] to-[#001736] border-[#003785]';
      case 'mobile':
        return 'from-[#e50914] to-[#400205] border-[#b80710]';
      case 'gift card':
        return 'from-[#ffaa00] to-[#553300] border-[#d48800]';
      default:
        return 'from-[#7000ff] to-[#120033] border-[#5900cc]';
    }
  };

  return (
    <div className={`w-full h-full min-h-[180px] flex flex-col justify-between p-4 rounded-lg bg-gradient-to-b ${getGradient()} border-2 text-white relative overflow-hidden select-none`}>
      {/* Visual background element */}
      <div className="absolute right-[-20%] bottom-[-20%] text-[8rem] font-black text-white/5 pointer-events-none">
        {initials}
      </div>

      <div className="flex justify-between items-start z-10">
        <span className="text-[10px] tracking-wider uppercase bg-black/40 px-2 py-1 rounded border border-white/10">
          {platform || 'Digital'}
        </span>
        <span className="text-[20px] font-black bg-white/10 w-10 h-10 flex items-center justify-center rounded-full border border-white/20 shadow-lg backdrop-blur-sm">
          {initials}
        </span>
      </div>

      <div className="mt-8 z-10">
        <h3 className="font-extrabold text-base line-clamp-2 leading-tight tracking-wide text-white drop-shadow">
          {name}
        </h3>
        <p className="text-[11px] text-cyan-400 font-semibold uppercase tracking-widest mt-1">
          {category || 'Gaming Service'}
        </p>
      </div>
    </div>
  );
}
