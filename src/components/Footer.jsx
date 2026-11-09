import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, MessageCircle, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#03050c] border-t border-white/5 pt-16 pb-12 text-slate-400 text-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-white/5">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/40 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Instant Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">Codes and top-ups delivered within minutes.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/40 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white">100% Genuine & Legal</h4>
              <p className="text-xs text-slate-400 mt-0.5">Official digital licenses and secure direct top-ups.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/40 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Local Kurdistan & Iraq Support</h4>
              <p className="text-xs text-slate-400 mt-0.5">Assistance available on WhatsApp & Discord.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 py-12">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5">
                <div className="w-full h-full bg-[#070b19] rounded-[10px] flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="font-heading text-xl font-bold tracking-wider text-white">
                DANO <span className="text-cyan-400">STORE</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              The premier digital gaming marketplace catering to Iraqi and Kurdistan gamers.
              Find authentic Steam keys, console games, PUBG UC, Fortnite V-Bucks, gift cards, and subscriptions.
            </p>

            {/* Accepted payment methods display */}
            <div className="pt-2">
              <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-2">
                Accepted Payment Methods
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-[#00c389]/10 border border-[#00c389]/30 text-[#00c389] text-xs font-bold">
                  FastPay
                </span>
                <span className="px-3 py-1 rounded-md bg-[#ffc107]/10 border border-[#ffc107]/30 text-[#ffc107] text-xs font-bold">
                  Korek Telecom
                </span>
                <span className="px-3 py-1 rounded-md bg-[#eb001b]/10 border border-[#eb001b]/30 text-rose-400 text-xs font-bold">
                  MasterCard
                </span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-4">Categories</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/products?category=games" className="hover:text-cyan-400 transition-colors">PC Games</Link></li>
              <li><Link to="/products?category=mobile-topup" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups</Link></li>
              <li><Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">Gift Cards</Link></li>
              <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Subscriptions</Link></li>
              <li><Link to="/products?sale=true" className="hover:text-amber-400 transition-colors">Flash Deals</Link></li>
            </ul>
          </div>

          {/* Gaming Platforms */}
          <div>
            <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-4">Platforms</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/products?platform=PC" className="hover:text-cyan-400 transition-colors">Steam / PC</Link></li>
              <li><Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">PlayStation Store</Link></li>
              <li><Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">Xbox Network</Link></li>
              <li><Link to="/products?platform=Mobile" className="hover:text-cyan-400 transition-colors">iOS & Android</Link></li>
            </ul>
          </div>

          {/* Community & Admin */}
          <div>
            <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-4">Customer Support</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://wa.me/9647501234567" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Support</span>
                </a>
              </li>
              <li>
                <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 flex items-center gap-1.5 transition-colors">
                  <Send className="w-3.5 h-3.5" />
                  <span>Discord Community</span>
                </a>
              </li>
              <li className="pt-2">
                <Link to="/admin-login" className="text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Staff Portal</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Gaming Store for Kurdistan & Iraq.</p>
          <p className="text-[11px] text-slate-600">Prices strictly in Iraqi Dinar (IQD). Manual confirmation required.</p>
        </div>
      </div>
    </footer>
  );
}
