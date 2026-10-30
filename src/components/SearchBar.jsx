import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

export default function SearchBar({ placeholder = 'Search games, gift cards, UC...', initialQuery = '', className = '' }) {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/products');
    }
  };

  const handleClear = () => {
    setQuery('');
    navigate('/products');
  };

  return (
    <form onSubmit={handleSubmit} className={`relative flex items-center ${className}`}>
      <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2 bg-slate-900/90 text-sm text-slate-100 placeholder-slate-400 rounded-xl border border-slate-700/80 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 p-0.5 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </form>
  );
}
