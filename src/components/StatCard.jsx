import React from 'react';

export function StatCard({ title, value, subtitle, icon: Icon, color = 'cyan' }) {
  const getColorClasses = () => {
    switch (color) {
      case 'cyan':
        return {
          iconBg: 'bg-cyan-950/70 text-cyan-400 border-cyan-800/60',
          accent: 'text-cyan-400'
        };
      case 'blue':
        return {
          iconBg: 'bg-blue-950/70 text-blue-400 border-blue-800/60',
          accent: 'text-blue-400'
        };
      case 'purple':
        return {
          iconBg: 'bg-purple-950/70 text-purple-400 border-purple-800/60',
          accent: 'text-purple-400'
        };
      case 'emerald':
        return {
          iconBg: 'bg-emerald-950/70 text-emerald-400 border-emerald-800/60',
          accent: 'text-emerald-400'
        };
      default:
        return {
          iconBg: 'bg-slate-800 text-slate-300 border-slate-700',
          accent: 'text-slate-200'
        };
    }
  };

  const c = getColorClasses();

  return (
    <div className="p-5 rounded-xl bg-[#090d1a] border border-slate-800/80 shadow-lg">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className={`p-2 rounded-lg border ${c.iconBg}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className="mt-3">
        <h3 className="text-2xl font-extrabold text-white font-mono">{value}</h3>
        {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}

export default StatCard;
