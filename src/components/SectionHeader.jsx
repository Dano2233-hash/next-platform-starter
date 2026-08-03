import React from 'react';

export default function SectionHeader({ title, subtitle, badge }) {
  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#121225] pb-4">
      <div>
        {badge && (
          <span className="bg-[#120033] border border-[#7000ff]/30 text-[#7000ff] text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider mb-2 inline-block">
            {badge}
          </span>
        )}
        <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-white uppercase flex items-center gap-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-gray-500 font-medium mt-1">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
