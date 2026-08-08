import React from 'react';

export default function ProductVisual({ name, category, platform }) {
  // Generate initials for the badge
  const initials = name
    ? name
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase()
    : 'DS';

  // Get gradient based on category or platform for premium aesthetic
  let gradient = 'from-blue-600 via-indigo-700 to-purple-800';
  if (category === 'mobile') {
    gradient = 'from-cyan-500 via-teal-600 to-blue-700';
  } else if (category === 'giftcards') {
    gradient = 'from-purple-600 via-pink-700 to-indigo-800';
  } else if (category === 'subscriptions') {
    gradient = 'from-indigo-600 via-purple-700 to-pink-800';
  } else if (platform === 'Xbox') {
    gradient = 'from-green-600 via-emerald-700 to-teal-800';
  } else if (platform === 'PlayStation') {
    gradient = 'from-blue-700 via-blue-800 to-indigo-900';
  }

  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col justify-between p-4 relative overflow-hidden select-none group`}>
      {/* Decorative premium radial overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)] pointer-events-none" />
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

      {/* Top Section: Platform and Category Badges */}
      <div className="flex justify-between items-center z-10">
        <span className="text-[10px] font-bold uppercase tracking-widest bg-black/40 backdrop-blur-md px-2 py-1 rounded text-cyan-300 border border-cyan-500/20">
          {platform || 'Digital'}
        </span>
        <span className="text-[10px] font-semibold bg-white/10 backdrop-blur-md px-2 py-1 rounded text-white/80">
          {category ? category.toUpperCase() : 'STORE'}
        </span>
      </div>

      {/* Middle Section: Big Initials Badge */}
      <div className="flex justify-center items-center my-auto z-10">
        <div className="w-16 h-16 rounded-full bg-black/30 backdrop-blur-lg border border-white/10 flex items-center justify-center text-2xl font-black text-white shadow-lg tracking-wider group-hover:scale-110 transition-transform duration-300">
          {initials}
        </div>
      </div>

      {/* Bottom Section: Title and Branding */}
      <div className="z-10 mt-auto">
        <h4 className="text-sm font-bold text-white line-clamp-1 group-hover:text-cyan-200 transition-colors duration-300">
          {name || 'Dano Digital Product'}
        </h4>
        <div className="flex justify-between items-center mt-1 text-[9px] text-white/60 tracking-wider font-semibold uppercase">
          <span>SECURE DELIVERY</span>
          <span className="text-cyan-400">DANO STORE</span>
        </div>
      </div>
    </div>
  );
}
