import React from 'react';
import { Gamepad2, Smartphone, CreditCard, Sparkles, Box, Monitor, ShieldCheck } from 'lucide-react';

/**
 * ProductVisual fallback component:
 * - Be used only as fallback
 * - React and Tailwind CSS only
 * - Shows product name
 * - Shows category
 * - Shows platform
 * - Shows initials badge
 * - Clean premium gaming gradient
 */
export function ProductVisual({ name, category, platform, type }) {
  // Generate 2-3 letter uppercase initials
  const initials = (name || 'DS')
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 3)
    .map((word) => word[0].toUpperCase())
    .join('');

  // Icon selector based on category or platform
  const renderIcon = () => {
    const p = (platform || '').toLowerCase();
    const c = (category || '').toLowerCase();

    if (p.includes('mobile') || c.includes('mobile')) return <Smartphone className="w-5 h-5 text-cyan-400" />;
    if (c.includes('gift') || type === 'Gift Card') return <CreditCard className="w-5 h-5 text-purple-400" />;
    if (c.includes('sub') || type === 'Subscription') return <Sparkles className="w-5 h-5 text-amber-400" />;
    if (p.includes('xbox') || c.includes('xbox')) return <Box className="w-5 h-5 text-emerald-400" />;
    if (p.includes('pc') || c.includes('pc')) return <Monitor className="w-5 h-5 text-blue-400" />;
    return <Gamepad2 className="w-5 h-5 text-cyan-400" />;
  };

  return (
    <div className="w-full h-full min-h-[190px] relative overflow-hidden bg-gradient-to-br from-[#0c1224] via-[#090d1f] to-[#120e29] border border-slate-800/80 rounded-t-xl flex flex-col justify-between p-4 group-hover:border-cyan-500/30 transition-colors">
      {/* Background ambient glow effect */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top row badges */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-700/60 backdrop-blur-md text-[11px] font-semibold text-slate-300">
          {renderIcon()}
          <span>{platform || 'Digital'}</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase text-cyan-400/90 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
          <ShieldCheck className="w-3 h-3 text-cyan-400" />
          <span>Verified</span>
        </div>
      </div>

      {/* Center Initials & Brand Badge */}
      <div className="my-auto text-center py-2 z-10 flex flex-col items-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600/30 via-cyan-500/20 to-purple-600/30 border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-950/40 mb-2 group-hover:scale-105 transition-transform">
          <span className="font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-purple-300 font-mono">
            {initials || 'DS'}
          </span>
        </div>
        <span className="text-xs font-semibold text-slate-300 line-clamp-1 max-w-[200px] px-2 text-center">
          {name}
        </span>
      </div>

      {/* Bottom Category Info */}
      <div className="z-10 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/60 pt-2">
        <span className="capitalize">{category?.replace(/-/g, ' ') || 'Digital Game'}</span>
        <span className="text-[10px] font-medium text-slate-500">DANO STORE</span>
      </div>
    </div>
  );
}

export default ProductVisual;
