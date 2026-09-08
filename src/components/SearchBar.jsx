import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

export const SearchBar = ({ placeholder = "Search games, UC, top-ups, gift cards...", className = "" }) => {
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
    <form onSubmit={handleSubmit} className={`relative flex items-center w-full ${className}`}>
      <div className="absolute left-3.5 pointer-events-none text-slate-400">
        <Search className="w-4 h-4" />
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#090e1a] border border-slate-800 focus:border-cyan-500/80 rounded-xl pl-10 pr-10 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
      />

      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 text-slate-400 hover:text-slate-200 transition-colors p-1"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </form>
  );
};
