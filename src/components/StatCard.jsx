import React from 'react';

export default function StatCard({ title, value, icon: Icon, changeText, colorScheme = 'cyan' }) {
  const schemeStyles = {
    cyan: 'from-cyan-500/10 to-blue-500/10 border-cyan-500/30 text-cyan-400',
    purple: 'from-purple-500/10 to-fuchsia-500/10 border-purple-500/30 text-purple-400',
    emerald: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    amber: 'from-amber-500/10 to-orange-500/10 border-amber-500/30 text-amber-400',
  };

  const style = schemeStyles[colorScheme] || schemeStyles.cyan;

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${style} border backdrop-blur-sm relative overflow-hidden`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className="mt-3">
        <div className="text-2xl font-black text-white tracking-tight">{value}</div>
        {changeText && (
          <div className="text-xs text-slate-400 mt-1 font-medium">{changeText}</div>
        )}
      </div>
    </div>
  );
}
