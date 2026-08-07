import React from 'react';
import { Search } from 'lucide-react';

export function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search for games, UC packages, gift cards..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-900/80 text-sm text-slate-200 pl-10 pr-4 py-3 rounded-lg border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 placeholder-slate-500 transition-all duration-200"
      />
      <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
    </div>
  );
}
