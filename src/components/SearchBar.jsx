import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({ onSearch, className = '' }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (onSearch) onSearch(val);
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) onSearch('');
  };

  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search games, top-ups, cards..."
        className="w-full bg-slate-900/90 text-sm text-slate-100 placeholder-slate-400 pl-10 pr-9 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 transition-all"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-3 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
