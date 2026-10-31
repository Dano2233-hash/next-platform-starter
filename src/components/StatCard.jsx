import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'cyan' }) {
  const colorMap = {
    cyan: 'from-cyan-950/40 border-cyan-800/40 text-cyan-400',
    emerald: 'from-emerald-950/40 border-emerald-800/40 text-emerald-400',
    purple: 'from-purple-950/40 border-purple-800/40 text-purple-400',
    blue: 'from-blue-950/40 border-blue-800/40 text-blue-400'
  };

  return (
    <div className={`p-5 rounded-2xl bg-[#090e1c] border bg-gradient-to-br to-transparent ${colorMap[color] || colorMap.cyan} shadow-lg`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </p>
        <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-2xl font-black text-white font-['Rajdhani',sans-serif]">
          {value}
        </h3>
        {subtitle && (
          <p className="text-xs text-slate-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
