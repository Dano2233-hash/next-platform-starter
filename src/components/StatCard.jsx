import React from 'react';

export const StatCard = ({ title, value, icon: Icon, color = "cyan" }) => {
  const colorMap = {
    cyan: "from-cyan-500/20 to-blue-900/10 border-cyan-500/30 text-cyan-400",
    purple: "from-purple-500/20 to-indigo-900/10 border-purple-500/30 text-purple-400",
    emerald: "from-emerald-500/20 to-teal-900/10 border-emerald-500/30 text-emerald-400",
    amber: "from-amber-500/20 to-orange-900/10 border-amber-500/30 text-amber-400",
  };

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${colorMap[color] || colorMap.cyan} border backdrop-blur-md flex items-center justify-between shadow-xl`}>
      <div>
        <p className="text-xs uppercase tracking-wider font-bold text-slate-400">{title}</p>
        <h3 className="text-2xl font-black text-slate-100 mt-1">{value}</h3>
      </div>
      {Icon && (
        <div className="p-3 bg-white/5 rounded-xl border border-white/10 shadow-inner">
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};

export default StatCard;
