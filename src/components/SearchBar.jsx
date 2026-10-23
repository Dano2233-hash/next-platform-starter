import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, onClear, placeholder = "Search products, UC, diamonds..." }) {
  return (
    <div className="relative w-full max-w-lg">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-900/90 text-slate-100 text-sm font-medium placeholder-slate-500 rounded-xl px-4 py-3 pl-10 pr-10 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-all shadow-inner"
      />
      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 top-3.5 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
