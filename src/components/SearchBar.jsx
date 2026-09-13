import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({ value, onChange, onClear, placeholder = 'Search games, top-ups, gift cards...' }) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 pl-11 pr-10 border border-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-inner transition-all"
      />
      <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-3 p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
