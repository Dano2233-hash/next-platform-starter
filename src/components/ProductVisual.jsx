import React from 'react';
import { Gamepad2, Shield, Zap, Sparkles, Smartphone, Gift, Monitor } from 'lucide-react';

export function ProductVisual({ name = '', category = '', platform = '' }) {
  const getInitials = (text) => {
    if (!text) return 'DS';
    const words = text.trim().split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return text.substring(0, 2).toUpperCase();
  };

  const getPlatformIcon = (plat) => {
    const p = (plat || '').toLowerCase();
    if (p.includes('mobile')) return <Smartphone className="w-4 h-4 text-cyan-400" />;
    if (p.includes('gift')) return <Gift className="w-4 h-4 text-amber-400" />;
    if (p.includes('subscription')) return <Sparkles className="w-4 h-4 text-purple-400" />;
    return <Monitor className="w-4 h-4 text-blue-400" />;
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#0d1527] to-[#120826] flex flex-col justify-between p-4 border border-slate-800/80 rounded-xl group-hover:border-cyan-500/40 transition-all duration-300">
      {/* Background glowing shapes */}
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-blue-600/10 rounded-full blur-xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-purple-600/10 rounded-full blur-xl pointer-events-none" />

      {/* Top Bar */}
      <div className="flex items-center justify-between z-10">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800/80 text-slate-300 border border-slate-700/60 backdrop-blur-md">
          {getPlatformIcon(platform)}
          <span>{platform || 'Digital'}</span>
        </span>
        <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase bg-slate-950/50 px-2 py-0.5 rounded border border-slate-800">
          Official Digital
        </span>
      </div>

      {/* Center Visual Badge */}
      <div className="my-auto py-3 flex flex-col items-center justify-center text-center z-10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/10 group-hover:shadow-cyan-500/30 transition-shadow">
          <div className="w-full h-full bg-[#0a0f1d] rounded-[14px] flex items-center justify-center">
            <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              {getInitials(name)}
            </span>
          </div>
        </div>
        <h4 className="mt-3 text-sm font-bold text-slate-100 line-clamp-1 group-hover:text-cyan-400 transition-colors">
          {name}
        </h4>
      </div>

      {/* Bottom info */}
      <div className="flex items-center justify-between border-t border-slate-800/60 pt-2 z-10 text-[11px] text-slate-400">
        <span className="capitalize">{category || 'Gaming'}</span>
        <span className="flex items-center gap-1 text-cyan-400 font-medium">
          <Zap className="w-3 h-3" /> Instant Code
        </span>
      </div>
    </div>
  );
}
