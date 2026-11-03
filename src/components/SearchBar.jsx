import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, onClear, placeholder = 'Search by name, game, card, or category...' }) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#0b1120] border border-slate-700/80 rounded-xl py-3 pl-11 pr-10 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
      />
      <Search size={18} className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white p-0.5 rounded"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
