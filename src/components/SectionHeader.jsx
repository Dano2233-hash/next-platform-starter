import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SectionHeader({ title, subtitle, linkTo, linkText = "View All" }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div className="space-y-1 relative pl-4">
        {/* Glowing left accent */}
        <div className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full bg-gradient-to-b from-cyan-400 to-purple-500 shadow-md shadow-cyan-400/50" />
        <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-gray-400 font-medium">
            {subtitle}
          </p>
        )}
      </div>

      {linkTo && (
        <Link
          to={linkTo}
          className="flex items-center gap-1 text-xs font-black uppercase text-cyan-400 hover:text-cyan-300 tracking-wider transition-colors"
        >
          <span>{linkText}</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
