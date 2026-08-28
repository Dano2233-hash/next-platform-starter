import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

export function SearchBar({ placeholder = 'Search games, top-ups, gift cards...', onSearch }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    } else {
      navigate(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (onSearch) onSearch(e.target.value);
          }}
          placeholder={placeholder}
          className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 p-1 text-slate-400 hover:text-slate-200 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </form>
  );
}

export default SearchBar;
