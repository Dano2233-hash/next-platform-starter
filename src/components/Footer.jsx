import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, CreditCard, Headphones, MessageCircle, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#03050a] border-t border-slate-800/80 text-slate-400 text-sm mt-20">
      {/* Features Bar */}
      <div className="border-b border-slate-800/60 bg-[#050814]">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-slate-100 font-bold text-sm">Instant Delivery</h5>
              <p className="text-xs text-slate-400 mt-0.5">Codes & top-ups sent instantly</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="w-12 h-12 rounded-xl bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-slate-100 font-bold text-sm">100% Guaranteed</h5>
              <p className="text-xs text-slate-400 mt-0.5">Official licenses & digital keys</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="w-12 h-12 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-slate-100 font-bold text-sm">FastPay & Korek</h5>
              <p className="text-xs text-slate-400 mt-0.5">Local payments made simple</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-slate-100 font-bold text-sm">24/7 Support</h5>
              <p className="text-xs text-slate-400 mt-0.5">Contact via WhatsApp & Discord</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand Column */}
        <div className="space-y-4 md:col-span-1">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[2px]">
              <div className="w-full h-full bg-[#05070f] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="text-lg font-extrabold tracking-tight text-white">
              Dano Store
            </span>
          </Link>
          <p className="text-xs leading-relaxed text-slate-400">
            Kurdistan & Iraq's premier digital gaming store. We provide instant game keys, mobile game top-ups, gift cards, and premium subscriptions at best prices.
          </p>
          <div className="pt-2 flex items-center gap-3">
            <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 hover:bg-slate-800 transition">
              <MessageCircle className="w-4 h-4" />
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400 hover:bg-slate-800 transition">
              <Share2 className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Categories Column */}
        <div className="space-y-3">
          <h4 className="text-slate-100 font-bold text-sm uppercase tracking-wider">Quick Categories</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/products?category=mobile" className="hover:text-cyan-400 transition">Mobile Game Top-Ups</Link></li>
            <li><Link to="/products?category=pc" className="hover:text-cyan-400 transition">PC Games & Steam Keys</Link></li>
            <li><Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition">PlayStation Games</Link></li>
            <li><Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition">Xbox Store & Games</Link></li>
            <li><Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition">Digital Gift Cards</Link></li>
            <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition">Premium Subscriptions</Link></li>
          </ul>
        </div>

        {/* Popular Top-ups Column */}
        <div className="space-y-3">
          <h4 className="text-slate-100 font-bold text-sm uppercase tracking-wider">Popular Top-Ups</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/product/pubg-mobile-uc" className="hover:text-cyan-400 transition">PUBG Mobile UC</Link></li>
            <li><Link to="/product/free-fire-diamonds" className="hover:text-cyan-400 transition">Free Fire Diamonds</Link></li>
            <li><Link to="/product/fortnite-v-bucks" className="hover:text-cyan-400 transition">Fortnite V-Bucks</Link></li>
            <li><Link to="/product/valorant-points" className="hover:text-cyan-400 transition">Valorant Points (VP)</Link></li>
            <li><Link to="/product/roblox-robux" className="hover:text-cyan-400 transition">Roblox Robux</Link></li>
            <li><Link to="/product/steam-wallet-card" className="hover:text-cyan-400 transition">Steam Wallet Codes</Link></li>
          </ul>
        </div>

        {/* Payment Methods Column */}
        <div className="space-y-3">
          <h4 className="text-slate-100 font-bold text-sm uppercase tracking-wider">Accepted Payments</h4>
          <p className="text-xs text-slate-400">
            Direct manual payments accepted through local Kurdish & Iraqi channels:
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="px-2.5 py-1 rounded bg-blue-950/80 border border-blue-600/40 text-blue-300 font-semibold text-xs">FastPay</span>
            <span className="px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-600/40 text-cyan-300 font-semibold text-xs">Korek Cash</span>
            <span className="px-2.5 py-1 rounded bg-purple-950/80 border border-purple-600/40 text-purple-300 font-semibold text-xs">MasterCard / FIB</span>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-slate-900 bg-[#020307] py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Designed for gamers in Iraq & Kurdistan.</p>
          <div className="flex items-center space-x-4">
            <Link to="/admin" className="hover:text-cyan-400 transition">Admin Login</Link>
            <span>•</span>
            <Link to="/products" className="hover:text-cyan-400 transition">Store Catalog</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
