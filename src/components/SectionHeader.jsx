import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function SectionHeader({ title, subtitle, icon: Icon, viewAllLink, viewAllText = 'View All' }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-slate-800/80 gap-2">
      <div>
        <div className="flex items-center gap-2 mb-1">
          {Icon && <Icon className="w-5 h-5 text-cyan-400" />}
          <h2 className="font-heading text-lg sm:text-xl font-bold text-slate-100 tracking-tight">
            {title}
          </h2>
        </div>
        {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
      </div>

      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
        >
          <span>{viewAllText}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
