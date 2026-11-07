import React from 'react';

export function StatCard({ title, value, subtitle, icon: Icon, color = 'cyan' }) {
  const colorMap = {
    cyan: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
    blue: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400',
    purple: 'from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-400',
    emerald: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    amber: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
  };

  return (
    <div className="bg-[#0d1222] border border-slate-800 rounded-2xl p-5 relative overflow-hidden flex items-center justify-between shadow-lg">
      <div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          {value}
        </div>
        {subtitle && (
          <span className="text-xs text-slate-400 mt-1 block">
            {subtitle}
          </span>
        )}
      </div>

      {Icon && (
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br border ${colorMap[color] || colorMap.cyan}`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}

export default StatCard;
