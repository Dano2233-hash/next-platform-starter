import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#03060c] border-t border-slate-800/80 pt-12 pb-8 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10 border-b border-slate-800/80 mb-10">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800/60">
            <div className="w-10 h-10 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Instant Delivery</h4>
              <p className="text-xs text-slate-400">Digital keys & top-ups delivered fast 24/7</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800/60">
            <div className="w-10 h-10 rounded-lg bg-cyan-600/20 text-cyan-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">100% Guaranteed Official</h4>
              <p className="text-xs text-slate-400">Direct codes & verified top-ups only</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800/60">
            <div className="w-10 h-10 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Local Customer Support</h4>
              <p className="text-xs text-slate-400">Kurdistan & Iraq support via WhatsApp & Discord</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">

          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center font-extrabold text-white shadow">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-white">Dano Store</span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your primary destination for digital gaming keys, top-ups, gift cards, subscriptions, and gaming services across Kurdistan and Iraq.
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">Accepted Local Payments</span>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-bold rounded bg-slate-800 text-cyan-400 border border-slate-700">FastPay</span>
                <span className="px-2.5 py-1 text-xs font-bold rounded bg-slate-800 text-amber-400 border border-slate-700">Korek</span>
                <span className="px-2.5 py-1 text-xs font-bold rounded bg-slate-800 text-blue-400 border border-slate-700">MasterCard</span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-bold text-slate-200 text-sm mb-3">Popular Categories</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups (UC, Diamonds)</Link></li>
              <li><Link to="/products?category=pc" className="hover:text-cyan-400 transition-colors">PC Steam & Epic Games</Link></li>
              <li><Link to="/products?category=playstation" className="hover:text-cyan-400 transition-colors">PlayStation Games & PSN Cards</Link></li>
              <li><Link to="/products?category=xbox" className="hover:text-cyan-400 transition-colors">Xbox Games & Gift Cards</Link></li>
              <li><Link to="/products?category=giftcards" className="hover:text-cyan-400 transition-colors">Steam, Apple, Google Gift Cards</Link></li>
              <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Discord Nitro & Subscriptions</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-slate-200 text-sm mb-3">Help & Info</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/products" className="hover:text-cyan-400 transition-colors">Browse Full Catalog</Link></li>
              <li><Link to="/cart" className="hover:text-cyan-400 transition-colors">Shopping Cart</Link></li>
              <li><Link to="/checkout" className="hover:text-cyan-400 transition-colors">Checkout Guide</Link></li>
              <li><Link to="/admin-login" className="hover:text-cyan-400 transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Contact Support */}
          <div>
            <h4 className="font-bold text-slate-200 text-sm mb-3">Contact Support</h4>
            <p className="text-xs text-slate-400 mb-3">Reach out directly to finalize order payment or ask questions:</p>
            <div className="space-y-2">
              <a
                href="https://wa.me/9647500000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs font-bold hover:bg-emerald-900/60 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Order Support</span>
              </a>
              <a
                href="https://discord.gg/danostore"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-950/60 border border-indigo-800/60 text-indigo-400 text-xs font-bold hover:bg-indigo-900/60 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Join Discord Community</span>
              </a>
              <a
                href="https://tiktok.com/@danostore"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-pink-950/60 border border-pink-800/60 text-pink-400 text-xs font-bold hover:bg-pink-900/60 transition-colors"
              >
                <Zap className="w-4 h-4" />
                <span>TikTok @danostore</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Built for Kurdistan & Iraq gamers.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Fast Delivery
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> 100% Legal Services
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
