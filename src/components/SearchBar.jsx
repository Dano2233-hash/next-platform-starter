import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, onClear, placeholder = "Search for games, top-ups, gift cards..." }) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-xl py-3 pl-11 pr-10 text-sm text-slate-100 placeholder-slate-400 focus:outline-none transition"
      />
      <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-200 transition"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
