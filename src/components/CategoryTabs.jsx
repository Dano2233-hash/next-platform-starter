import React from 'react';
import { CATEGORIES } from '../data/categories';
import * as Icons from 'lucide-react';

export default function CategoryTabs({ activeCategory, onSelectCategory }) {
  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
      {CATEGORIES.map(cat => {
        const IconComponent = Icons[cat.icon] || Icons.Gamepad2;
        const isActive = activeCategory === cat.slug || activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.slug)}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 text-white shadow-lg shadow-cyan-500/20'
                : 'bg-[#090d18] text-gray-400 hover:text-white hover:bg-gray-800/80 border border-gray-800'
            }`}
          >
            <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
