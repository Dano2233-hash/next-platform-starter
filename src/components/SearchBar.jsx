import React from 'react';
import { Search, X } from 'lucide-react';

export function SearchBar({ value, onChange, placeholder = "Search for games, gift cards, UC..." }) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-900/90 text-sm text-slate-100 placeholder-slate-500 rounded-xl pl-10 pr-10 py-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-3 text-slate-400 hover:text-slate-200 transition-colors"
          type="button"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
