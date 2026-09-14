import React from 'react';

export default function StatCard({ title, value, icon: Icon, color = 'cyan', change }) {
  const getColorClasses = () => {
    switch (color) {
      case 'purple':
        return 'from-purple-500/20 to-indigo-600/10 border-purple-500/30 text-purple-400';
      case 'blue':
        return 'from-blue-500/20 to-cyan-600/10 border-blue-500/30 text-blue-400';
      case 'emerald':
        return 'from-emerald-500/20 to-teal-600/10 border-emerald-500/30 text-emerald-400';
      default:
        return 'from-cyan-500/20 to-blue-600/10 border-cyan-500/30 text-cyan-400';
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4">
      <div className="space-y-1">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading tracking-wide">
          {value}
        </h3>
        {change && (
          <span className="text-[11px] font-semibold text-emerald-400 block">{change}</span>
        )}
      </div>

      <div className={`p-3 rounded-xl bg-gradient-to-br border ${getColorClasses()}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}
