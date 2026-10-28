import React from 'react';
import { CATEGORIES } from '../data/categories';
import { Gamepad2, Smartphone, Monitor, CreditCard, Sparkles } from 'lucide-react';

export function CategoryTabs({ activeCategory, onSelectCategory }) {
  const getIcon = (id) => {
    switch (id) {
      case 'mobile':
        return <Smartphone className="w-4 h-4" />;
      case 'games':
        return <Monitor className="w-4 h-4" />;
      case 'gift-cards':
        return <CreditCard className="w-4 h-4" />;
      case 'subscriptions':
        return <Sparkles className="w-4 h-4" />;
      default:
        return <Gamepad2 className="w-4 h-4" />;
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
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs whitespace-nowrap transition-all duration-200 border ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-500/20'
                : 'bg-[#0a0f20] text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
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
