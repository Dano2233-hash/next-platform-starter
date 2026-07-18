import React from 'react';

export default function ProductVisual({ name = "Digital Product", category = "games", platform = "PC" }) {
  // Generate beautiful initials
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0].toUpperCase())
    .join('');

  // Determine beautiful glow colors depending on category / platform
  let colorClass = "from-blue-600 via-indigo-700 to-purple-800";
  let glowColor = "rgba(59, 130, 246, 0.3)";

  if (category === 'mobile') {
    colorClass = "from-cyan-500 via-teal-600 to-emerald-700";
    glowColor = "rgba(6, 182, 212, 0.3)";
  } else if (category === 'giftcards') {
    colorClass = "from-amber-500 via-orange-600 to-rose-700";
    glowColor = "rgba(245, 158, 11, 0.3)";
  } else if (category === 'subscriptions') {
    colorClass = "from-purple-600 via-pink-600 to-fuchsia-800";
    glowColor = "rgba(168, 85, 247, 0.3)";
  } else if (platform === 'Xbox') {
    colorClass = "from-emerald-600 via-green-700 to-teal-800";
    glowColor = "rgba(16, 185, 129, 0.3)";
  } else if (platform === 'PlayStation') {
    colorClass = "from-blue-700 via-blue-800 to-indigo-900";
    glowColor = "rgba(29, 78, 216, 0.3)";
  }

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-between p-5 select-none overflow-hidden rounded-xl border border-white/5"
      style={{
        background: `radial-gradient(circle at 50% 50%, #0d1527 0%, #030712 100%)`,
        boxShadow: `inset 0 0 40px ${glowColor}`
      }}
    >
      {/* Absolute ambient grid/neon element */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px]" />

      {/* Category / Platform Tag */}
      <div className="z-10 w-full flex items-center justify-between text-[10px] tracking-widest font-black uppercase text-cyan-400">
        <span className="px-2 py-0.5 rounded bg-black/40 border border-white/5">{platform}</span>
        <span className="text-gray-400">{category}</span>
      </div>

      {/* Large glowing initial sphere */}
      <div className="z-10 relative my-auto flex items-center justify-center">
        <div className={`absolute h-20 w-20 rounded-full bg-gradient-to-tr ${colorClass} blur-xl opacity-60 animate-pulse`} />
        <div className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${colorClass} shadow-xl border border-white/20 font-black text-2xl tracking-tighter text-white`}>
          {initials || "DS"}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="z-10 w-full text-center space-y-1">
        <h4 className="text-sm font-bold text-gray-100 line-clamp-1 px-1 tracking-tight">
          {name}
        </h4>
        <div className="flex items-center justify-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[10px] font-semibold text-cyan-400 tracking-wider uppercase">Dano Store Official</span>
        </div>
      </div>
    </div>
  );
}
