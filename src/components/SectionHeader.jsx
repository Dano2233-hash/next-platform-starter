import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function SectionHeader({ title, subtitle, icon: Icon, viewAllPath, badgeText }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-3 border-b border-slate-800/80">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          {Icon && (
            <div className="p-1.5 rounded-lg bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
              <Icon className="w-4 h-4" />
            </div>
          )}
          {badgeText && (
            <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
              {badgeText}
            </span>
          )}
          <h2 className="text-xl font-extrabold text-white tracking-tight">{title}</h2>
        </div>
        {subtitle && <p className="text-xs text-slate-400 font-medium">{subtitle}</p>}
      </div>

      {viewAllPath && (
        <Link
          to={viewAllPath}
          className="flex items-center gap-1.5 text-xs font-extrabold text-cyan-400 hover:text-cyan-300 transition shrink-0 group"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
