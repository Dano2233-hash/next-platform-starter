import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const SectionHeader = ({ title, subtitle, linkTo, linkText = 'View All' }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-800/80 pb-4 mb-6 gap-2">
      <div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400 animate-pulse" />
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-100 uppercase">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="text-xs text-slate-400 mt-1 font-medium">{subtitle}</p>
        )}
      </div>

      {linkTo && (
        <Link
          to={linkTo}
          className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors self-start sm:self-auto group"
        >
          <span>{linkText}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
