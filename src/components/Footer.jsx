import React from 'react';
import { Link } from 'react-router-dom';
import {
  Gamepad2,
  ShieldCheck,
  Zap,
  Headphones,
  CreditCard,
  Heart,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#04070d] border-t border-slate-800/80 text-slate-400 text-xs mt-16">
      {/* Top Value Proposition Grid */}
      <div className="border-b border-slate-800/60 py-8 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="p-2.5 rounded-lg bg-blue-950/80 text-blue-400 border border-blue-800/40 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-slate-200 text-sm">Instant Delivery</h5>
              <p className="text-[11px] text-slate-500">Automated digital code distribution</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="p-2.5 rounded-lg bg-cyan-950/80 text-cyan-400 border border-cyan-800/40 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-slate-200 text-sm">100% Guaranteed</h5>
              <p className="text-[11px] text-slate-500">Official legal digital keys & top-ups</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="p-2.5 rounded-lg bg-purple-950/80 text-purple-400 border border-purple-800/40 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-slate-200 text-sm">24/7 Live Support</h5>
              <p className="text-[11px] text-slate-500">WhatsApp & Discord support team</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="p-2.5 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-800/40 shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-slate-200 text-sm">Local Payments</h5>
              <p className="text-[11px] text-slate-500">FastPay, Korek & MasterCard</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="space-y-4 md:col-span-1">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-[#04070d] rounded-[6px] flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <span className="text-base font-black tracking-wider text-white uppercase">
              DANO <span className="text-cyan-400">STORE</span>
            </span>
          </Link>
          <p className="text-slate-400 text-xs leading-relaxed">
            The premier digital gaming store in Kurdistan and Iraq. Fast, safe, and secure purchase for video games, game top-ups, gift cards, and premium subscriptions.
          </p>
          <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Currency: IQD (Iraqi Dinar) Only</span>
          </div>
        </div>

        {/* Categories Column */}
        <div>
          <h4 className="text-slate-200 font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-cyan-400 pl-2">
            Store Categories
          </h4>
          <ul className="space-y-2.5">
            <li>
              <Link to="/products?category=mobile-topups" className="hover:text-cyan-400 transition-colors">
                Mobile Game Top-Ups
              </Link>
            </li>
            <li>
              <Link to="/products?category=games" className="hover:text-cyan-400 transition-colors">
                PC & Console Games
              </Link>
            </li>
            <li>
              <Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">
                Steam & Console Gift Cards
              </Link>
            </li>
            <li>
              <Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">
                Digital Subscriptions
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-cyan-400 transition-colors">
                All Products
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Navigation Column */}
        <div>
          <h4 className="text-slate-200 font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
            Quick Navigation
          </h4>
          <ul className="space-y-2.5">
            <li>
              <Link to="/" className="hover:text-cyan-400 transition-colors">
                Home Page
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-cyan-400 transition-colors">
                Shopping Cart
              </Link>
            </li>
            <li>
              <Link to="/checkout" className="hover:text-cyan-400 transition-colors">
                Checkout Page
              </Link>
            </li>
            <li>
              <Link to="/admin-login" className="hover:text-purple-400 transition-colors">
                Admin Portal
              </Link>
            </li>
          </ul>
        </div>

        {/* Accepted Payment Methods Column */}
        <div>
          <h4 className="text-slate-200 font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-purple-500 pl-2">
            Payment Options
          </h4>
          <p className="text-slate-400 text-xs mb-3">
            We accept trusted local mobile and card payments across Kurdistan and Iraq:
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1.5 rounded bg-slate-900 border border-slate-700/80 font-bold text-cyan-400">
              FastPay
            </span>
            <span className="px-3 py-1.5 rounded bg-slate-900 border border-slate-700/80 font-bold text-blue-400">
              Korek
            </span>
            <span className="px-3 py-1.5 rounded bg-slate-900 border border-slate-700/80 font-bold text-amber-400">
              MasterCard
            </span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
            Manual transfer verification via WhatsApp / Discord / TikTok support after placing order.
          </div>
        </div>
      </div>

      {/* Bottom Copyright Row */}
      <div className="border-t border-slate-800/80 py-6 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Designed & Powered for Kurdistan & Iraq Gamers
          </p>
        </div>
      </div>
    </footer>
  );
}
