import React from 'react';
import { Search } from 'lucide-react';

export function SearchBar({ value, onChange, placeholder = "Search here..." }) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#1e1e2d] bg-[#0c0c14] py-3 pl-11 pr-4 text-sm text-gray-200 outline-none placeholder:text-gray-500 focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff]"
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
    </div>
  );
}
