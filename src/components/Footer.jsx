import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, HeartHandshake, Headphones, Send, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#030409] border-t border-slate-800/80 pt-12 pb-8 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Perks Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-10 mb-10 border-b border-slate-800/80">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-800">
            <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-100 text-sm">100% Genuine Digital Keys</h4>
              <p className="text-xs text-slate-400">Directly from official partners</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-800">
            <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-100 text-sm">Local Payment Support</h4>
              <p className="text-xs text-slate-400">FastPay, Korek Mobile &amp; MasterCard</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-800">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-100 text-sm">Instant Gamer Support</h4>
              <p className="text-xs text-slate-400">24/7 WhatsApp &amp; Discord assistance</p>
            </div>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10">

          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-0.5">
                <div className="w-full h-full bg-[#05070f] rounded-[6px] flex items-center justify-center">
                  <Gamepad2 className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-lg font-bold tracking-wider uppercase text-slate-100">
                Dano Store
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              The premier digital gaming hub in Kurdistan and Iraq for PC, Xbox, PlayStation, Mobile game top-ups, gift cards, and premium subscriptions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-100 uppercase tracking-wider text-xs">Categories</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/products?category=pc-games" className="hover:text-cyan-400 transition-colors">PC Games</Link></li>
              <li><Link to="/products?category=xbox" className="hover:text-cyan-400 transition-colors">Xbox Console</Link></li>
              <li><Link to="/products?category=playstation" className="hover:text-cyan-400 transition-colors">PlayStation Games</Link></li>
              <li><Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups (PUBG / Free Fire / Valorant)</Link></li>
              <li><Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">Digital Gift Cards</Link></li>
              <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Subscriptions &amp; Services</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-100 uppercase tracking-wider text-xs">Support &amp; Social</h4>
            <div className="space-y-2 text-xs">
              <a
                href="https://wa.me/9647500000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900/40 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Support</span>
              </a>
              <a
                href="https://discord.gg/danostore"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-950/40 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-900/40 transition-colors"
              >
                <Send className="w-4 h-4 text-indigo-400" />
                <span>Join Discord Community</span>
              </a>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-100 uppercase tracking-wider text-xs">Supported Payment Methods</h4>
            <p className="text-xs text-slate-400">Manual payment transfers supported in Kurdistan &amp; Iraq:</p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1.5 rounded-lg bg-pink-950/60 border border-pink-500/40 text-pink-300 font-bold text-xs tracking-wide">
                FastPay
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-300 font-bold text-xs tracking-wide">
                Korek Mobile
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-blue-950/60 border border-blue-500/40 text-blue-300 font-bold text-xs tracking-wide">
                MasterCard
              </span>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Target Region: Kurdistan / Iraq.</p>
          <div className="flex items-center gap-4">
            <Link to="/products" className="hover:text-slate-300">Browse Catalog</Link>
            <Link to="/admin-login" className="hover:text-purple-400">Admin Portal</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
