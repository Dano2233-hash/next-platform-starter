import React from 'react';
import { Gamepad2, Smartphone, CreditCard, Sparkles, Layers } from 'lucide-react';

export default function ProductVisual({ name, category, platform }) {
  const getInitials = (text) => {
    if (!text) return 'DS';
    const words = text.split(' ').filter(Boolean);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return text.substring(0, 2).toUpperCase();
  };

  const getCategoryIcon = (cat) => {
    switch ((cat || '').toLowerCase()) {
      case 'mobile':
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'gift-cards':
      case 'gift card':
        return <CreditCard className="w-5 h-5 text-purple-400" />;
      case 'subscriptions':
        return <Sparkles className="w-5 h-5 text-pink-400" />;
      case 'games':
        return <Gamepad2 className="w-5 h-5 text-blue-400" />;
      default:
        return <Layers className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="w-full h-full relative min-h-[180px] bg-gradient-to-br from-[#0b1329] via-[#081b3b] to-[#120a2e] flex flex-col items-center justify-between p-4 overflow-hidden group select-none">
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1.25rem_1.25rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25"></div>

      {/* Glow Effects */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl group-hover:bg-cyan-500/35 transition-all duration-500"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-600/20 rounded-full blur-2xl group-hover:bg-purple-600/35 transition-all duration-500"></div>

      {/* Top Meta Info */}
      <div className="w-full flex items-center justify-between z-10">
        <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-slate-900/80 text-cyan-300 border border-cyan-500/30">
          {platform || 'Digital'}
        </span>
        <div className="p-1.5 rounded-lg bg-slate-900/60 border border-slate-700/50">
          {getCategoryIcon(category)}
        </div>
      </div>

      {/* Center Initials & Title */}
      <div className="my-auto text-center z-10 flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/10 mb-2 transform group-hover:scale-105 transition-transform duration-300">
          <div className="w-full h-full bg-[#070b14] rounded-[14px] flex items-center justify-center">
            <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400">
              {getInitials(name)}
            </span>
          </div>
        </div>
        <h4 className="text-sm font-bold text-slate-100 line-clamp-2 max-w-[180px] drop-shadow-sm">
          {name || 'Digital Item'}
        </h4>
      </div>

      {/* Bottom Subtitle / Brand */}
      <div className="w-full flex items-center justify-center z-10">
        <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
          DANO STORE
        </span>
      </div>
    </div>
  );
}
