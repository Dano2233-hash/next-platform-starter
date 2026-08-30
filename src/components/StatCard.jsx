import React from 'react';

export default function StatCard({ title, value, subtext, icon, color = 'blue' }) {
  const getColorClasses = () => {
    switch (color) {
      case 'cyan':
        return 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400';
      case 'purple':
        return 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400';
      case 'amber':
        return 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400';
      case 'emerald':
        return 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400';
      default:
        return 'from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400';
    }
  };

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${getColorClasses()} border shadow-lg flex items-center justify-between`}>
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">{title}</span>
        <h3 className="text-2xl font-extrabold text-white tracking-tight">{value}</h3>
        {subtext && <p className="text-[11px] text-slate-400 mt-1">{subtext}</p>}
      </div>
      <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 shadow-inner">
        {icon}
      </div>
    </div>
  );
}
