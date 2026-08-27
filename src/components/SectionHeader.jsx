import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function SectionHeader({ title, subtitle, linkTo, linkText = 'View All' }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2 border-b border-slate-800/60 pb-3">
      <div>
        <h2 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
          <span className="w-1.5 h-6 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full inline-block" />
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-slate-400 mt-1 pl-3.5">
            {subtitle}
          </p>
        )}
      </div>
      {linkTo && (
        <Link
          to={linkTo}
          className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group transition-colors pl-3.5 sm:pl-0"
        >
          <span>{linkText}</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
