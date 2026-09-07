import React from 'react'

export function StatCard({ title, value, subtitle, icon: Icon, color = 'cyan' }) {
  const getColorStyles = (c) => {
    switch (c) {
      case 'purple':
        return 'from-purple-500/20 to-indigo-500/10 text-purple-400 border-purple-500/30'
      case 'emerald':
        return 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30'
      case 'amber':
        return 'from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30'
      default:
        return 'from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30'
    }
  }

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${getColorStyles(color)} bg-[#080d1a] border flex items-center justify-between shadow-lg`}>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-extrabold text-white mt-1">{value}</p>
        {subtitle && <p className="text-[11px] text-slate-400 mt-1">{subtitle}</p>}
      </div>
      {Icon && (
        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  )
}
