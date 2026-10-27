import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const SectionHeader = ({ title, subtitle, viewAllPath, icon: Icon }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 border-b border-slate-800/80 pb-3">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5 text-cyan-400 shrink-0" />}
          <h2 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
            {title}
          </h2>
        </div>
        {subtitle && <p className="text-xs text-slate-400 font-medium">{subtitle}</p>}
      </div>

      {viewAllPath && (
        <Link
          to={viewAllPath}
          className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors self-start sm:self-auto"
        >
          <span>View All</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
