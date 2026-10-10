import React from 'react';
import { CATEGORIES } from '../data/categories';
import { Grid, Gamepad2, Smartphone, CreditCard, Sparkles } from 'lucide-react';

export const CategoryTabs = ({ activeCategory, onSelectCategory }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Gamepad2': return <Gamepad2 className="w-4 h-4" />;
      case 'Smartphone': return <Smartphone className="w-4 h-4" />;
      case 'CreditCard': return <CreditCard className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      default: return <Grid className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-950/40 border border-cyan-400/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-100 border border-slate-800/80 hover:border-slate-700'
            }`}
          >
            {getIcon(cat.icon)}
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
};
