import React from 'react';
import { Search } from 'lucide-react';

export function SearchBar({ value, onChange, onSubmit, placeholder = "Search products..." }) {
  return (
    <form onSubmit={onSubmit} className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#0a0f20] text-slate-100 placeholder-slate-400 text-sm rounded-xl pl-11 pr-4 py-3 border border-slate-800 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-all shadow-inner"
      />
      <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
    </form>
  );
}
