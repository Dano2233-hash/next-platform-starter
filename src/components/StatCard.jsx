import React from 'react';

export default function StatCard({ title, value, icon: Icon, color = 'cyan', subtext }) {
  const getColorClasses = () => {
    switch (color) {
      case 'blue':
        return 'from-blue-600/20 to-blue-900/10 border-blue-800/50 text-blue-400';
      case 'purple':
        return 'from-purple-600/20 to-purple-900/10 border-purple-800/50 text-purple-400';
      case 'emerald':
        return 'from-emerald-600/20 to-emerald-900/10 border-emerald-800/50 text-emerald-400';
      case 'amber':
        return 'from-amber-600/20 to-amber-900/10 border-amber-800/50 text-amber-400';
      default:
        return 'from-cyan-600/20 to-cyan-900/10 border-cyan-800/50 text-cyan-400';
    }
  };

  return (
    <div className="bg-[#090e1a] border border-slate-800 rounded-2xl p-5 flex items-center justify-between gap-4 shadow-lg">
      <div className="space-y-1 min-w-0">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 truncate">
          {title}
        </p>
        <p className="text-2xl font-black text-white truncate">
          {value}
        </p>
        {subtext && (
          <p className="text-[11px] text-slate-500 font-medium truncate">
            {subtext}
          </p>
        )}
      </div>

      {Icon && (
        <div className={`p-3.5 rounded-xl bg-gradient-to-br border ${getColorClasses()} shrink-0`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
