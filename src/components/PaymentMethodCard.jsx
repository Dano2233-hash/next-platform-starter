import React from 'react'
import { Check, Wallet, Smartphone, CreditCard } from 'lucide-react'

export function PaymentMethodCard({ method, isSelected, onSelect }) {
  const getIcon = (id) => {
    switch (id) {
      case 'fastpay':
        return <Wallet className="w-5 h-5 text-emerald-400" />
      case 'korek':
        return <Smartphone className="w-5 h-5 text-amber-400" />
      case 'mastercard':
        return <CreditCard className="w-5 h-5 text-cyan-400" />
      default:
        return <CreditCard className="w-5 h-5 text-slate-400" />
    }
  }

  return (
    <div
      onClick={onSelect}
      className={`relative cursor-pointer p-4 rounded-2xl border transition-all ${
        isSelected
          ? 'bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/10'
          : 'bg-[#0a0f1d] border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            {getIcon(method.id)}
          </div>
          <div>
            <h4 className="font-bold text-slate-100 text-sm">{method.name}</h4>
            <p className="text-xs text-slate-400 mt-0.5">{method.description}</p>
          </div>
        </div>

        <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
          isSelected
            ? 'bg-cyan-500 border-cyan-400 text-slate-950'
            : 'border-slate-700 bg-slate-900'
        }`}>
          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </div>
      </div>

      {isSelected && (
        <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs space-y-1.5 animate-fadeIn">
          <div className="flex items-center justify-between font-mono bg-slate-950/80 p-2 rounded-lg border border-slate-800">
            <span className="text-slate-400">Account / Number:</span>
            <span className="text-cyan-300 font-bold">{method.accountNumber}</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            {method.instructions}
          </p>
        </div>
      )}
    </div>
  )
}
