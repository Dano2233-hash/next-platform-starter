import React from 'react';
import { CATEGORIES } from '../data/categories';
import { Grid, Smartphone, Gamepad2, Gift, Sparkles } from 'lucide-react';

export const CategoryTabs = ({ selectedCategory, onSelectCategory }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Smartphone': return Smartphone;
      case 'Gamepad2': return Gamepad2;
      case 'Gift': return Gift;
      case 'Sparkles': return Sparkles;
      default: return Grid;
    }
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
      {CATEGORIES.map((cat) => {
        const IconComponent = getIcon(cat.icon);
        const isActive = selectedCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800 hover:border-slate-700'
            }`}
          >
            <IconComponent className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-cyan-400'}`} />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
};
