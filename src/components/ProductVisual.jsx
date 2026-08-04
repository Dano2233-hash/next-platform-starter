import React from 'react';

export default function ProductVisual({ name, category, platform }) {
  // Get initials
  const initials = name
    ? name
        .split(' ')
        .map((w) => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'DS';

  return (
    <div className="relative w-full h-full min-h-[160px] bg-gradient-to-br from-[#0c0d12] via-[#151824] to-[#0a0518] border border-[#1a1e29] rounded-lg flex flex-col justify-between p-4 overflow-hidden group select-none">
      {/* Decorative premium accent blur */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#0066ff]/20 rounded-full blur-xl group-hover:bg-[#00e5ff]/25 transition-all duration-500"></div>
      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-[#7000ff]/20 rounded-full blur-xl group-hover:bg-[#7000ff]/25 transition-all duration-500"></div>

      {/* Initials Badge */}
      <div className="flex justify-between items-center z-10">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#00e5ff] bg-[#00e5ff]/10 px-2 py-0.5 rounded-full border border-[#00e5ff]/20">
          {platform || 'Digital'}
        </span>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7000ff] to-[#0066ff] flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-[#0066ff]/20">
          {initials}
        </div>
      </div>

      {/* Product Information */}
      <div className="mt-auto pt-4 z-10">
        <h4 className="text-sm font-semibold text-gray-200 line-clamp-2 leading-snug group-hover:text-white transition-colors duration-300">
          {name}
        </h4>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-[10px] text-gray-400 font-medium capitalize">
            {category === 'giftcards' ? 'Gift Card' : category}
          </span>
          <span className="text-gray-600 text-xs">•</span>
          <span className="text-[9px] font-semibold text-gray-500 tracking-wider uppercase">
            SECURE CODE
          </span>
        </div>
      </div>
    </div>
  );
}
