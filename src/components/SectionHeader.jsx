import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function SectionHeader({ title, subtitle, linkTo, linkText = 'View All' }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 border-b border-slate-800/80 pb-4">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
          <span className="w-2.5 h-6 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full inline-block" />
          {title}
        </h2>
        {subtitle && (
          <p className="text-slate-400 text-xs sm:text-sm mt-1 pl-4">
            {subtitle}
          </p>
        )}
      </div>

      {linkTo && (
        <Link
          to={linkTo}
          className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors pl-4 sm:pl-0"
        >
          <span>{linkText}</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
