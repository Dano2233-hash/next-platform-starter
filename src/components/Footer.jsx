import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, MessageCircle, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 text-sm">
      {/* Top Features Banner */}
      <div className="border-b border-slate-800/60 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Instant Digital Delivery</h4>
              <p className="text-xs text-slate-400">Automated delivery via code or direct top-up</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Legal & Guaranteed</h4>
              <p className="text-xs text-slate-400">Official codes & verified regional payment methods</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">24/7 Local Support</h4>
              <p className="text-xs text-slate-400">WhatsApp & Discord support in Kurdish & Arabic</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand info */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-[1.5px]">
              <div className="w-full h-full bg-[#050505] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="text-xl font-extrabold font-heading tracking-wider text-white">
              DANO<span className="text-cyan-400">.STORE</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed">
            The leading digital gaming store for Kurdistan & Iraq. Buy original games, mobile top-ups, gift cards, and premium subscriptions securely.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://wa.me/9647500000000"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 hover:bg-emerald-600/20 text-slate-300 hover:text-emerald-400 border border-slate-800 transition-colors"
              aria-label="WhatsApp Support"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href="https://discord.gg/danostore"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-400 border border-slate-800 transition-colors"
              aria-label="Discord Community"
            >
              <Send className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-cyan-400 pl-2">
            Categories
          </h3>
          <ul className="space-y-2 text-xs">
            <li><Link to="/products?category=mobile-topups" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups</Link></li>
            <li><Link to="/products?category=paid-games" className="hover:text-cyan-400 transition-colors">Paid PC & Console Games</Link></li>
            <li><Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">Gift Cards & Codes</Link></li>
            <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Subscriptions & Services</Link></li>
          </ul>
        </div>

        {/* Platforms */}
        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
            Platforms
          </h3>
          <ul className="space-y-2 text-xs">
            <li><Link to="/products?platform=pc" className="hover:text-cyan-400 transition-colors">Steam / PC Gaming</Link></li>
            <li><Link to="/products?platform=playstation" className="hover:text-cyan-400 transition-colors">PlayStation Network</Link></li>
            <li><Link to="/products?platform=xbox" className="hover:text-cyan-400 transition-colors">Xbox Series X|S & One</Link></li>
            <li><Link to="/products?platform=mobile" className="hover:text-cyan-400 transition-colors">iOS & Android Mobile</Link></li>
          </ul>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-purple-500 pl-2">
            Accepted Payments
          </h3>
          <p className="text-xs text-slate-400 mb-3">
            Fast, local manual payment options for Kurdistan & Iraq gamers:
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-300">
              FastPay
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-blue-300">
              Korek Cash
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-purple-300">
              MasterCard / FIB
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/80 bg-[#030303] py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved.</p>
          <p className="text-[11px]">Designed & Built for Kurdistan / Iraq Gamers</p>
        </div>
      </div>
    </footer>
  );
}
