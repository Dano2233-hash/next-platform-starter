import React from 'react';

export function SectionHeader({ title, subtitle, badge }) {
  return (
    <div className="flex flex-col space-y-1 mb-6 text-left">
      {badge && (
        <span className="self-start rounded bg-[#0066ff]/10 border border-[#0066ff]/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#00e5ff] mb-1">
          {badge}
        </span>
      )}
      <h2 className="text-xl font-black uppercase tracking-wide text-white sm:text-2xl">
        {title}
      </h2>
      {subtitle && <p className="text-xs text-gray-400 font-medium">{subtitle}</p>}
    </div>
  );
}
