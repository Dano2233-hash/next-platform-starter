import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

export default function SearchBar({ placeholder = 'Search games, top-ups, gift cards...' }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[#080b14] border border-slate-800 text-slate-100 placeholder-slate-500 text-xs md:text-sm rounded-xl pl-10 pr-9 py-2.5 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 p-0.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </form>
  );
}
