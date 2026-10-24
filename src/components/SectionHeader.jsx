import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const SectionHeader = ({ title, subtitle, icon: Icon, viewAllLink, badge }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          {badge && (
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              {badge}
            </span>
          )}
          {Icon && <Icon size={20} className="text-cyan-400" />}
        </div>

        <h2 className="font-heading font-black text-xl sm:text-2xl text-slate-100 tracking-tight flex items-center gap-2">
          {title}
        </h2>
        {subtitle && <p className="text-xs sm:text-sm text-slate-400 mt-1">{subtitle}</p>}
      </div>

      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors shrink-0 group"
        >
          <span>View All</span>
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
