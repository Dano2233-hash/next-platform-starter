import React from 'react';
import { Gamepad2, Smartphone, CreditCard, Sparkles, Layers } from 'lucide-react';

export const ProductVisual = ({ name, category, platform }) => {
  // Generate initials from name (e.g. "PUBG Mobile" -> "PM", "GTA V" -> "GTA")
  const getInitials = (str) => {
    if (!str) return 'DS';
    const words = str.trim().split(/\s+/);
    if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
    return (words[0][0] + (words[1] ? words[1][0] : '')).toUpperCase();
  };

  const getCategoryIcon = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'mobile top-ups':
      case 'mobile':
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'gift cards':
      case 'gift card':
        return <CreditCard className="w-5 h-5 text-purple-400" />;
      case 'subscriptions':
        return <Sparkles className="w-5 h-5 text-blue-400" />;
      case 'games':
        return <Gamepad2 className="w-5 h-5 text-emerald-400" />;
      default:
        return <Layers className="w-5 h-5 text-cyan-400" />;
    }
  };

  const initials = getInitials(name);

  return (
    <div className="w-full h-full min-h-[170px] bg-gradient-to-br from-[#0c1229] via-[#09153a] to-[#120a2e] relative overflow-hidden flex flex-col justify-between p-4 border-b border-gray-800/80 group">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#0066ff_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none"></div>

      {/* Decorative Glow Orb */}
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-cyan-500/10 rounded-full blur-xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-purple-500/10 rounded-full blur-xl pointer-events-none"></div>

      {/* Top Header Row */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#050814]/80 backdrop-blur-md rounded-lg border border-gray-700/50 text-[11px] font-bold text-gray-300">
          {getCategoryIcon(category)}
          <span>{platform || category || 'Digital'}</span>
        </div>
        <span className="text-[10px] uppercase font-black tracking-widest text-cyan-400/80 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded">
          DANO DIGITAL
        </span>
      </div>

      {/* Center Initials Badge */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto py-2">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5 shadow-xl shadow-cyan-500/10 group-hover:scale-110 transition-transform">
          <div className="w-full h-full bg-[#070c1e] rounded-[14px] flex items-center justify-center text-white font-black text-xl tracking-wider">
            {initials}
          </div>
        </div>
        <h3 className="text-xs font-extrabold text-white text-center mt-2 line-clamp-1 max-w-[90%]">
          {name || 'Digital Item'}
        </h3>
      </div>

      {/* Bottom Footer Label */}
      <div className="relative z-10 flex items-center justify-between text-[10px] text-gray-400 border-t border-gray-800/60 pt-2">
        <span className="font-semibold text-gray-400">{category || 'Official Product'}</span>
        <span className="text-cyan-400 font-bold">Instant Delivery</span>
      </div>
    </div>
  );
};

export default ProductVisual;
