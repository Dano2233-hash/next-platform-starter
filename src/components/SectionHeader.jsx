import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function SectionHeader({ title, subtitle, icon: Icon, viewAllPath }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 border-b border-slate-800/80 pb-3">
      <div>
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5 text-cyan-400" />}
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="text-xs text-slate-400 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      {viewAllPath && (
        <Link
          to={viewAllPath}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors group"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
