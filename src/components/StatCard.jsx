import React from 'react';

export default function StatCard({ title, value, icon: Icon, color = 'cyan' }) {
  const colorMap = {
    cyan: 'from-cyan-500/20 to-blue-600/10 text-cyan-400 border-cyan-500/30',
    purple: 'from-purple-500/20 to-pink-600/10 text-purple-400 border-purple-500/30',
    emerald: 'from-emerald-500/20 to-teal-600/10 text-emerald-400 border-emerald-500/30',
    amber: 'from-amber-500/20 to-orange-600/10 text-amber-400 border-amber-500/30',
  };

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${colorMap[color] || colorMap.cyan} border bg-[#0b101c] flex items-center justify-between shadow-lg`}>
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-extrabold text-white mt-1">{value}</p>
      </div>
      {Icon && (
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
