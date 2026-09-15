import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = 'Search products...', onClear }) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-500 text-slate-100 text-sm rounded-xl py-2.5 pl-10 pr-10 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-400"
      />
      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
          type="button"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
