import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function SectionHeader({ title, subtitle, icon: Icon, viewAllLink, viewAllText = 'View All' }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          {Icon && (
            <div className="p-1.5 rounded-lg bg-blue-950 border border-blue-500/30 text-cyan-400">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">{title}</h2>
        </div>
        {subtitle && <p className="text-xs sm:text-sm text-slate-400">{subtitle}</p>}
      </div>

      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 hover:translate-x-1 transition-all group shrink-0"
        >
          <span>{viewAllText}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
