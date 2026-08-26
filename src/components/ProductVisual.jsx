import React from 'react';

export default function ProductVisual({ name, category, platform, heightClass = 'h-48' }) {
  // Generate initials from product name (e.g. PUBG Mobile -> PM)
  const initials = name
    ? name
        .split(' ')
        .filter(w => w.length > 0 && !['&', 'and', 'the', 'of', 'for'].includes(w.toLowerCase()))
        .slice(0, 2)
        .map(w => w[0].toUpperCase())
        .join('')
    : 'DS';

  return (
    <div
      className={`w-full ${heightClass} relative overflow-hidden bg-gradient-to-br from-[#0c1427] via-[#121a36] to-[#1e1136] border border-cyan-500/20 flex flex-col justify-between p-4 selection:bg-none`}
    >
      {/* Background Decorative Shapes */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-600/10 rounded-full blur-xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#00e5ff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

      {/* Top Header info */}
      <div className="flex items-center justify-between z-10">
        <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-blue-900/40 text-blue-400 border border-blue-500/30">
          {platform || 'Digital'}
        </span>
        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
          {category || 'Gaming'}
        </span>
      </div>

      {/* Center Initials Badge */}
      <div className="my-auto text-center z-10 flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/10 mb-2">
          <div className="w-full h-full bg-[#090d18] rounded-[15px] flex items-center justify-center">
            <span className="text-xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              {initials}
            </span>
          </div>
        </div>
        <h4 className="text-xs font-bold text-gray-200 line-clamp-1 max-w-[85%] text-center">
          {name}
        </h4>
      </div>

      {/* Bottom Store Branding */}
      <div className="flex items-center justify-between z-10 pt-1 border-t border-gray-800/60">
        <span className="text-[9px] font-bold text-cyan-400/80 tracking-widest uppercase">
          DANO STORE
        </span>
        <span className="text-[9px] text-gray-500 font-medium">
          Official Digital
        </span>
      </div>
    </div>
  );
}
