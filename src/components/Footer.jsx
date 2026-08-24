import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, CreditCard, ExternalLink, Headphones } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#030508] border-t border-slate-800 text-slate-400 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Feature Highlights Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10 border-b border-slate-800/80">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100">Instant Delivery</h4>
              <p className="text-xs text-slate-400">Digital codes & top-ups delivered instantly after verification.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100">100% Official Codes</h4>
              <p className="text-xs text-slate-400">Guaranteed valid licenses direct from authorized publishers.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100">Local Payment Methods</h4>
              <p className="text-xs text-slate-400">Easy payment via FastPay, Korek Cash, and MasterCard.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10">

          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-white text-lg">
                DS
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">Dano Store</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your premier digital gaming & top-up destination in Kurdistan & Iraq. Get immediate access to games, gift cards, subscriptions, and mobile game cash.
            </p>
          </div>

          {/* Store Categories */}
          <div>
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">
                  Mobile Top-Ups (UC, Diamonds, CP)
                </Link>
              </li>
              <li>
                <Link to="/products?category=pc" className="hover:text-cyan-400 transition-colors">
                  PC Games (Steam & Epic)
                </Link>
              </li>
              <li>
                <Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">
                  PlayStation Network Cards
                </Link>
              </li>
              <li>
                <Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">
                  Xbox Digital Store
                </Link>
              </li>
              <li>
                <Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">
                  Gift Cards & Vouchers
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment Badges */}
          <div>
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">Accepted Payments</h4>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>FastPay (Erbil / Sulaymaniyah / Duhok)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200">
                <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                <span>Korek Cash</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200">
                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                <span>MasterCard / FIB Direct Transfer</span>
              </div>
            </div>
          </div>

          {/* Customer Service & Social */}
          <div>
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">Customer Support</h4>
            <p className="text-xs text-slate-400 mb-3">Need help with your order or payment validation?</p>
            <div className="space-y-2">
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 text-green-400 transition"
              >
                <div className="flex items-center gap-2">
                  <Headphones className="w-4 h-4" />
                  <span>WhatsApp Live Support</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-purple-400 transition"
              >
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  <span>Join Discord Community</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved.</p>
          <p className="text-slate-400">Serving Kurdistan & Iraq Gamers with Pride</p>
        </div>
      </div>
    </footer>
  );
}
