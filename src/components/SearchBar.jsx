import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, onClear, placeholder = 'Search products...' }) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#0b0f19] text-sm text-slate-100 placeholder-slate-400 pl-10 pr-10 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
      />
      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3.5 top-3 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
