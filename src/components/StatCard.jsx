import React from 'react';

export default function StatCard({ title, value, icon: Icon, changeText, color = 'cyan' }) {
  const colorStyles = {
    cyan: 'from-blue-600/20 to-cyan-500/20 text-cyan-400 border-cyan-500/30',
    purple: 'from-purple-600/20 to-pink-500/20 text-purple-400 border-purple-500/30',
    emerald: 'from-emerald-600/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
    amber: 'from-amber-600/20 to-orange-500/20 text-amber-400 border-amber-500/30'
  };

  return (
    <div className="bg-[#090e1c] border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
      <div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">{title}</span>
        <h3 className="text-2xl font-black text-white mt-1">{value}</h3>
        {changeText && (
          <p className="text-[11px] text-slate-500 mt-1">{changeText}</p>
        )}
      </div>

      {Icon && (
        <div className={`p-3.5 rounded-xl bg-gradient-to-br border ${colorStyles[color] || colorStyles.cyan}`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
