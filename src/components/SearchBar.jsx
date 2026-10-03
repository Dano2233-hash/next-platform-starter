import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({ searchQuery, setSearchQuery, placeholder = "Search for PUBG UC, Steam cards, GTA V..." }) => {
  return (
    <div className="relative w-full">
      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#0a0e1a] border border-slate-800 text-slate-100 pl-10 pr-10 py-2.5 rounded-xl text-sm focus:outline-none focus:border-cyan-500 transition-all placeholder:text-slate-500"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute right-3 top-3 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
