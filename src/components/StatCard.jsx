import React from 'react';

export const StatCard = ({ title, value, icon: Icon, color = 'cyan', subtitle }) => {
  const getColorStyles = () => {
    switch (color) {
      case 'purple':
        return 'bg-purple-500/10 border-purple-500/30 text-purple-400';
      case 'emerald':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
      case 'amber':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      case 'rose':
        return 'bg-rose-500/10 border-rose-500/30 text-rose-400';
      default:
        return 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400';
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
          {title}
        </span>
        <span className="text-2xl sm:text-3xl font-black text-white mt-1 block">
          {value}
        </span>
        {subtitle && <span className="text-[11px] text-slate-500 block mt-0.5">{subtitle}</span>}
      </div>

      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${getColorStyles()}`}>
        {Icon && <Icon className="w-6 h-6" />}
      </div>
    </div>
  );
};
