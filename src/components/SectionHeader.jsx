import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SectionHeader({ title, subtitle, viewAllLink, badge }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-2">
      <div>
        <div className="flex items-center gap-2 mb-1">
          {badge && (
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#00e5ff] bg-[#00e5ff]/10 px-2.5 py-0.5 rounded-full border border-[#00e5ff]/25">
              {badge}
            </span>
          )}
          {subtitle && <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">{subtitle}</p>}
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          {title}
        </h2>
      </div>
      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="inline-flex items-center gap-1 text-xs text-[#0066ff] hover:text-[#00e5ff] font-semibold transition-colors duration-200 group mt-1 md:mt-0"
        >
          View All Products
          <ChevronRight size={14} className="transform group-hover:translate-x-0.5 transition-transform" />
        </Link>
      )}
    </div>
  );
}
