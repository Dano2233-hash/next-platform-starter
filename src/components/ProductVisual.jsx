import React from 'react';

export default function ProductVisual({ name, category, platform }) {
  // Select gradient based on platform or category
  let gradient = 'from-indigo-900 via-slate-900 to-black';
  if (platform === 'xbox') {
    gradient = 'from-emerald-900 via-zinc-900 to-black';
  } else if (platform === 'playstation') {
    gradient = 'from-blue-900 via-slate-900 to-black';
  } else if (platform === 'mobile') {
    gradient = 'from-cyan-900 via-zinc-900 to-black';
  } else if (category === 'gift-cards' || platform === 'giftcard') {
    gradient = 'from-purple-900 via-slate-900 to-black';
  } else if (category === 'subscriptions') {
    gradient = 'from-pink-900 via-zinc-900 to-black';
  }

  // Initials
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 3)
        .join('')
        .toUpperCase()
    : 'DS';

  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col justify-between p-4 relative overflow-hidden select-none border border-slate-800 rounded-lg min-h-[160px]`}>
      {/* Abstract Background Design Elements */}
      <div className="absolute top-[-30px] right-[-30px] w-24 h-24 rounded-full bg-[#0066ff] opacity-10 blur-xl"></div>
      <div className="absolute bottom-[-30px] left-[-30px] w-24 h-24 rounded-full bg-[#7000ff] opacity-10 blur-xl"></div>

      {/* Header Info */}
      <div className="flex justify-between items-start z-10">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-black/40 px-2 py-0.5 rounded border border-slate-800">
          {platform || 'Digital'}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#00e5ff] bg-[#00e5ff]/10 px-2 py-0.5 rounded">
          {category || 'Item'}
        </span>
      </div>

      {/* Initials Badge / Visual Center */}
      <div className="my-auto flex flex-col items-center justify-center z-10 py-2">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#0066ff] to-[#7000ff] flex items-center justify-center shadow-lg shadow-[#0066ff]/20 mb-2 border border-blue-400/20">
          <span className="text-lg font-black tracking-widest text-white">{initials}</span>
        </div>
        <h4 className="text-xs font-semibold text-slate-300 text-center px-2 line-clamp-1">
          {name || 'Dano Store Product'}
        </h4>
      </div>

      {/* Brand Text Footer */}
      <div className="flex justify-between items-center z-10 border-t border-slate-800/60 pt-2">
        <span className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold">Dano Store</span>
        <div className="flex gap-0.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#7000ff]"></div>
        </div>
      </div>
    </div>
  );
}
