import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

export default function SearchBar({ initialQuery = '', onSearch, placeholder = 'Search games, top-ups, gift cards...' }) {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    } else {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
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
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (onSearch) onSearch(e.target.value);
          }}
          placeholder={placeholder}
          className="w-full bg-[#080d1a] border border-slate-700/70 focus:border-cyan-500 rounded-lg pl-9.5 pr-8 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2.5 p-1 text-slate-400 hover:text-slate-200"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </form>
  );
}
