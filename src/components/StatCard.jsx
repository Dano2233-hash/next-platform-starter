import React from 'react';

export default function StatCard({ title, value, icon: Icon, color = 'from-blue-600 to-cyan-600' }) {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-black text-slate-100 mt-1">{value}</h3>
      </div>
      {Icon && (
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg`}>
          <Icon className="w-6 h-6 stroke-[2.5]" />
        </div>
      )}
    </div>
  );
}
