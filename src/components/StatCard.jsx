import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'cyan' }) {
  const getColorClasses = () => {
    switch (color) {
      case 'purple':
        return 'bg-purple-950/40 border-purple-500/30 text-purple-400';
      case 'emerald':
        return 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400';
      case 'blue':
        return 'bg-blue-950/40 border-blue-500/30 text-blue-400';
      default:
        return 'bg-cyan-950/40 border-cyan-500/30 text-cyan-400';
    }
  };

  return (
    <div className="bg-[#090d18] border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-lg">
      <div className="space-y-1">
        <p className="text-xs font-semibold text-slate-400">{title}</p>
        <h3 className="text-2xl font-black text-white tracking-tight">{value}</h3>
        {subtitle && <p className="text-[11px] text-slate-500 font-medium">{subtitle}</p>}
      </div>
      {Icon && (
        <div className={`p-3 rounded-2xl border ${getColorClasses()}`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
