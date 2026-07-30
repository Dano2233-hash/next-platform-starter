import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function SectionHeader({ title, subtitle, onSeeAll, badge }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6">
      <div className="text-left">
        {badge && (
          <span className="text-[10px] font-black tracking-widest text-[#00e5ff] uppercase bg-cyan-950/40 px-2.5 py-1 rounded-md border border-cyan-500/20 inline-block mb-2">
            {badge}
          </span>
        )}
        <h2 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
          {title}
        </h2>
        {subtitle && <p className="text-xs text-zinc-500 mt-1">{subtitle}</p>}
      </div>

      {onSeeAll && (
        <button
          onClick={onSeeAll}
          className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-all duration-200 self-start md:self-auto group"
        >
          <span>View All</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      )}
    </div>
  );
}
