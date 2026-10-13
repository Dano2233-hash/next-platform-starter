import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, onClear, placeholder = 'Search products, games, cards...' }) {
  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#090e1f] border border-slate-800 focus:border-cyan-500 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
      />
      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 p-0.5 rounded-full"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
