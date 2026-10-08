import React from 'react';
import { Gamepad2, Smartphone, CreditCard, Zap, ShieldAlert } from 'lucide-react';

export default function ProductVisual({ name, category, platform, type, className = '' }) {
  const initials = (name || 'DS')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');

  const getCategoryIcon = () => {
    switch (category) {
      case 'Mobile Top-Ups':
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'Gift Cards':
        return <CreditCard className="w-5 h-5 text-purple-400" />;
      case 'Subscriptions':
        return <Zap className="w-5 h-5 text-blue-400" />;
      default:
        return <Gamepad2 className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div
      className={`relative w-full h-full min-h-[160px] flex flex-col justify-between p-4 bg-gradient-to-br from-[#0e1628] via-[#0b0f19] to-[#120e29] border border-slate-800/80 rounded-xl overflow-hidden group select-none ${className}`}
    >
      {/* Background ambient lighting */}
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-blue-600/20 rounded-full blur-xl group-hover:bg-cyan-500/30 transition-all duration-300"></div>
      <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-purple-600/20 rounded-full blur-xl group-hover:bg-purple-500/30 transition-all duration-300"></div>

      {/* Top Header Row */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-[11px] font-semibold text-slate-300">
          {getCategoryIcon()}
          <span>{platform || 'Digital'}</span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
          {type || 'Digital Item'}
        </span>
      </div>

      {/* Center Initials Badge */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-2">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-cyan-950/50 border border-cyan-400/30 group-hover:scale-105 transition-transform duration-300">
          {initials}
        </div>
        <h4 className="mt-2 text-xs font-bold text-slate-200 line-clamp-1 max-w-[90%] px-1">
          {name}
        </h4>
      </div>

      {/* Bottom Footer Info */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800/60 text-[10px] text-slate-400">
        <span className="font-semibold text-slate-300">{category || 'Dano Store'}</span>
        <span className="text-cyan-400 font-bold">100% Verified</span>
      </div>
    </div>
  );
}
