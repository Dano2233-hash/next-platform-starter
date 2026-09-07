import React from 'react'
import { Search, X } from 'lucide-react'

export function SearchBar({ value, onChange, onClear, placeholder = 'Search products...' }) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#0d1326] border border-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-xl pl-10 pr-10 py-2.5 focus:outline-none focus:border-cyan-500/80 transition-colors shadow-inner"
      />
      <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
      {value && (
        <button
          onClick={onClear}
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 rounded-full"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
