import React from 'react';

export default function StatCard({ title, value, icon: Icon, color = 'cyan', subtitle }) {
  const getColorClasses = (c) => {
    switch (c) {
      case 'blue':
        return 'from-blue-600/20 to-blue-950/40 border-blue-500/30 text-blue-400';
      case 'purple':
        return 'from-purple-600/20 to-purple-950/40 border-purple-500/30 text-purple-400';
      case 'emerald':
        return 'from-emerald-600/20 to-emerald-950/40 border-emerald-500/30 text-emerald-400';
      case 'amber':
        return 'from-amber-600/20 to-amber-950/40 border-amber-500/30 text-amber-400';
      default:
        return 'from-cyan-600/20 to-cyan-950/40 border-cyan-500/30 text-cyan-400';
    }
  };

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${getColorClasses(color)} border shadow-lg flex items-center justify-between`}>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-black text-white mt-1">{value}</h3>
        {subtitle && <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {Icon && (
        <div className="w-12 h-12 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center">
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
