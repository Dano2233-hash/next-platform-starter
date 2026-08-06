import React from 'react';
import { CreditCard } from 'lucide-react';

export default function PaymentMethodCard({ id, name, icon, description, selected, onChange }) {
  const isSelected = selected === id;

  return (
    <label
      onClick={() => onChange(id)}
      className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 select-none ${
        isSelected
          ? 'border-[#00e5ff] bg-[#00e5ff]/5 shadow-lg shadow-[#00e5ff]/5'
          : 'border-slate-800 bg-slate-900/30 hover:border-slate-700'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${isSelected ? 'bg-[#00e5ff]/10 text-[#00e5ff]' : 'bg-slate-800 text-slate-400'}`}>
          {icon ? <span className="text-xl font-bold">{icon}</span> : <CreditCard className="w-6 h-6" />}
        </div>
        <div>
          <span className="font-bold text-white block text-base">{name}</span>
          {description && <span className="text-xs text-slate-400 block mt-0.5">{description}</span>}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
            isSelected ? 'border-[#00e5ff]' : 'border-slate-600'
          }`}
        >
          {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#00e5ff]" />}
        </div>
      </div>
    </label>
  );
}
