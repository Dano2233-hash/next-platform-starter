import React from 'react';

export default function SectionHeader({ title, subtitle, badge }) {
  return (
    <div className="mb-8 border-l-4 border-[#0066ff] pl-4">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">{title}</h2>
        {badge && (
          <span className="text-xs font-bold uppercase px-2.5 py-1 rounded bg-gradient-to-r from-[#0066ff] to-[#7000ff] text-white">
            {badge}
          </span>
        )}
      </div>
      {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
    </div>
  );
}
