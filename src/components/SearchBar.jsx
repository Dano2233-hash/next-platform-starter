import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ placeholder = "Search games, top-ups, cards...", onSearchClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      if (onSearchClose) onSearchClose();
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[#0a0f1d]/90 text-sm text-gray-200 placeholder-gray-400 pl-10 pr-10 py-2 rounded-lg border border-blue-500/20 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition-all duration-300"
        />
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-400" />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-white transition"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </form>
  );
}
