import React from 'react';

export function PaymentMethodCard({ selected, onClick, label, description }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-xl border p-4 text-left transition-all flex flex-col justify-between ${
        selected
          ? 'border-[#00e5ff] bg-[#0066ff]/10 ring-1 ring-[#00e5ff] shadow-md shadow-[#0066ff]/10'
          : 'border-[#12121e] bg-[#0c0c14] hover:border-gray-700'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-wider text-white">{label}</span>
        <div
          className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center ${
            selected ? 'border-[#00e5ff] bg-[#00e5ff]' : 'border-gray-600'
          }`}
        >
          {selected && <div className="h-2 w-2 rounded-full bg-black" />}
        </div>
      </div>
      <p className="mt-2 text-[10px] text-gray-400 leading-relaxed font-medium">{description}</p>
    </div>
  );
}
