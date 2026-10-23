import React from 'react';

export default function CategoryTabs({ options, selected, onSelect, label }) {
  return (
    <div className="space-y-2">
      {label && <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">{label}</span>}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {options.map((opt) => {
          const isSelected = selected === opt.id || selected === opt.name;
          return (
            <button
              key={opt.id || opt.name}
              onClick={() => onSelect(opt.id || opt.name)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
              }`}
            >
              {opt.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
