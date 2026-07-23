import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';

export function SearchBar({ placeholder = "Search for games, coins, cards...", className = "" }) {
  const [query, setQuery] = useState('');
  const { navigate } = useNavigation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`#/products?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('#/products');
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative w-full ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-[#0d0d15] text-white border border-brand-border/60 rounded-xl pl-12 pr-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all duration-200"
      />
      <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
      <button
        type="submit"
        className="absolute right-2 top-2 px-4 py-1.5 rounded-lg bg-brand-blue text-xs font-bold text-white hover:bg-brand-blue/90 transition"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
