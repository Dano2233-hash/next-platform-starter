import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({ searchQuery, setSearchQuery, placeholder = 'Search products...' }) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-900/90 text-sm text-slate-100 placeholder-slate-500 rounded-xl pl-10 pr-10 py-3 border border-slate-800 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
      />
      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-200"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
