import React from 'react';

export default function StatCard({ title, value, icon: Icon, color = 'blue' }) {
  const colorMap = {
    blue: 'from-blue-500/10 to-blue-600/5 text-blue-400 border-blue-500/20 shadow-blue-500/5',
    cyan: 'from-cyan-500/10 to-cyan-600/5 text-cyan-400 border-cyan-500/20 shadow-cyan-500/5',
    purple: 'from-purple-500/10 to-purple-600/5 text-purple-400 border-purple-500/20 shadow-purple-500/5',
    emerald: 'from-emerald-500/10 to-emerald-600/5 text-emerald-400 border-emerald-500/20 shadow-emerald-500/5',
  };

  const selectedColor = colorMap[color] || colorMap.blue;

  return (
    <div className={`p-6 rounded-2xl bg-gradient-to-br ${selectedColor} border shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">{title}</p>
          <h4 className="text-3xl font-black mt-2 tracking-tight text-white">{value}</h4>
        </div>
        {Icon && (
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
}
