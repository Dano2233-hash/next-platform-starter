import React from 'react';

export default function StatCard({ title, value, icon: Icon, color = 'cyan' }) {
  const colorStyles = {
    cyan: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
    blue: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400',
    purple: 'from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-400',
    emerald: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400'
  };

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${colorStyles[color] || colorStyles.cyan} border shadow-lg flex items-center justify-between`}>
      <div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
          {title}
        </span>
        <span className="font-orbitron font-extrabold text-2xl text-white">
          {value}
        </span>
      </div>
      {Icon && (
        <div className={`p-3 rounded-xl bg-slate-900/80 border border-slate-800 ${colorStyles[color]?.split(' ').pop()}`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
