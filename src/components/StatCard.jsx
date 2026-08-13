import React from 'react';

export function StatCard({ title, value, icon: Icon, color = 'blue' }) {
  const colorMap = {
    blue: 'border-[#0066ff]/20 bg-[#0066ff]/5 text-[#00e5ff]',
    purple: 'border-[#7000ff]/20 bg-[#7000ff]/5 text-purple-400',
    cyan: 'border-[#00e5ff]/20 bg-[#00e5ff]/5 text-[#00e5ff]',
  };

  return (
    <div className={`rounded-xl border p-5 flex items-center justify-between ${colorMap[color] || colorMap.blue}`}>
      <div className="space-y-1">
        <span className="text-xs uppercase font-extrabold tracking-wider text-gray-400">{title}</span>
        <p className="text-2xl font-black text-white">{value}</p>
      </div>
      {Icon && (
        <div className="rounded-lg bg-black/40 p-2.5 text-gray-300">
          <Icon size={22} />
        </div>
      )}
    </div>
  );
}
