import React from 'react';
import { CATEGORIES } from '../data/categories';
import { Smartphone, Monitor, Gamepad2, Box, CreditCard, Sparkles, Grid } from 'lucide-react';

export const CategoryTabs = ({ activeCategory, onSelectCategory }) => {
  const getIcon = (id) => {
    switch (id) {
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'pc': return <Monitor className="w-4 h-4" />;
      case 'playstation': return <Gamepad2 className="w-4 h-4" />;
      case 'xbox': return <Box className="w-4 h-4" />;
      case 'gift-cards': return <CreditCard className="w-4 h-4" />;
      case 'subscriptions': return <Sparkles className="w-4 h-4" />;
      default: return <Grid className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-2 px-1">
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap shrink-0 border ${
              isActive
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400/50 shadow-lg shadow-cyan-500/20'
                : 'bg-[#0a0f2e] text-slate-300 hover:text-cyan-300 hover:bg-[#0e1742] border-slate-800/80'
            }`}
          >
            {getIcon(cat.id)}
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
};
