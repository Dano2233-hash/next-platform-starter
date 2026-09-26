import React from 'react';
import { CheckCircle2, CreditCard, Smartphone, ShieldCheck } from 'lucide-react';

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    subtitle: 'Fast & Direct Wallet Transfer in Iraq',
    accountNumber: '0750 XXX XXXX',
    color: 'from-pink-900/40 to-rose-950/60 border-pink-500/40 text-pink-300',
    icon: Smartphone,
    badge: 'Popular in Kurdistan',
  },
  {
    id: 'korek',
    name: 'Korek Telecom',
    subtitle: 'Korek Balance / Direct Transfer',
    accountNumber: '0750 XXX XXXX',
    color: 'from-amber-900/40 to-orange-950/60 border-amber-500/40 text-amber-300',
    icon: Smartphone,
    badge: 'Instant Recharge',
  },
  {
    id: 'mastercard',
    name: 'MasterCard / Visa',
    subtitle: 'NassPay / FIB / Bank MasterCard Transfer',
    accountNumber: 'xxxx-xxxx-xxxx-xxxx',
    color: 'from-cyan-900/40 to-blue-950/60 border-cyan-500/40 text-cyan-300',
    icon: CreditCard,
    badge: 'Cards Supported',
  },
];

export const PaymentMethodCard = ({ method, selected, onSelect }) => {
  const Icon = method.icon;
  const isSelected = selected === method.id;

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative overflow-hidden flex items-start gap-3 ${
        isSelected
          ? `bg-slate-900 ${method.color} shadow-lg shadow-cyan-950/30 scale-[1.01]`
          : 'bg-[#0a0f22] border-slate-800 text-slate-400 hover:border-slate-700'
      }`}
    >
      <div
        className={`p-2.5 rounded-xl border ${
          isSelected
            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
            : 'bg-slate-900 border-slate-800 text-slate-400'
        }`}
      >
        <Icon className="w-5 h-5" />
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-slate-100 text-sm flex items-center gap-2">
            <span>{method.name}</span>
            {method.badge && (
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                {method.badge}
              </span>
            )}
          </h4>
          {isSelected && <CheckCircle2 className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />}
        </div>
        <p className="text-xs text-slate-400 mt-1">{method.subtitle}</p>
      </div>
    </div>
  );
};

export default PaymentMethodCard;
