import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = "cyan" }) {
  let colorStyles = "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
  if (color === "blue") colorStyles = "bg-blue-500/10 text-blue-400 border-blue-500/20";
  if (color === "emerald") colorStyles = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  if (color === "purple") colorStyles = "bg-purple-500/10 text-purple-400 border-purple-500/20";

  return (
    <div className="bg-[#080d1e] border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
      <div>
        <span className="text-xs font-semibold text-slate-400">{title}</span>
        <h3 className="text-2xl font-black text-white mt-1">{value}</h3>
        {subtitle && <p className="text-[11px] text-slate-500 mt-1">{subtitle}</p>}
      </div>
      {Icon && (
        <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${colorStyles}`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
