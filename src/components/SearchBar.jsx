import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({ value, onChange, onClear, placeholder = 'Search products...' }) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#080d2b] border border-cyan-900/40 rounded-xl py-3 pl-11 pr-10 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200 shadow-inner"
      />
      <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
