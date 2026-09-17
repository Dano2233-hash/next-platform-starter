import React from 'react';

export default function ProductVisual({ name, category, platform, className = '' }) {
  const getInitials = (str) => {
    if (!str) return 'DS';
    const words = str.trim().split(' ');
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const getGradient = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'pc':
        return 'from-blue-600 via-indigo-700 to-purple-900';
      case 'playstation':
        return 'from-blue-700 via-blue-900 to-slate-950';
      case 'xbox':
        return 'from-emerald-600 via-teal-800 to-slate-950';
      case 'mobile':
        return 'from-cyan-600 via-blue-800 to-indigo-950';
      case 'giftcards':
      case 'gift card':
        return 'from-purple-600 via-pink-700 to-slate-950';
      case 'subscriptions':
        return 'from-amber-600 via-red-700 to-indigo-950';
      default:
        return 'from-blue-600 via-cyan-700 to-purple-900';
    }
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-between p-4 bg-gradient-to-br ${getGradient(
        category
      )} overflow-hidden select-none border border-white/10 ${className}`}
    >
      {/* Background Accent Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_70%)] pointer-events-none" />

      {/* Platform Badge Top Right */}
      <div className="w-full flex justify-between items-center z-10">
        <span className="text-[10px] font-extrabold tracking-widest text-white/70 uppercase bg-black/30 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
          {platform || 'Digital'}
        </span>
        <span className="text-[10px] font-bold text-cyan-300 tracking-wider uppercase bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
          Dano Verified
        </span>
      </div>

      {/* Main Center Branding */}
      <div className="my-auto flex flex-col items-center justify-center text-center z-10 py-2">
        <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-2 shadow-lg group-hover:scale-105 transition-transform">
          <span className="text-xl font-black text-white tracking-wider">
            {getInitials(name)}
          </span>
        </div>
        <h4 className="text-sm font-bold text-white line-clamp-2 px-1 max-w-[180px]">
          {name}
        </h4>
      </div>

      {/* Footer Title Tag */}
      <div className="w-full text-center z-10 pt-1 border-t border-white/10">
        <span className="text-[10px] font-medium text-white/80 uppercase tracking-wider">
          {category || 'Gaming Goods'}
        </span>
      </div>
    </div>
  );
}
