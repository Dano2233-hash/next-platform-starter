import React from 'react';
import { Gamepad2, Smartphone, CreditCard, Zap, Boxes } from 'lucide-react';

export default function ProductVisual({ name = 'Game Item', category = 'games', platform = 'PC' }) {
  // Generate clean 2-3 letter initials
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('') || 'DS';

  const getCategoryIcon = () => {
    switch (category) {
      case 'mobile-topups':
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'gift-cards':
        return <CreditCard className="w-5 h-5 text-amber-400" />;
      case 'subscriptions':
        return <Zap className="w-5 h-5 text-purple-400" />;
      default:
        return <Gamepad2 className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col justify-between p-4 bg-gradient-to-br from-[#0c1427] via-[#0d1b3a] to-[#12112e] select-none border border-slate-800/80">
      {/* Subtle gaming tech background grid */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)',
          backgroundSize: '16px 16px'
        }}
      />

      {/* Top row badges */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide bg-slate-900/80 text-cyan-300 border border-cyan-500/30">
          {getCategoryIcon()}
          <span>{platform}</span>
        </span>
        <span className="text-[10px] tracking-wider uppercase font-bold text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-700/50">
          Dano Store
        </span>
      </div>

      {/* Center initials badge */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto py-2">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-cyan-400/30">
          <span className="text-xl font-black text-white tracking-widest drop-shadow">
            {initials}
          </span>
        </div>
      </div>

      {/* Bottom title display */}
      <div className="relative z-10 text-center">
        <div className="text-xs font-bold text-slate-200 line-clamp-1 drop-shadow-sm">
          {name}
        </div>
        <div className="text-[10px] text-cyan-400/80 tracking-wide font-medium mt-0.5 capitalize">
          Official Digital Code
        </div>
      </div>
    </div>
  );
}
