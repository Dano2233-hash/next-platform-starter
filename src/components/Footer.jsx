import React from 'react';
import { Gamepad2, Shield, Heart, Zap, PhoneCall } from 'lucide-react';

export default function Footer({ navigate }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#030305] border-t border-white/5 pt-16 pb-8 text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 text-left">
          {/* Logo & Bio */}
          <div className="md:col-span-1 space-y-4">
            <div
              onClick={() => navigate('/')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                <Gamepad2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-black tracking-wider text-white uppercase">
                Dano Store
              </span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Kurdistan and Iraq's premier destination for safe, instant, and official digital game keys, top-ups, subscriptions, and legal gaming services.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-widest">Platforms</h4>
            <div className="flex flex-col gap-2 text-xs">
              <button onClick={() => navigate('/xbox')} className="hover:text-cyan-400 transition-colors text-left">Xbox Store</button>
              <button onClick={() => navigate('/playstation')} className="hover:text-cyan-400 transition-colors text-left">PlayStation Network</button>
              <button onClick={() => navigate('/pc')} className="hover:text-cyan-400 transition-colors text-left">PC Steam & Epic</button>
              <button onClick={() => navigate('/mobile')} className="hover:text-cyan-400 transition-colors text-left">Mobile Top-Ups</button>
            </div>
          </div>

          {/* Popular Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-widest">Digital Products</h4>
            <div className="flex flex-col gap-2 text-xs">
              <button onClick={() => navigate('/gift-cards')} className="hover:text-cyan-400 transition-colors text-left">Steam & iTunes Cards</button>
              <button onClick={() => navigate('/subscriptions')} className="hover:text-cyan-400 transition-colors text-left">Discord Nitro & Netflix</button>
              <button onClick={() => navigate('/products')} className="hover:text-cyan-400 transition-colors text-left">All Gaming Products</button>
              <button onClick={() => navigate('/admin')} className="hover:text-cyan-400 transition-colors text-left">Admin Console</button>
            </div>
          </div>

          {/* Core Guarantees */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-widest">Why Choose Us?</h4>
            <div className="space-y-3 text-xs text-zinc-500">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Secure & Legal Keys</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Instant Delivery & Activation</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-purple-400 shrink-0" />
                <span>24/7 Local Kurdish Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600 text-center md:text-left">
            &copy; {currentYear} Dano Store. All rights reserved. Created for gamers in Erbil, Sulaymaniyah, Duhok, and all of Iraq.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-zinc-600">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
            <span>for the Iraqi Gaming Community.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
