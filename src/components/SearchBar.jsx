import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = "Search for a product..." }) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#0d0d11] border border-white/5 hover:border-white/10 text-white placeholder-white/40 text-xs rounded-lg pl-10 pr-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all duration-200"
      />
      <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-white/40" />
    </div>
  );
}
