import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, onClear, placeholder = 'Search by product name, category, or tag...' }) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#0b0f19] text-sm text-slate-100 placeholder-slate-400 rounded-xl pl-11 pr-10 py-3 border border-slate-800 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 shadow-inner transition-all"
      />
      <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
      {value && (
        <button
          onClick={onClear}
          className="p-1 rounded-full text-slate-400 hover:text-slate-200 absolute right-3 top-3"
          aria-label="Clear Search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
