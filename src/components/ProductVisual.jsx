import React from 'react';
import { Gamepad2, Smartphone, Monitor, Tv, CreditCard, Zap, ShieldCheck } from 'lucide-react';

const categoryIcons = {
  mobile: Smartphone,
  pc: Monitor,
  playstation: Gamepad2,
  xbox: Tv,
  giftcards: CreditCard,
  subscriptions: Zap,
};

const categoryGradients = {
  mobile: 'from-blue-950 via-slate-900 to-cyan-950 border-cyan-500/30 text-cyan-400',
  pc: 'from-slate-950 via-purple-950 to-slate-900 border-purple-500/30 text-purple-400',
  playstation: 'from-blue-950 via-indigo-950 to-slate-950 border-blue-500/30 text-blue-400',
  xbox: 'from-emerald-950 via-slate-900 to-teal-950 border-emerald-500/30 text-emerald-400',
  giftcards: 'from-cyan-950 via-slate-900 to-blue-950 border-cyan-400/30 text-cyan-300',
  subscriptions: 'from-purple-950 via-indigo-950 to-slate-900 border-purple-400/30 text-purple-300',
};

export default function ProductVisual({ name, category, platform, type }) {
  const IconComponent = categoryIcons[category] || Gamepad2;
  const gradientClass = categoryGradients[category] || categoryGradients.mobile;

  // Generate 2-letter initials
  const initials = name
    ? name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join('')
    : 'DS';

  return (
    <div
      className={`relative w-full h-full min-h-[180px] bg-gradient-to-br ${gradientClass} p-5 flex flex-col justify-between overflow-hidden rounded-t-xl border-b select-none transition-all duration-300 hover:brightness-110`}
    >
      {/* Background ambient glowing accent */}
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -left-8 -top-8 w-28 h-28 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 backdrop-blur-md">
          <IconComponent className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[11px] font-semibold text-slate-300 tracking-wide uppercase">
            {platform || category || 'Gaming'}
          </span>
        </div>
        {type && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-600/30 border border-blue-500/40 text-blue-300 uppercase tracking-wider">
            {type}
          </span>
        )}
      </div>

      {/* Middle Center Initials Badge & Name */}
      <div className="my-auto py-3 text-center z-10 flex flex-col items-center">
        <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow-lg flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
          <span className="text-xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {initials}
          </span>
        </div>
        <h3 className="text-sm font-extrabold text-white tracking-tight line-clamp-1 max-w-[90%]">
          {name}
        </h3>
      </div>

      {/* Bottom Footer Row */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 z-10 border-t border-slate-800/80 pt-2">
        <span className="font-medium text-slate-400 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-400" /> Official Service
        </span>
        <span className="font-bold text-cyan-400 tracking-wider">DANO STORE</span>
      </div>
    </div>
  );
}
