import React from 'react';
import { CheckCircle2, Smartphone, CreditCard, Radio } from 'lucide-react';

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    subtitle: 'Pay via FastPay Mobile Wallet',
    icon: Smartphone,
    color: 'from-cyan-500 to-blue-600',
    number: '0750 123 4567'
  },
  {
    id: 'korek',
    name: 'Korek Telecom',
    subtitle: 'Korek Balance / Mobile Pay',
    icon: Smartphone,
    color: 'from-blue-600 to-indigo-600',
    number: '0750 987 6543'
  },
  {
    id: 'mastercard',
    name: 'MasterCard / Visa',
    subtitle: 'Local Iraqi MasterCard Transfer',
    icon: CreditCard,
    color: 'from-purple-600 to-cyan-500',
    number: '5241 **** **** 8890'
  }
];

export const PaymentMethodCard = ({ method, selected, onSelect }) => {
  const Icon = method.icon;
  const isSelected = selected === method.id;

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
        isSelected
          ? 'bg-[#0e172e] border-cyan-500/80 ring-1 ring-cyan-500/50 shadow-lg shadow-cyan-950/40'
          : 'bg-[#080d1a] border-slate-800/80 hover:border-slate-700'
      }`}
    >
      <div className="flex items-center gap-3.5">
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${method.color} p-0.5 flex items-center justify-center shrink-0 shadow`}
        >
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
            <Icon className="w-5 h-5 text-cyan-400" />
          </div>
        </div>

        <div>
          <h4 className="font-bold text-sm text-slate-100">{method.name}</h4>
          <p className="text-xs text-slate-400">{method.subtitle}</p>
        </div>
      </div>

      <div className="shrink-0 pl-2">
        {isSelected ? (
          <CheckCircle2 className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
        ) : (
          <Radio className="w-5 h-5 text-slate-600" />
        )}
      </div>
    </div>
  );
};

export default PaymentMethodCard;
