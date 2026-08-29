import React from 'react';

export default function StatCard({ title, value, icon: Icon, color = 'cyan', subtitle }) {
  const colorStyles = {
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  };

  const styleClass = colorStyles[color] || colorStyles.cyan;

  return (
    <div className="bg-[#0c101c] border border-slate-800/80 rounded-2xl p-4 sm:p-5 flex items-center justify-between">
      <div>
        <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">
          {title}
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
          {value}
        </h3>
        {subtitle && (
          <p className="text-slate-500 text-[11px] mt-0.5">{subtitle}</p>
        )}
      </div>

      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${styleClass}`}>
        {Icon && <Icon className="w-6 h-6" />}
      </div>
    </div>
  );
}
