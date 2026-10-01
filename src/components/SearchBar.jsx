import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({ value, onChange, onClear, placeholder = 'Search products by name, tag, or platform...' }) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#090e1f] text-sm text-white placeholder-gray-500 rounded-xl pl-10 pr-10 py-3 border border-gray-800 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-lg"
      />
      <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-3.5 text-gray-400 hover:text-white p-0.5 rounded-full hover:bg-gray-800"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
