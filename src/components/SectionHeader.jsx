import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const SectionHeader = ({ title, subtitle, linkTo, linkText = 'View All', icon: Icon }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-2 border-b border-gray-800/60 gap-3">
      <div>
        <div className="flex items-center gap-2 mb-1">
          {Icon && <Icon className="w-5 h-5 text-cyan-400" />}
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">{title}</h2>
        </div>
        {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
      </div>

      {linkTo && (
        <Link
          to={linkTo}
          className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group self-start md:self-auto"
        >
          <span>{linkText}</span>
          <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
