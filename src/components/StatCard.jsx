import React from 'react';

export default function StatCard({ title, value, icon: Icon, color = 'blue' }) {
  const getColorClasses = () => {
    switch (color) {
      case 'purple':
        return 'from-purple-900/40 to-slate-900 border-purple-500/30 text-purple-400';
      case 'emerald':
        return 'from-emerald-900/40 to-slate-900 border-emerald-500/30 text-emerald-400';
      case 'amber':
        return 'from-amber-900/40 to-slate-900 border-amber-500/30 text-amber-400';
      default:
        return 'from-cyan-900/40 to-slate-900 border-cyan-500/30 text-cyan-400';
    }
  };

  return (
    <div className={`p-4 rounded-2xl bg-gradient-to-br ${getColorClasses()} border shadow-lg flex items-center justify-between`}>
      <div>
        <span className="text-xs text-slate-400 font-medium block mb-1">{title}</span>
        <h3 className="text-xl font-black text-white">{value}</h3>
      </div>
      <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}
