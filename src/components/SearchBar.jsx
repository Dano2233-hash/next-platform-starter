import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = "Search the entire store..." }) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#090911] border border-[#121225] text-sm text-white rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff] placeholder-gray-500 transition-premium"
      />
    </div>
  );
}
