import React from 'react';
import { Gamepad2, ShieldCheck, Zap } from 'lucide-react';

export default function ProductVisual({ name = "Product", category = "", platform = "", className = "" }) {
  // Generate clean initials badge (e.g., PUBG Mobile UC -> PM, Red Dead Redemption -> RD)
  const words = name.trim().split(/\s+/);
  const initials = words.length >= 2
    ? (words[0][0] + words[1][0]).toUpperCase()
    : words[0]?.substring(0, 2).toUpperCase() || "DS";

  // Gradient themes based on platform/category
  let bgGradient = "from-slate-900 via-blue-950 to-cyan-950";
  let badgeColor = "border-cyan-500/30 text-cyan-400 bg-cyan-500/10";

  if (platform === "Xbox") {
    bgGradient = "from-slate-900 via-emerald-950 to-slate-900";
    badgeColor = "border-emerald-500/30 text-emerald-400 bg-emerald-500/10";
  } else if (platform === "PlayStation") {
    bgGradient = "from-slate-900 via-blue-950 to-slate-950";
    badgeColor = "border-blue-500/30 text-blue-400 bg-blue-500/10";
  } else if (category === "subscriptions") {
    bgGradient = "from-slate-900 via-purple-950 to-slate-950";
    badgeColor = "border-purple-500/30 text-purple-400 bg-purple-500/10";
  }

  return (
    <div className={`relative w-full h-full min-h-[160px] bg-gradient-to-br ${bgGradient} border border-slate-800/80 rounded-xl overflow-hidden flex flex-col justify-between p-4 shadow-inner ${className}`}>
      {/* Decorative background accent grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00e5ff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between z-10">
        <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border ${badgeColor}`}>
          {platform || category || "DIGITAL"}
        </span>
        <Zap className="w-3.5 h-3.5 text-cyan-400 opacity-80" />
      </div>

      {/* Central Initials Badge */}
      <div className="my-auto text-center py-2 z-10">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-900/90 border border-slate-700/60 shadow-xl mb-1.5">
          <span className="text-base font-black tracking-wider text-cyan-400">{initials}</span>
        </div>
        <h3 className="text-xs font-bold text-white line-clamp-1 px-1 drop-shadow-sm">
          {name}
        </h3>
      </div>

      {/* Footer info */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 z-10 pt-1 border-t border-slate-800/40">
        <span className="font-semibold text-slate-300">DANO STORE</span>
        <span className="flex items-center space-x-1 text-emerald-400">
          <ShieldCheck className="w-3 h-3" />
          <span>Official Key</span>
        </span>
      </div>
    </div>
  );
}
