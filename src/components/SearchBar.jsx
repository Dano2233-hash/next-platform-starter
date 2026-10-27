import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ searchQuery, setSearchQuery, placeholder = 'Search products, games, UC, gift cards...' }) => {
  return (
    <div className="relative w-full max-w-xl mx-auto mb-6">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-900/90 border border-slate-800 focus:border-cyan-500/80 text-slate-100 text-sm rounded-xl pl-10 pr-10 py-3 outline-none transition-all placeholder:text-slate-500 shadow-lg shadow-black/20"
      />
      <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
