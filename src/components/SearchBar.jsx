import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ placeholder = "Search for games, coins, cards...", onSearch, initialValue = "" }) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-lg mx-auto">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-[#0d0d1a] border border-white/10 focus:border-cyan-500/50 text-gray-100 rounded-2xl py-3.5 pl-5 pr-14 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-gray-500"
      />
      <button
        type="submit"
        className="absolute right-2 top-2 bottom-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 rounded-xl text-white flex items-center justify-center transition-opacity"
      >
        <Search className="w-4 h-4" />
      </button>
    </form>
  );
}
