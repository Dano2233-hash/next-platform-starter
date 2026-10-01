import React from 'react';
import { Check, ShieldCheck, CreditCard, Smartphone, Zap } from 'lucide-react';

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    iconName: 'Zap',
    badge: 'Popular in Iraq',
    description: 'Pay instantly using FastPay Wallet ID or QR Code.',
    accountInfo: 'FastPay Account: 0750 123 4567',
    color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400'
  },
  {
    id: 'korek',
    name: 'Korek Telecom',
    iconName: 'Smartphone',
    badge: 'Mobile Transfer',
    description: 'Direct Korek credit transfer or Korek Cash.',
    accountInfo: 'Korek Number: 0750 987 6543',
    color: 'from-red-500/20 to-pink-500/10 border-red-500/30 text-red-400'
  },
  {
    id: 'mastercard',
    name: 'MasterCard / Visa',
    iconName: 'CreditCard',
    badge: 'Bank Card',
    description: 'Manual card transfer via FIB or local bank MasterCard.',
    accountInfo: 'IBAN / Card No: 0021-8834-9910-4421',
    color: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-400'
  }
];

export const PaymentMethodCard = ({ method, selected, onSelect }) => {
  const renderIcon = (name) => {
    switch (name) {
      case 'Zap':
        return <Zap className="w-6 h-6 text-amber-400" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-red-400" />;
      default:
        return <CreditCard className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(method.id)}
      className={`relative cursor-pointer rounded-xl p-4 border transition-all ${
        selected
          ? 'bg-[#0f172a] border-cyan-400 ring-2 ring-cyan-400/30 shadow-lg shadow-cyan-500/10'
          : 'bg-[#090d1a] border-gray-800 hover:border-gray-700 hover:bg-[#0c1224]'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gray-900 rounded-lg border border-gray-800">
            {renderIcon(method.iconName)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-white text-base">{method.name}</h4>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-gray-800 text-gray-300">
                {method.badge}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{method.description}</p>
          </div>
        </div>

        <div
          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
            selected
              ? 'border-cyan-400 bg-cyan-400 text-gray-950'
              : 'border-gray-600 bg-transparent'
          }`}
        >
          {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </div>
      </div>

      {selected && (
        <div className="mt-3 pt-3 border-t border-gray-800 flex items-center gap-2 text-xs text-cyan-300 font-mono bg-cyan-950/30 p-2 rounded-lg border border-cyan-900/40">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{method.accountInfo}</span>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodCard;
