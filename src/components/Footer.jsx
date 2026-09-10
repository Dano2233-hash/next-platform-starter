import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, MessageCircle, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 mt-20">
      {/* Top Value Badges */}
      <div className="border-b border-slate-800/60 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-slate-100 font-bold text-sm">Instant Digital Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">Receive your codes & top-ups right after order confirmation.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-slate-100 font-bold text-sm">100% Guaranteed & Legal</h4>
              <p className="text-xs text-slate-400 mt-0.5">All products are sourced directly from authorized suppliers.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-slate-100 font-bold text-sm">24/7 Local Customer Care</h4>
              <p className="text-xs text-slate-400 mt-0.5">Fast direct help via WhatsApp, Discord, and phone support.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-0.5">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="font-black text-xl text-white">
              DANO <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">STORE</span>
            </span>
          </Link>
          <p className="text-xs leading-relaxed text-slate-400">
            The ultimate destination for game keys, mobile top-ups, gift cards, and subscriptions in Kurdistan and Iraq. Fast, safe, and reliable.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://wa.me/9647500000000"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500 text-slate-300 hover:text-emerald-400 transition-colors"
              title="WhatsApp Support"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500 text-slate-300 hover:text-indigo-400 transition-colors"
              title="Discord Channel"
            >
              <Send className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="text-slate-100 font-bold text-sm mb-4">Categories</h5>
          <ul className="space-y-2.5 text-xs font-medium">
            <li><Link to="/products?category=mobile-topups" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups</Link></li>
            <li><Link to="/products?category=paid-games" className="hover:text-cyan-400 transition-colors">Paid Games</Link></li>
            <li><Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">Gift Cards</Link></li>
            <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Subscriptions</Link></li>
          </ul>
        </div>

        {/* Gaming Platforms */}
        <div>
          <h5 className="text-slate-100 font-bold text-sm mb-4">Platforms</h5>
          <ul className="space-y-2.5 text-xs font-medium">
            <li><Link to="/products?platform=PC" className="hover:text-cyan-400 transition-colors">PC Gaming</Link></li>
            <li><Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">PlayStation Store</Link></li>
            <li><Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">Xbox Store</Link></li>
            <li><Link to="/products?platform=Mobile" className="hover:text-cyan-400 transition-colors">Mobile Games</Link></li>
          </ul>
        </div>

        {/* Payment & Currency */}
        <div>
          <h5 className="text-slate-100 font-bold text-sm mb-4">Accepted Payment</h5>
          <p className="text-xs text-slate-400 mb-3">
            Local Kurdistan & Iraq payment methods:
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs font-bold text-cyan-400">
              FastPay
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs font-bold text-amber-400">
              Korek
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs font-bold text-blue-400">
              MasterCard
            </span>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800/60 text-[11px] text-slate-500">
            Currency: <span className="font-bold text-slate-300">IQD Only</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/80 bg-slate-950 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Kurdistan / Iraq Digital Gaming Store.</p>
          <div className="flex items-center gap-4">
            <Link to="/admin-login" className="hover:text-cyan-400 transition-colors">
              Admin Access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
