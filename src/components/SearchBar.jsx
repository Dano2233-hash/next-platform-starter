import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({ value, onChange, onClear, placeholder = "Search for games, UC, gift cards..." }) => {
  return (
    <div className="relative w-full max-w-lg">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#0c1224] border border-slate-800 focus:border-cyan-500 rounded-xl py-3 pl-11 pr-10 text-sm text-slate-100 placeholder-slate-400 shadow-inner outline-none transition-all"
      />
      <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
