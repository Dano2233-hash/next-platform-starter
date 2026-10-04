import React from 'react';
import { Gamepad2, Smartphone, CreditCard, Sparkles, ShieldCheck } from 'lucide-react';

export default function ProductVisual({ product, className = 'h-48' }) {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'topups':
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'giftcards':
        return <CreditCard className="w-5 h-5 text-purple-400" />;
      case 'subscriptions':
        return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'games':
      default:
        return <Gamepad2 className="w-5 h-5 text-blue-400" />;
    }
  };

  const getInitials = (name) => {
    if (!name) return 'DS';
    const words = name.trim().split(' ');
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const initials = getInitials(product?.name);

  return (
    <div
      className={`w-full ${className} bg-gradient-to-br from-[#0c1428] via-[#111c38] to-[#070b19] border border-slate-800 flex flex-col justify-between p-4 relative overflow-hidden group select-none`}
    >
      {/* Background Decorative Pattern */}
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all duration-500" />
      <div className="absolute -left-8 -top-8 w-32 h-32 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all duration-500" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />

      {/* Top Header Row */}
      <div className="flex items-center justify-between relative z-10">
        <span className="text-[10px] font-bold tracking-wider uppercase bg-slate-900/80 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-md flex items-center gap-1 backdrop-blur-md">
          {getCategoryIcon(product?.category)}
          {product?.platform || 'Digital'}
        </span>
        <div className="w-7 h-7 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-300">
          DS
        </div>
      </div>

      {/* Center Initials Badge */}
      <div className="flex flex-col items-center justify-center my-auto relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1px] shadow-lg shadow-cyan-500/10 group-hover:scale-105 transition-transform duration-300">
          <div className="w-full h-full bg-[#090e1f] rounded-[15px] flex items-center justify-center">
            <span className="font-heading font-extrabold text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 tracking-wider">
              {initials}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="relative z-10 flex items-end justify-between border-t border-slate-800/80 pt-2">
        <div className="truncate pr-2">
          <p className="text-xs font-semibold text-slate-200 truncate">{product?.name || 'Digital Gaming Item'}</p>
          <p className="text-[10px] text-slate-400 capitalize">{product?.type || 'Official Key'}</p>
        </div>
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
      </div>
    </div>
  );
}
