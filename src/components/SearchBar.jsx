import React from 'react';
import { Search, X, Filter } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = 'Search products...',
}) {
  return (
    <div className="relative flex-1">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-900/90 text-sm text-slate-100 placeholder-slate-500 pl-10 pr-10 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
      />
      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
      {value && (
        <button
          onClick={onClear}
          className="p-1 text-slate-400 hover:text-white absolute right-3 top-1/2 -translate-y-1/2 rounded-full hover:bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
