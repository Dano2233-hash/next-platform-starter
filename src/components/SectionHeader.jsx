import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function SectionHeader({ title, subtitle, viewAllLink, icon: Icon }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5 text-cyan-400" />}
          <h2 className="text-xl font-extrabold text-white tracking-tight font-sans uppercase">
            {title}
          </h2>
        </div>
        {subtitle && <p className="text-xs text-slate-400 font-medium">{subtitle}</p>}
      </div>

      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors group"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      )}
    </div>
  );
}
