import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function SectionHeader({ title, subtitle, viewAllPath }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 border-b border-slate-900 pb-4">
      <div>
        <div className="flex items-center space-x-2">
          <div className="w-1 h-5 bg-gradient-to-t from-blue-600 to-cyan-400 rounded"></div>
          <h2 className="text-lg sm:text-xl font-extrabold uppercase tracking-wider text-white">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>
      {viewAllPath && (
        <Link
          to={viewAllPath}
          className="flex items-center space-x-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-widest transition-colors duration-200"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      )}
    </div>
  );
}
