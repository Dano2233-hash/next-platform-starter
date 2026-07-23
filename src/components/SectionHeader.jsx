import React from 'react';
import { ArrowRight } from 'lucide-react';

export function SectionHeader({ title, description, viewAllHref, titleAccent }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
          {title}
          {titleAccent && (
            <span className="text-brand-cyan bg-brand-blue/10 px-2.5 py-0.5 text-xs font-bold rounded border border-brand-blue/30 uppercase tracking-widest">
              {titleAccent}
            </span>
          )}
        </h2>
        {description && (
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-xl">
            {description}
          </p>
        )}
      </div>

      {viewAllHref && (
        <a
          href={viewAllHref}
          className="flex items-center gap-1.5 text-xs font-extrabold text-brand-cyan hover:text-white uppercase tracking-wider transition-colors duration-200 group flex-shrink-0"
        >
          View All Products
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </a>
      )}
    </div>
  );
}

export default SectionHeader;
