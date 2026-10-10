import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#03050a] border-t border-slate-800/80 text-slate-400 text-sm mt-20">

      {/* Top Features Banner */}
      <div className="border-b border-slate-800/60 bg-slate-950/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Instant Delivery</h4>
              <p className="text-xs text-slate-400">Digital codes delivered fast 24/7</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">100% Guaranteed</h4>
              <p className="text-xs text-slate-400">Official digital keys & top-ups</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Live Support</h4>
              <p className="text-xs text-slate-400">WhatsApp & Discord local help</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <span className="font-extrabold text-sm">IQD</span>
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Local Payment</h4>
              <p className="text-xs text-slate-400">FastPay, Korek, MasterCard</p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">

        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="text-xl font-extrabold text-white">
              Dano <span className="text-cyan-400">Store</span>
            </span>
          </Link>

          <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
            Kurdistan and Iraq's premier digital gaming store. Get instant digital codes for PC, Xbox, PlayStation, Mobile Top-Ups, Steam Wallet, and Premium Subscriptions.
          </p>

          <div className="pt-2">
            <h5 className="text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">Accepted Local Payments:</h5>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200">FastPay</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200">Korek</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200">MasterCard</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-slate-100 font-bold text-sm mb-4">Categories</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/products?category=games" className="hover:text-cyan-400 transition-colors">Paid Games</Link></li>
            <li><Link to="/products?category=topups" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups</Link></li>
            <li><Link to="/products?category=giftcards" className="hover:text-cyan-400 transition-colors">Gift Cards</Link></li>
            <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Subscriptions</Link></li>
          </ul>
        </div>

        {/* Platforms */}
        <div>
          <h4 className="text-slate-100 font-bold text-sm mb-4">Platforms</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/products?platform=PC" className="hover:text-cyan-400 transition-colors">PC Gaming</Link></li>
            <li><Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">Xbox</Link></li>
            <li><Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">PlayStation</Link></li>
            <li><Link to="/products?platform=Mobile" className="hover:text-cyan-400 transition-colors">Mobile</Link></li>
          </ul>
        </div>

        {/* Support & Admin */}
        <div>
          <h4 className="text-slate-100 font-bold text-sm mb-4">Quick Links</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/cart" className="hover:text-cyan-400 transition-colors">Shopping Cart</Link></li>
            <li><Link to="/checkout" className="hover:text-cyan-400 transition-colors">Checkout</Link></li>
            <li><Link to="/admin-login" className="hover:text-cyan-400 transition-colors">Admin Portal</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 bg-black/80 py-4 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Kurdistan & Iraq Gamers
          </p>
        </div>
      </div>
    </footer>
  );
};
