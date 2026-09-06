import React from 'react';
import { Gamepad2, Smartphone, CreditCard, Sparkles, ShieldCheck } from 'lucide-react';

export default function ProductVisual({ name = 'Game', category = '', platform = '' }) {
  const getInitials = (text) => {
    if (!text) return 'DS';
    const words = text.trim().split(/\s+/);
    if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
    return (words[0][0] + (words[1] ? words[1][0] : '')).toUpperCase();
  };

  const getIcon = () => {
    switch (category) {
      case 'games':
        return <Gamepad2 className="w-10 h-10 text-cyan-400 opacity-90" />;
      case 'mobile':
        return <Smartphone className="w-10 h-10 text-blue-400 opacity-90" />;
      case 'giftcards':
        return <CreditCard className="w-10 h-10 text-purple-400 opacity-90" />;
      case 'subscriptions':
        return <Sparkles className="w-10 h-10 text-cyan-300 opacity-90" />;
      default:
        return <ShieldCheck className="w-10 h-10 text-blue-400 opacity-90" />;
    }
  };

  return (
    <div className="w-full h-full min-h-[190px] bg-gradient-to-br from-[#0c1322] via-[#091830] to-[#120a2a] relative overflow-hidden flex flex-col items-center justify-center p-4 border border-slate-800/80 rounded-t-xl group-hover:border-blue-500/40 transition-all duration-300">
      {/* Background Decorative Patterns */}
      <div className="absolute -right-8 -top-8 w-28 h-28 bg-blue-600/10 rounded-full blur-xl pointer-events-none"></div>
      <div className="absolute -left-8 -bottom-8 w-28 h-28 bg-purple-600/10 rounded-full blur-xl pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:12px_12px] opacity-20 pointer-events-none"></div>

      {/* Center Visual Badge */}
      <div className="z-10 flex flex-col items-center text-center space-y-2">
        <div className="w-16 h-16 rounded-2xl bg-slate-900/80 border border-slate-700/60 shadow-lg shadow-black/40 flex items-center justify-center backdrop-blur-sm group-hover:scale-105 group-hover:border-cyan-500/50 transition-all duration-300">
          {getIcon()}
        </div>

        <span className="text-xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 drop-shadow">
          {getInitials(name)}
        </span>

        <p className="text-xs font-semibold text-slate-300 max-w-[180px] truncate px-2">
          {name}
        </p>
      </div>

      {/* Platform Sub-Badge */}
      {platform && (
        <span className="absolute bottom-2 left-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-900/90 text-slate-400 border border-slate-800 rounded">
          {platform}
        </span>
      )}
    </div>
  );
}
