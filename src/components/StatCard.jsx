import React from 'react';

export default function StatCard({ title, value, icon: Icon, color = 'blue', change = null }) {
  const getColorClasses = () => {
    switch (color) {
      case 'cyan':
        return {
          border: 'border-cyan-500/30',
          iconBg: 'bg-cyan-950/80 text-cyan-400 border-cyan-800/40'
        };
      case 'purple':
        return {
          border: 'border-purple-500/30',
          iconBg: 'bg-purple-950/80 text-purple-400 border-purple-800/40'
        };
      case 'emerald':
        return {
          border: 'border-emerald-500/30',
          iconBg: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/40'
        };
      case 'amber':
        return {
          border: 'border-amber-500/30',
          iconBg: 'bg-amber-950/80 text-amber-400 border-amber-800/40'
        };
      default:
        return {
          border: 'border-blue-500/30',
          iconBg: 'bg-blue-950/80 text-blue-400 border-blue-800/40'
        };
    }
  };

  const style = getColorClasses();

  return (
    <div className={`bg-[#0d1322] border ${style.border} rounded-xl p-5 flex items-center justify-between shadow-lg`}>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
          {title}
        </p>
        <h3 className="text-2xl font-black text-slate-100">
          {value}
        </h3>
        {change && (
          <p className="text-[11px] font-semibold text-emerald-400 mt-1">
            {change}
          </p>
        )}
      </div>

      {Icon && (
        <div className={`p-3 rounded-xl border ${style.iconBg} shadow-inner shrink-0`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
