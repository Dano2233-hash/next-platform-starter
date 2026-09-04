import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Headphones, MapPin, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#03050b] border-t border-slate-800/80 text-slate-400 text-xs mt-16">
      {/* Top Value Propositions */}
      <div className="border-b border-slate-800/60 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm">Instant Delivery</h4>
              <p className="text-[11px] text-slate-400">Automated digital code delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm">100% Guaranteed</h4>
              <p className="text-[11px] text-slate-400">Official legal digital services</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm">24/7 Fast Support</h4>
              <p className="text-[11px] text-slate-400">WhatsApp & Discord active support</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm">Local Iraqi Payments</h4>
              <p className="text-[11px] text-slate-400">FastPay, Korek, MasterCard</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand info */}
        <div className="space-y-4 md:col-span-1">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5">
              <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center font-black text-cyan-400 text-lg">
                D
              </div>
            </div>
            <span className="text-lg font-black text-white tracking-tight">
              Dano <span className="text-cyan-400">Store</span>
            </span>
          </Link>
          <p className="text-slate-400 leading-relaxed text-xs">
            The premier digital store in Kurdistan and Iraq for game top-ups, activation keys, gift cards, and premium subscriptions.
          </p>
          <div className="pt-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block mb-2">Supported Payment Methods</span>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-emerald-500/30 text-emerald-400 font-bold text-[10px]">FastPay</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-amber-500/30 text-amber-400 font-bold text-[10px]">Korek</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-blue-500/30 text-blue-400 font-bold text-[10px]">MasterCard</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h5 className="font-bold text-slate-100 text-xs uppercase tracking-wider mb-4 border-l-2 border-cyan-500 pl-2">
            Categories
          </h5>
          <ul className="space-y-2">
            <li><Link to="/products?category=mobile-topup" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups</Link></li>
            <li><Link to="/products?category=paid-games" className="hover:text-cyan-400 transition-colors">PC & Console Games</Link></li>
            <li><Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">Gift Cards</Link></li>
            <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Subscriptions</Link></li>
          </ul>
        </div>

        {/* Quick Platforms */}
        <div>
          <h5 className="font-bold text-slate-100 text-xs uppercase tracking-wider mb-4 border-l-2 border-purple-500 pl-2">
            Platforms
          </h5>
          <ul className="space-y-2">
            <li><Link to="/products?platform=PC" className="hover:text-cyan-400 transition-colors">PC Gaming</Link></li>
            <li><Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">PlayStation Store</Link></li>
            <li><Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">Xbox Live</Link></li>
            <li><Link to="/products?platform=Mobile" className="hover:text-cyan-400 transition-colors">Mobile Games</Link></li>
          </ul>
        </div>

        {/* Support & Admin */}
        <div>
          <h5 className="font-bold text-slate-100 text-xs uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
            Store Support
          </h5>
          <p className="text-slate-400 mb-3">Have questions about an order or payment? Contact us directly:</p>
          <div className="space-y-2">
            <a
              href="https://wa.me/9647501234567"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-semibold hover:bg-emerald-900/40 transition-colors"
            >
              <span>WhatsApp Support</span>
            </a>
            <Link
              to="/admin-login"
              className="block p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 text-center transition-colors font-medium"
            >
              Admin Portal Login
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-900 bg-black/80 py-4 text-center text-slate-500 text-[11px]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} Dano Store. All rights reserved. Kurdistan / Iraq.</span>
          <span className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for Iraqi Gamers
          </span>
        </div>
      </div>
    </footer>
  );
};
