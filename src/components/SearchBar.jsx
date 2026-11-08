import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

export function SearchBar({ onSearch, placeholder = 'Search games, UC, gift cards, subscriptions...' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      if (onSearch) onSearch(searchTerm.trim());
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    if (onSearch) onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (onSearch) onSearch(e.target.value);
          }}
          placeholder={placeholder}
          className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 p-0.5 rounded-full text-slate-400 hover:text-slate-200"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </form>
  );
}

export default SearchBar;
