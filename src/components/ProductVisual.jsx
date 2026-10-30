import React from 'react';
import { Gamepad2, Smartphone, CreditCard, Zap, Shield, Sparkles } from 'lucide-react';

export default function ProductVisual({ name, category, platform }) {
  // Get initials (up to 2 characters)
  const getInitials = (text) => {
    if (!text) return 'DS';
    const words = text.trim().split(/\s+/);
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const initials = getInitials(name);

  // Choose icon based on category or platform
  const getCategoryIcon = () => {
    if (category === 'mobile-topups' || platform === 'mobile') return <Smartphone className="w-5 h-5 text-cyan-400" />;
    if (category === 'gift-cards' || platform === 'gift-card') return <CreditCard className="w-5 h-5 text-purple-400" />;
    if (category === 'subscriptions') return <Zap className="w-5 h-5 text-blue-400" />;
    return <Gamepad2 className="w-5 h-5 text-cyan-400" />;
  };

  const formattedPlatform = platform ? platform.toUpperCase() : 'DIGITAL';
  const formattedCategory = category ? category.replace('-', ' ').toUpperCase() : 'STORE ITEM';

  return (
    <div className="relative w-full h-full min-h-[180px] bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#020617] p-5 flex flex-col justify-between overflow-hidden group select-none">
      {/* Background Subtle Geometric Pattern */}
      <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-cyan-500/10 blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500" />
      <div className="absolute -left-8 -top-8 w-32 h-32 rounded-full bg-purple-500/10 blur-2xl group-hover:bg-purple-500/20 transition-all duration-500" />

      {/* Grid line accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" />

      {/* Top Bar: Platform & Category badges */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-700/60 text-[11px] font-semibold text-cyan-300 backdrop-blur-md">
          {getCategoryIcon()}
          <span>{formattedPlatform}</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-purple-900/40 border border-purple-500/30 text-[10px] font-medium text-purple-300">
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span>OFFICIAL</span>
        </div>
      </div>

      {/* Middle: Initials Badge & Name */}
      <div className="relative z-10 flex flex-col items-center justify-center my-3 text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300 mb-2">
          <div className="w-full h-full bg-[#0b0f19] rounded-[14px] flex items-center justify-center">
            <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 bg-clip-text text-transparent">
              {initials}
            </span>
          </div>
        </div>
        <h4 className="text-sm font-bold text-slate-100 line-clamp-1 max-w-[90%] tracking-wide">
          {name || 'Digital Game'}
        </h4>
      </div>

      {/* Bottom Bar: Brand Watermark & Tag */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 font-medium">
        <span className="flex items-center gap-1 text-slate-400">
          <Shield className="w-3 h-3 text-cyan-400" />
          {formattedCategory}
        </span>
        <span className="text-cyan-400 font-bold tracking-widest text-[9px] uppercase">
          DANO STORE
        </span>
      </div>
    </div>
  );
}
