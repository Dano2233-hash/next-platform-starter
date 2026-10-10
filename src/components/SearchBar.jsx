import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Search games, mobile top-ups, gift cards..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2.5 pl-10 pr-10 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all shadow-inner"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  );
};
