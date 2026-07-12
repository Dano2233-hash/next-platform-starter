import React from 'react';
import { Check } from 'lucide-react';

const PaymentMethodCard = ({ id, name, icon, selected, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(id)}
      className={`relative w-full p-4 rounded-xl border-2 text-left transition-all duration-200 group ${
        selected
        ? 'border-accent-blue bg-accent-blue/10'
        : 'border-white/10 bg-white/5 hover:border-white/20'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
             selected ? 'bg-accent-blue text-white' : 'bg-dark-700 text-gray-400'
          }`}>
            {icon}
          </div>
          <span className={`font-bold ${selected ? 'text-white' : 'text-gray-300'}`}>{name}</span>
        </div>
        {selected && (
          <div className="w-6 h-6 bg-accent-blue rounded-full flex items-center justify-center text-white">
            <Check size={14} strokeWidth={3} />
          </div>
        )}
      </div>

      {/* Visual background effect */}
      {selected && (
        <div className="absolute inset-0 bg-accent-blue/5 rounded-xl animate-pulse pointer-events-none" />
      )}
    </button>
  );
};

export default PaymentMethodCard;
