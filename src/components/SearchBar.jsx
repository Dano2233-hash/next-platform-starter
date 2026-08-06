import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ onSearch, placeholder = 'Search games, top-ups, cards...', initialValue = '' }) {
  const [value, setValue] = useState(initialValue);

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);
    onSearch(val);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
        <Search className="w-5 h-5" />
      </div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full bg-[#0a0a0c] border border-slate-800 text-slate-100 placeholder-slate-500 pl-11 pr-10 py-2.5 rounded-full text-sm focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] transition-all duration-200"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
