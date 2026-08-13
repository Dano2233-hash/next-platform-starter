import React from 'react';

/**
 * Premium custom gradient visual for digital products.
 * Shows initials, name, platform, and type beautifully instead of broken files.
 */
export function ProductVisual({ name, category, platform, type }) {
  // Generate beautiful initials
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'DS';

  // Return a stylish premium digital card background
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0c0c1e] via-[#05050f] to-[#14002a] p-4 text-left border border-[#1e1e2d] rounded-lg">
      {/* Decorative top-right accent */}
      <div className="absolute top-[-30px] right-[-30px] h-24 w-24 rounded-full bg-gradient-to-tr from-[#0066ff] to-[#7000ff] opacity-20 blur-xl"></div>

      {/* Header section with Badge */}
      <div className="flex items-center justify-between z-10">
        <span className="rounded-md bg-[#0066ff]/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#00e5ff] border border-[#0066ff]/20">
          {platform || 'DIGITAL'}
        </span>
        <span className="text-[10px] uppercase font-semibold text-gray-500">
          {type || 'Service'}
        </span>
      </div>

      {/* Centered Large Initials Badge */}
      <div className="my-3 flex items-center justify-center self-center z-10 h-16 w-16 rounded-2xl bg-gradient-to-br from-[#0066ff]/20 to-[#7000ff]/20 border border-[#7000ff]/30 text-2xl font-black text-white premium-glow-purple">
        {initials}
      </div>

      {/* Footer Info */}
      <div className="z-10">
        <h4 className="text-sm font-extrabold text-white line-clamp-1">
          {name || 'Dano Store Digital'}
        </h4>
        <span className="text-[10px] font-medium text-gray-400 capitalize">
          {category || 'Gaming'} Package
        </span>
      </div>
    </div>
  );
}
