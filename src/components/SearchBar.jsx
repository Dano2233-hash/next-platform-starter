import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, onClear, placeholder = "Search games, top-ups, gift cards..." }) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#090d1a] text-slate-100 text-sm rounded-xl pl-10 pr-10 py-3 border border-slate-800 focus:outline-none focus:border-cyan-500/80 transition-all placeholder:text-slate-500 shadow-inner"
      />
      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
