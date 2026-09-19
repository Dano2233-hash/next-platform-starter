import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

export const SearchBar = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search by name, platform, game or card type...',
  sortBy,
  onSortChange
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
      {/* Search Input Container */}
      <div className="relative flex-1">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[#0c101a] text-slate-100 text-xs sm:text-sm font-medium pl-10 pr-10 py-3 rounded-2xl border border-slate-800 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 shadow-inner placeholder:text-slate-500"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3.5 top-3 text-slate-400 hover:text-white p-0.5 rounded-full hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Sort By Dropdown */}
      {onSortChange && (
        <div className="relative flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 hidden sm:block" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-[#0c101a] text-slate-200 text-xs font-semibold px-3 py-3 rounded-2xl border border-slate-800 focus:border-cyan-500 focus:outline-none cursor-pointer"
          >
            <option value="featured">Featured / Default</option>
            <option value="popular">Most Popular (Sold)</option>
            <option value="rating">Highest Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      )}
    </div>
  );
};
