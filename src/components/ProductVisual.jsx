import React from 'react';

const ProductVisual = ({ name, category, platform }) => {
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 3);

  return (
    <div className="w-full h-full bg-gradient-to-br from-navy-800 to-accent-purple/20 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-cyan/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-purple/10 rounded-full blur-3xl -ml-16 -mb-16"></div>

      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl font-bold text-accent-cyan mb-4 shadow-xl">
        {initials}
      </div>

      <h3 className="text-white font-bold text-lg mb-1 drop-shadow-md">{name}</h3>
      <p className="text-gray-400 text-xs uppercase tracking-widest">{category} • {platform}</p>

      <div className="mt-4 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] text-gray-400 uppercase font-bold tracking-tighter">
        Digital Product
      </div>
    </div>
  );
};

export default ProductVisual;
