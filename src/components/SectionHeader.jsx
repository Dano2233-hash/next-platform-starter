import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function SectionHeader({ title, subtitle, icon: Icon, linkTo, linkText = 'View All' }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-2 border-b border-slate-800/80">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600/20 to-cyan-500/20 border border-cyan-500/30 text-cyan-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {linkTo && (
        <Link
          to={linkTo}
          className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors group"
        >
          <span>{linkText}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      )}
    </div>
  );
}

export default SectionHeader;
