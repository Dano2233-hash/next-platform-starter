import React from 'react';

export default function StatCard({ title, value, icon: Icon, color = 'cyan', subtext }) {
  const colorClasses = {
    cyan: 'from-cyan-500/10 to-blue-500/10 border-cyan-500/30 text-cyan-400',
    purple: 'from-purple-500/10 to-indigo-500/10 border-purple-500/30 text-purple-400',
    emerald: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    amber: 'from-amber-500/10 to-orange-500/10 border-amber-500/30 text-amber-400'
  };

  const selectedColor = colorClasses[color] || colorClasses.cyan;

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${selectedColor} border backdrop-blur-md flex items-center justify-between`}>
      <div>
        <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1">
          {title}
        </span>
        <h3 className="text-2xl font-black text-white tracking-tight">{value}</h3>
        {subtext && <p className="text-slate-400 text-[11px] mt-1">{subtext}</p>}
      </div>

      {Icon && (
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
