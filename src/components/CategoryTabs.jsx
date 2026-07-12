import React from 'react';
import { categories } from '../data/categories';

const CategoryTabs = ({ activeCategory, onSelect }) => {
  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            activeCategory === cat.id
              ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/30'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
