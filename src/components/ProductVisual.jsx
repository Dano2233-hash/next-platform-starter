import React from 'react';

export const ProductVisual = ({ name = 'Product', category = 'Digital', platform = 'PC' }) => {
  // Get initials (up to 2 letters)
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="w-full h-full min-h-[180px] bg-gradient-to-br from-[#0c1329] via-[#111c38] to-[#180a29] flex flex-col items-center justify-center p-4 relative overflow-hidden select-none border border-cyan-500/10">
      {/* Background ambient lighting */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/15 rounded-full blur-2xl pointer-events-none" />

      {/* Center Initials Badge */}
      <div className="relative mb-3 flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[2px] shadow-lg shadow-cyan-500/20">
        <div className="w-full h-full bg-[#080d1a] rounded-[14px] flex items-center justify-center">
          <span className="text-xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {initials || 'DS'}
          </span>
        </div>
      </div>

      {/* Product Title */}
      <div className="text-center font-bold text-white text-sm line-clamp-1 max-w-[90%] px-1">
        {name}
      </div>

      {/* Category & Platform Badges */}
      <div className="flex items-center gap-1.5 mt-2">
        <span className="px-2 py-0.5 text-[10px] uppercase font-semibold tracking-wider text-cyan-300 bg-cyan-950/80 border border-cyan-500/30 rounded-md">
          {platform}
        </span>
        <span className="px-2 py-0.5 text-[10px] uppercase font-semibold tracking-wider text-purple-300 bg-purple-950/80 border border-purple-500/30 rounded-md">
          {category}
        </span>
      </div>
    </div>
  );
};

export default ProductVisual;
