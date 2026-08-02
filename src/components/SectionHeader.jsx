import React from 'react';

export default function SectionHeader({ title, subtitle, tag }) {
  return (
    <div className="space-y-1.5 mb-8 select-none">
      {tag && (
        <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-950/50 border border-cyan-800/30 px-2.5 py-1 rounded-md">
          {tag}
        </span>
      )}
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 pt-1">
        <h3 className="text-xl md:text-2xl font-black uppercase tracking-wider text-white bg-clip-text">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs md:text-sm text-gray-400 font-semibold italic">
            {subtitle}
          </p>
        )}
      </div>
      <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded"></div>
    </div>
  );
}
