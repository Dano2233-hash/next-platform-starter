import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const SectionHeader = ({ title, subtitle, icon: Icon, badge, viewAllPath }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-3 border-b border-slate-800/60">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          {Icon && (
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
            {title}
          </h2>
          {badge && (
            <span className="text-[10px] uppercase font-extrabold tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 px-2 py-0.5 rounded-md shadow">
              {badge}
            </span>
          )}
        </div>
        {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
      </div>

      {viewAllPath && (
        <Link
          to={viewAllPath}
          className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group transition self-start sm:self-auto"
        >
          <span>View All</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
