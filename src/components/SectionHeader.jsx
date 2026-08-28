import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function SectionHeader({ title, subtitle, icon: Icon, badge, viewAllLink }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-slate-800/80 gap-2">
      <div className="space-y-1">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            {title}
            {badge && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase tracking-wider">
                {badge}
              </span>
            )}
          </h2>
        </div>
        {subtitle && <p className="text-xs text-slate-400 font-medium">{subtitle}</p>}
      </div>

      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group self-start sm:self-auto transition-colors"
        >
          <span>View All</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}

export default SectionHeader;
