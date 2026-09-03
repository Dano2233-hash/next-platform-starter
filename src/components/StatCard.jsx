import React from 'react';

export const StatCard = ({ title, value, icon: Icon, color = 'cyan', subtitle }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'purple':
        return {
          bg: 'bg-purple-950/40 border-purple-800/50',
          icon: 'bg-purple-900/60 text-purple-400',
          text: 'text-purple-400'
        };
      case 'blue':
        return {
          bg: 'bg-blue-950/40 border-blue-800/50',
          icon: 'bg-blue-900/60 text-blue-400',
          text: 'text-blue-400'
        };
      case 'emerald':
        return {
          bg: 'bg-emerald-950/40 border-emerald-800/50',
          icon: 'bg-emerald-900/60 text-emerald-400',
          text: 'text-emerald-400'
        };
      default:
        return {
          bg: 'bg-cyan-950/40 border-cyan-800/50',
          icon: 'bg-cyan-900/60 text-cyan-400',
          text: 'text-cyan-400'
        };
    }
  };

  const colors = getColorClasses();

  return (
    <div className={`p-5 rounded-2xl border ${colors.bg} backdrop-blur-sm shadow-xl flex items-center justify-between`}>
      <div className="space-y-1">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-black text-white">{value}</p>
        {subtitle && <p className="text-[11px] text-slate-500">{subtitle}</p>}
      </div>
      {Icon && (
        <div className={`p-3 rounded-xl border border-slate-700/50 ${colors.icon}`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};
