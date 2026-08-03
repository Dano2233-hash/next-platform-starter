import React from 'react';

export default function StatCard({ title, value, icon, color = "blue" }) {
  const getColorClass = () => {
    switch (color) {
      case 'cyan':
        return 'border-[#00e5ff]/20 text-[#00e5ff] bg-[#00e5ff]/5';
      case 'purple':
        return 'border-[#7000ff]/20 text-[#7000ff] bg-[#7000ff]/5';
      case 'amber':
        return 'border-amber-500/20 text-amber-500 bg-amber-500/5';
      default:
        return 'border-[#0066ff]/20 text-[#0066ff] bg-[#0066ff]/5';
    }
  };

  return (
    <div className={`border rounded-xl p-5 flex items-center justify-between ${getColorClass()} bg-[#090911]`}>
      <div>
        <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest block mb-1">
          {title}
        </span>
        <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
          {value}
        </span>
      </div>
      <div className="p-2.5 bg-black/40 rounded-lg border border-white/5">
        {icon}
      </div>
    </div>
  );
}
