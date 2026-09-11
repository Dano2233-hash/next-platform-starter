import React from 'react';

const StatCard = ({ title, value, subtext, icon: Icon, color = 'cyan' }) => {
  const getColorStyle = () => {
    switch (color) {
      case 'emerald':
        return 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400';
      case 'purple':
        return 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400';
      case 'amber':
        return 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400';
      case 'cyan':
      default:
        return 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400';
    }
  };

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${getColorStyle()} border shadow-xl flex items-center justify-between`}>
      <div className="space-y-1">
        <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">{title}</p>
        <h3 className="text-2xl font-black text-white">{value}</h3>
        {subtext && <p className="text-[11px] text-slate-400 font-medium">{subtext}</p>}
      </div>
      {Icon && (
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};

export default StatCard;
