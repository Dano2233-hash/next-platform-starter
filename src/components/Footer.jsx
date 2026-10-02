import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 mt-20 text-slate-400 text-xs sm:text-sm">
      {/* Value Highlights */}
      <div className="border-b border-slate-800/60 py-8 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="p-3 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-500/30">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200">Instant Delivery</h4>
              <p className="text-xs text-slate-400">Codes & top-ups processed within minutes</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="p-3 rounded-lg bg-purple-950 text-purple-400 border border-purple-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200">100% Guaranteed</h4>
              <p className="text-xs text-slate-400">Official license keys & legal top-up channels</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="p-3 rounded-lg bg-blue-950 text-blue-400 border border-blue-500/30">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200">Kurdistan Support</h4>
              <p className="text-xs text-slate-400">Dedicated assistance via WhatsApp & Discord</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand Info */}
        <div className="space-y-4 md:col-span-1">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-heading">
              DANO STORE
            </span>
          </Link>

          <p className="text-xs leading-relaxed text-slate-400">
            The premium digital gaming store serving Kurdistan and Iraq. Fast, safe, and reliable top-ups for PUBG, Free Fire, Valorant, PC games, and gift cards.
          </p>

          <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-bold text-cyan-400">IQD Only</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-bold text-purple-400">24/7 Digital</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          <h4 className="font-bold text-slate-200 text-sm font-heading tracking-wide">Quick Navigation</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/products?platform=PC" className="hover:text-cyan-400 transition-colors">PC Games</Link></li>
            <li><Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">PlayStation Games</Link></li>
            <li><Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">Xbox Store</Link></li>
            <li><Link to="/products?platform=Mobile" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups</Link></li>
            <li><Link to="/products?category=giftcards" className="hover:text-cyan-400 transition-colors">Gift Cards</Link></li>
            <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Digital Subscriptions</Link></li>
          </ul>
        </div>

        {/* Top Services */}
        <div className="space-y-3">
          <h4 className="font-bold text-slate-200 text-sm font-heading tracking-wide">Popular Services</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/product/pubg-mobile-uc" className="hover:text-cyan-400 transition-colors">PUBG Mobile UC</Link></li>
            <li><Link to="/product/free-fire-diamonds" className="hover:text-cyan-400 transition-colors">Free Fire Diamonds</Link></li>
            <li><Link to="/product/valorant-points" className="hover:text-cyan-400 transition-colors">Valorant Points VP</Link></li>
            <li><Link to="/product/steam-wallet" className="hover:text-cyan-400 transition-colors">Steam Wallet Codes</Link></li>
            <li><Link to="/product/discord-nitro" className="hover:text-cyan-400 transition-colors">Discord Nitro Boost</Link></li>
            <li><Link to="/product/gta-v" className="hover:text-cyan-400 transition-colors">GTA V Premium Edition</Link></li>
          </ul>
        </div>

        {/* Local Payment Methods */}
        <div className="space-y-3">
          <h4 className="font-bold text-slate-200 text-sm font-heading tracking-wide">Payment Options</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            We support local, easy, and manual payment methods across Iraq & Kurdistan:
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="px-3 py-1 rounded-lg bg-orange-950/80 border border-orange-500/30 text-orange-400 text-xs font-bold">
              FastPay
            </span>
            <span className="px-3 py-1 rounded-lg bg-rose-950/80 border border-rose-500/30 text-rose-400 text-xs font-bold">
              Korek Cash
            </span>
            <span className="px-3 py-1 rounded-lg bg-blue-950/80 border border-blue-500/30 text-blue-400 text-xs font-bold">
              MasterCard / FIB
            </span>
          </div>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built for Kurdistan & Iraq gamers with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
