import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const SectionHeader = ({ title, subtitle, icon: Icon, viewAllLink, badge }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 border-b border-slate-800/80 pb-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          {Icon && (
            <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-100 uppercase">
            {title}
          </h2>
          {badge && (
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded shadow">
              {badge}
            </span>
          )}
        </div>
        {subtitle && <p className="text-xs text-slate-400 font-medium">{subtitle}</p>}
      </div>

      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors group cursor-pointer"
        >
          <span>View All</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
