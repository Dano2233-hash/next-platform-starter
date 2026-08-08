import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SectionHeader({ title, subtitle, viewAllPath }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div className="space-y-1">
        <h2 className="text-lg font-black tracking-wider uppercase text-white flex items-center gap-2">
          <span className="w-1.5 h-4 bg-cyan-500 rounded-full inline-block" />
          {title}
        </h2>
        {subtitle && <p className="text-xs text-white/50">{subtitle}</p>}
      </div>
      {viewAllPath && (
        <Link
          to={viewAllPath}
          className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
        >
          View All
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
