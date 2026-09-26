import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({ searchQuery, setSearchQuery, placeholder = "Search for games, UC, gift cards..." }) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
        <Search className="w-4 h-4 text-cyan-400" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#0a0f24] border border-slate-700/80 focus:border-cyan-400 text-slate-100 placeholder-slate-400 text-xs sm:text-sm rounded-xl py-2.5 pl-10 pr-10 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all shadow-inner"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
