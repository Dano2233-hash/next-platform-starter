import React from 'react';

const StatCard = ({ title, value, subtitle, icon: Icon, color = 'cyan' }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'blue':
        return 'from-blue-950/60 to-slate-900 border-blue-500/30 text-blue-400';
      case 'cyan':
        return 'from-cyan-950/60 to-slate-900 border-cyan-500/30 text-cyan-400';
      case 'purple':
        return 'from-purple-950/60 to-slate-900 border-purple-500/30 text-purple-400';
      case 'emerald':
        return 'from-emerald-950/60 to-slate-900 border-emerald-500/30 text-emerald-400';
      default:
        return 'from-cyan-950/60 to-slate-900 border-cyan-500/30 text-cyan-400';
    }
  };

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br border ${getColorClasses()} shadow-lg flex items-center justify-between`}>
      <div className="space-y-1">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
          {title}
        </span>
        <div className="text-2xl font-black text-slate-100 tracking-tight">
          {value}
        </div>
        {subtitle && (
          <p className="text-[11px] text-slate-400 font-medium">{subtitle}</p>
        )}
      </div>

      {Icon && (
        <div className="w-12 h-12 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};

export default StatCard;
