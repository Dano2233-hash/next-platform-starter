import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, MessageCircle, Send } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#03050a] border-t border-slate-800/80 pt-14 pb-8 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-column footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-[1.5px] shadow-lg shadow-blue-500/20">
                <div className="w-full h-full bg-[#05070f] rounded-[10px] flex items-center justify-center">
                  <Gamepad2 className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-extrabold text-white">Dano Store</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Kurdistan & Iraq&apos;s leading digital gaming storefront. Providing official game codes, instant mobile top-ups, gift cards, and premium subscriptions with localized customer support.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/9647501234567"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 transition-colors"
                title="WhatsApp Support"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/danostore"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 transition-colors"
                title="Telegram Channel"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-cyan-500 pl-2">
              Categories
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">
                  Mobile Top-Ups (PUBG, Free Fire)
                </Link>
              </li>
              <li>
                <Link to="/products?category=pc" className="hover:text-cyan-400 transition-colors">
                  PC Games (Steam & Epic)
                </Link>
              </li>
              <li>
                <Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">
                  Gift Cards (Steam, PSN, Xbox)
                </Link>
              </li>
              <li>
                <Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">
                  Subscriptions (Discord, YouTube)
                </Link>
              </li>
              <li>
                <Link to="/products?category=playstation" className="hover:text-cyan-400 transition-colors">
                  PlayStation Network Codes
                </Link>
              </li>
              <li>
                <Link to="/products?category=xbox" className="hover:text-cyan-400 transition-colors">
                  Xbox Game Pass & Games
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment Methods Info */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-purple-500 pl-2">
              Local Payment Methods
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              We exclusively support trusted Iraqi payment channels for quick manual validation:
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                <span className="text-sm font-semibold text-slate-200">FastPay Iraq</span>
                <span className="text-[10px] ml-auto text-slate-400 font-mono">0750 123 4567</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span className="text-sm font-semibold text-slate-200">Korek Telecom</span>
                <span className="text-[10px] ml-auto text-slate-400 font-mono">0750 987 6543</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                <span className="text-sm font-semibold text-slate-200">MasterCard / FIB</span>
                <span className="text-[10px] ml-auto text-slate-400 font-mono">Direct Transfer</span>
              </div>
            </div>
          </div>

          {/* Customer Trust & Support */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
              Customer Trust
            </h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>100% Genuine, authentic licenses directly authorized for regional gamers.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Average digital dispatch speed under 5-15 minutes after payment verification.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Headphones className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Kurdish, Arabic, and English live support via WhatsApp and Discord.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Built for Kurdistan & Iraq Gamers.</p>
          <div className="flex items-center gap-4">
            <Link to="/products" className="hover:text-slate-400">Store</Link>
            <Link to="/cart" className="hover:text-slate-400">Cart</Link>
            <Link to="/admin-login" className="hover:text-slate-400">Staff Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
