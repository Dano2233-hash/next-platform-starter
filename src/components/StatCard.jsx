import React from 'react';

export default function StatCard({ title, value, icon: Icon, colorClass = "text-cyan-400" }) {
  return (
    <div className="p-5 rounded-2xl bg-[#0a0f1d]/50 border border-white/[0.03] flex items-center justify-between gap-4">
      <div>
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
          {title}
        </span>
        <span className="text-2xl font-black text-white tracking-tight">
          {value}
        </span>
      </div>
      <div className={`p-3 rounded-xl bg-white/5 border border-white/5 ${colorClass}`}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
  );
}
