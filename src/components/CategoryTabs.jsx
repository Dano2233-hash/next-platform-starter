import React from 'react';
import { Sparkles, Smartphone, Gamepad2, CreditCard, Zap, Boxes } from 'lucide-react';

const iconMap = {
  Sparkles,
  Smartphone,
  Gamepad2,
  CreditCard,
  Zap,
  Boxes
};

export default function CategoryTabs({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {categories.map((cat) => {
        const Icon = iconMap[cat.icon] || Boxes;
        const isActive = selectedCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-cyan-400/40 shadow-lg shadow-cyan-900/30'
                : 'bg-[#090e1d] hover:bg-[#0f172a] text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
