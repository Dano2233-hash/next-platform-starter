import React, { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { PLATFORMS } from '../data/categories';

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  selectedPlatform,
  setSelectedPlatform
}) {
  return (
    <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-3 sm:p-4 shadow-xl">
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, category, game title, UC, V-Bucks..."
            className="w-full bg-slate-950 text-sm text-slate-100 placeholder-slate-400 pl-10 pr-10 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500 transition-all"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3.5 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Platform Selector Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase tracking-wider px-2 shrink-0">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>Platform:</span>
          </div>
          <div className="flex gap-1.5">
            {PLATFORMS.map((plat) => {
              const isActive = selectedPlatform === plat.id;
              return (
                <button
                  key={plat.id}
                  onClick={() => setSelectedPlatform(plat.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {plat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
