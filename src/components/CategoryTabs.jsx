import React from 'react';
import { CATEGORIES } from '../data/categories';
import { LayoutGrid, Gamepad2, Smartphone, CreditCard, Sparkles } from 'lucide-react';

export default function CategoryTabs({ activeCategory, onSelectCategory }) {
  const getIcon = (id) => {
    switch (id) {
      case 'games':
        return <Gamepad2 className="w-4 h-4" />;
      case 'mobile':
        return <Smartphone className="w-4 h-4" />;
      case 'giftcards':
        return <CreditCard className="w-4 h-4" />;
      case 'subscriptions':
        return <Sparkles className="w-4 h-4" />;
      default:
        return <LayoutGrid className="w-4 h-4" />;
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
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-900/30 border border-cyan-400/30'
                : 'bg-[#090e1a] text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800'
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
