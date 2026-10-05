import React from 'react';
import { Gamepad2, Smartphone, Monitor, CreditCard, Sparkles, Tv2, Layers, ShieldCheck } from 'lucide-react';

const ProductVisual = ({ name, category, platform, type }) => {
  const getInitials = (text) => {
    if (!text) return 'DS';
    const words = text.split(' ').filter(Boolean);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return text.substring(0, 2).toUpperCase();
  };

  const getPlatformIcon = (plt) => {
    const p = (plt || '').toLowerCase();
    if (p.includes('pc')) return <Monitor className="w-5 h-5 text-cyan-400" />;
    if (p.includes('xbox')) return <Gamepad2 className="w-5 h-5 text-emerald-400" />;
    if (p.includes('playstation') || p.includes('ps')) return <Tv2 className="w-5 h-5 text-blue-400" />;
    if (p.includes('mobile')) return <Smartphone className="w-5 h-5 text-purple-400" />;
    if (p.includes('gift') || p.includes('card')) return <CreditCard className="w-5 h-5 text-amber-400" />;
    return <Sparkles className="w-5 h-5 text-cyan-300" />;
  };

  const initials = getInitials(name);

  return (
    <div className="w-full h-full min-h-[180px] bg-gradient-to-br from-[#0c142e] via-[#080d1f] to-[#140b2a] border border-cyan-500/20 rounded-t-xl flex flex-col justify-between p-4 relative overflow-hidden group-hover:border-cyan-400/50 transition-all duration-300">
      {/* Background Decorative Mesh Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#00e5ff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
      <div className="absolute -right-8 -top-8 w-28 h-28 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
      <div className="absolute -left-8 -bottom-8 w-28 h-28 bg-purple-500/10 rounded-full blur-xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 text-[11px] font-semibold text-slate-300 backdrop-blur-md">
          {getPlatformIcon(platform)}
          <span className="capitalize">{platform || 'Gaming'}</span>
        </div>
        <div className="text-[10px] uppercase font-mono tracking-widest text-cyan-400/80 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
          {type || 'Digital'}
        </div>
      </div>

      {/* Center Initials & Brand Badge */}
      <div className="flex flex-col items-center justify-center my-auto z-10 text-center py-2">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-purple-600/20 border border-cyan-400/30 flex items-center justify-center shadow-lg shadow-cyan-950/50 mb-2 group-hover:scale-105 transition-transform duration-300">
          <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-cyan-300 via-blue-200 to-purple-300 bg-clip-text text-transparent">
            {initials}
          </span>
        </div>
        <p className="text-xs font-medium text-slate-300 line-clamp-1 max-w-[90%] px-1">
          {name}
        </p>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80 z-10">
        <span className="flex items-center gap-1 text-slate-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Official Service
        </span>
        <span className="text-[10px] text-cyan-400 font-mono">DANO STORE</span>
      </div>
    </div>
  );
};

export default ProductVisual;
