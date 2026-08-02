import React from 'react';

export default function StatCard({ title, value, icon: Icon, colorClass = "from-cyan-500 to-blue-600" }) {
  return (
    <div className="bg-[#090911] border border-white/5 rounded-2xl p-5 flex items-center justify-between relative overflow-hidden group hover:border-cyan-500/30 transition-all shadow-lg select-none">
      {/* Absolute decorative background light */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-blue-500/0 rounded-full blur-xl group-hover:scale-110 transition-transform"></div>

      <div className="space-y-1">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{title}</span>
        <h4 className="text-2xl font-black text-white">{value}</h4>
      </div>

      <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${colorClass} flex items-center justify-center text-white shadow-md`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
}
