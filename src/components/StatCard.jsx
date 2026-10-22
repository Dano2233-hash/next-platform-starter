import React from 'react';

export const StatCard = ({ title, value, subtitle, icon: Icon, color = 'cyan' }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'blue':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
      case 'cyan':
        return 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400';
      case 'purple':
        return 'bg-purple-500/10 border-purple-500/30 text-purple-400';
      case 'emerald':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
      case 'amber':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      default:
        return 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-center justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
          {title}
        </span>
        <h3 className="text-2xl font-black text-slate-100">{value}</h3>
        {subtitle && <p className="text-[11px] text-slate-500 mt-1 font-medium">{subtitle}</p>}
      </div>

      <div className={`p-3.5 rounded-xl border ${getColorClasses()}`}>
        {Icon && <Icon className="w-6 h-6" />}
      </div>
    </div>
  );
};
