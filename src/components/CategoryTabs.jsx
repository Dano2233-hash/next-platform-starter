import React from 'react';
import { categories } from '../data/categories';
import { Smartphone, Monitor, Gamepad2, Box, CreditCard, Sparkles, MoreHorizontal, LayoutGrid } from 'lucide-react';

export default function CategoryTabs({ activeCategory, onSelectCategory }) {
  const getIcon = (id) => {
    switch (id) {
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'pc': return <Monitor className="w-4 h-4" />;
      case 'playstation': return <Gamepad2 className="w-4 h-4" />;
      case 'xbox': return <Box className="w-4 h-4" />;
      case 'giftcards': return <CreditCard className="w-4 h-4" />;
      case 'subscriptions': return <Sparkles className="w-4 h-4" />;
      case 'others': return <MoreHorizontal className="w-4 h-4" />;
      default: return <LayoutGrid className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/25 border border-cyan-400/30'
                : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {getIcon(cat.id)}
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
