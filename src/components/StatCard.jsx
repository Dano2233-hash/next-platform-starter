import React from 'react';

export const StatCard = ({ title, value, subtitle, icon: Icon, color = 'cyan' }) => {
  const getColorStyle = (c) => {
    switch (c) {
      case 'purple':
        return 'bg-purple-950/50 border-purple-500/30 text-purple-400';
      case 'emerald':
        return 'bg-emerald-950/50 border-emerald-500/30 text-emerald-400';
      case 'amber':
        return 'bg-amber-950/50 border-amber-500/30 text-amber-400';
      default:
        return 'bg-cyan-950/50 border-cyan-500/30 text-cyan-400';
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex items-start justify-between">
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {title}
        </p>
        <h3 className="text-2xl font-extrabold text-slate-100 font-heading mt-1">
          {value}
        </h3>
        {subtitle && (
          <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
        )}
      </div>
      {Icon && (
        <div className={`p-3 rounded-xl border ${getColorStyle(color)}`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};
