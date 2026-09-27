import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { PLATFORMS } from '../data/categories';

export default function SearchBar({
  searchQuery,
  onSearchChange,
  selectedPlatform,
  onPlatformChange,
  onClearFilters
}) {
  return (
    <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4 shadow-lg shadow-black/40">
      {/* Input */}
      <div className="relative flex-1 w-full">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search games, packages, mobile top-ups, gift cards..."
          className="w-full bg-slate-900 text-slate-100 placeholder-slate-500 text-sm rounded-xl pl-10 pr-10 py-3 border border-slate-700/80 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Platform Filter Dropdown */}
      <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider hidden lg:flex">
          <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
          <span>Platform:</span>
        </div>
        <select
          value={selectedPlatform}
          onChange={(e) => onPlatformChange(e.target.value)}
          className="w-full md:w-48 bg-slate-900 text-slate-200 text-xs font-bold rounded-xl px-3.5 py-3 border border-slate-700/80 focus:outline-none focus:border-cyan-500 cursor-pointer"
        >
          {PLATFORMS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        {(searchQuery || selectedPlatform !== 'all') && (
          <button
            onClick={onClearFilters}
            className="px-3 py-3 rounded-xl bg-slate-800 text-slate-300 hover:text-rose-400 hover:bg-slate-700 text-xs font-bold transition-all whitespace-nowrap"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
