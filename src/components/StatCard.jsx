import React from 'react';

export default function StatCard({ title, value, icon: Icon, color = "border-cyan-500/20" }) {
  return (
    <div className={`p-6 bg-[#0d0d11] border ${color} rounded-lg flex items-center justify-between`}>
      <div className="space-y-1">
        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{title}</span>
        <h4 className="text-xl font-black text-white">{value}</h4>
      </div>
      {Icon && (
        <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-cyan-400">
          <Icon className="h-6 w-6" />
        </div>
      )}
    </div>
  );
}
