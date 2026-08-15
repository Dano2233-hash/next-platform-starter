import React from 'react';

export default function StatCard({ title, value, icon: Icon, color = 'blue' }) {
  const colorStyles = {
    blue: 'from-blue-600/20 to-cyan-600/10 border-blue-500/30 text-cyan-400',
    purple: 'from-purple-600/20 to-indigo-600/10 border-purple-500/30 text-purple-400',
    emerald: 'from-emerald-600/20 to-teal-600/10 border-emerald-500/30 text-emerald-400',
    amber: 'from-amber-600/20 to-orange-600/10 border-amber-500/30 text-amber-400'
  };

  const currentStyle = colorStyles[color] || colorStyles.blue;

  return (
    <div className={`bg-gradient-to-br ${currentStyle} bg-slate-900 border rounded-2xl p-5 flex items-center justify-between shadow-lg`}>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-2xl font-black text-white">{value}</h3>
      </div>
      {Icon && (
        <div className="w-12 h-12 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
