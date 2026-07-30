import React from 'react';
import * as Icons from 'lucide-react';

export default function CategoryTabs({ activeCategory, onCategoryChange, categories }) {
  return (
    <div className="flex gap-2.5 overflow-x-auto pb-3 scrollbar-none select-none max-w-full">
      {categories.map((cat) => {
        // Dynamically match Lucide Icons based on data
        let IconComponent = Icons.Gamepad2;
        if (cat.icon === 'Laptop') IconComponent = Icons.Laptop;
        else if (cat.icon === 'Xbox') IconComponent = Icons.Gamepad2; // Fallback or customize
        else if (cat.icon === 'PlayStation') IconComponent = Icons.Dribbble; // Use standard React/lucide icons or customize
        else if (cat.icon === 'Smartphone') IconComponent = Icons.Smartphone;
        else if (cat.icon === 'Ticket') IconComponent = Icons.Ticket;
        else if (cat.icon === 'Sparkles') IconComponent = Icons.Sparkles;
        else if (cat.icon === 'Layers') IconComponent = Icons.Layers;

        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-300 border ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg shadow-blue-500/20 scale-102'
                : 'bg-[#0d0d12] hover:bg-white/[0.04] text-zinc-400 hover:text-white border-white/5'
            }`}
          >
            <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
