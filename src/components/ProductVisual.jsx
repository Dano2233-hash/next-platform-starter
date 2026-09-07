import React from 'react'
import { Gamepad2, Smartphone, CreditCard, Zap, ShieldAlert } from 'lucide-react'

export function ProductVisual({ name, category, platform, type, className = '' }) {
  const getInitials = (text) => {
    if (!text) return 'DS'
    const words = text.split(' ').filter(Boolean)
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase()
    }
    return text.substring(0, 2).toUpperCase()
  }

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Mobile Top-Ups':
        return <Smartphone className="w-5 h-5 text-cyan-400" />
      case 'Gift Cards':
        return <CreditCard className="w-5 h-5 text-purple-400" />
      case 'Subscriptions':
        return <Zap className="w-5 h-5 text-emerald-400" />
      default:
        return <Gamepad2 className="w-5 h-5 text-blue-400" />
    }
  }

  return (
    <div className={`relative w-full h-full min-h-[180px] bg-gradient-to-br from-slate-900 via-[#0a1128] to-[#120a2a] p-4 flex flex-col justify-between overflow-hidden border border-slate-800/80 rounded-xl group ${className}`}>
      {/* Background Decorative Rings */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500" />

      {/* Top badges */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-800/90 text-slate-300 border border-slate-700/60 backdrop-blur-sm">
          {getCategoryIcon(category)}
          <span>{category || 'Digital'}</span>
        </span>
        {platform && (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
            {platform}
          </span>
        )}
      </div>

      {/* Center Initials Badge */}
      <div className="relative z-10 flex flex-col items-center justify-center my-3">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
          <div className="w-full h-full bg-[#090d1a] rounded-[14px] flex items-center justify-center">
            <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {getInitials(name)}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Title & Type */}
      <div className="relative z-10">
        <h4 className="text-sm font-bold text-slate-100 line-clamp-1 group-hover:text-cyan-300 transition-colors">
          {name || 'Digital Item'}
        </h4>
        <p className="text-[11px] text-slate-400 mt-0.5">
          {type || 'Digital Delivery'}
        </p>
      </div>
    </div>
  )
}
