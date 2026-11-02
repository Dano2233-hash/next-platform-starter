import React from 'react';

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  gradient = 'from-blue-600 to-cyan-500'
}) {
  return (
    <div className="p-5 rounded-2xl bg-[#090d1a] border border-slate-800/90 relative overflow-hidden flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        {Icon && (
          <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${gradient} text-black font-bold shadow-md`}>
            <Icon className="w-5 h-5 text-black" />
          </div>
        )}
      </div>

      <div>
        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
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
