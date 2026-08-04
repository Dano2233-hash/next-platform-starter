import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function SearchBar({ placeholder = "Search games, top-ups...", className = "" }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative flex items-center ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#0c0d12]/90 hover:bg-[#151824] focus:bg-[#151824] text-xs text-gray-200 pl-9 pr-4 py-2 rounded-lg border border-[#1a1e29] focus:border-[#00e5ff] focus:outline-none transition-all placeholder:text-gray-500"
      />
      <button type="submit" className="absolute left-3 text-gray-500 hover:text-[#00e5ff] transition-colors">
        <Search size={14} />
      </button>
    </form>
  );
}
