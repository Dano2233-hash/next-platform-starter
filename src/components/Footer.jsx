import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Shield, Zap, MessageCircle, Send, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#03050d] border-t border-slate-800/80 text-slate-400 text-xs">
      {/* Top benefits strip */}
      <div className="border-b border-slate-800/60 bg-slate-950/40 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-800/50 text-cyan-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Instant Delivery</h4>
              <p className="text-slate-400 text-xs">Fast delivery via WhatsApp & Discord</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-800/50 text-purple-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">100% Legal & Safe</h4>
              <p className="text-slate-400 text-xs">Official codes & direct player ID top-ups</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-950/60 border border-blue-800/50 text-blue-400">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Kurdistan Support</h4>
              <p className="text-slate-400 text-xs">Local customer service in Erbil & Sulaymaniyah</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand info */}
        <div className="space-y-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center">
              <Gamepad2 className="w-4 h-4 text-black font-black" />
            </div>
            <span className="text-lg font-black tracking-wider text-white">
              DANO<span className="text-cyan-400">STORE</span>
            </span>
          </Link>
          <p className="text-slate-400 leading-relaxed">
            The premier digital gaming store for Kurdistan and Iraq. Buy game top-ups, Steam cards, PlayStation codes, and subscriptions with local manual payment methods.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-slate-200 text-sm mb-3 uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/products" className="hover:text-cyan-400 transition-colors">All Products</Link></li>
            <li><Link to="/products?category=Top-Up" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups</Link></li>
            <li><Link to="/products?category=Game" className="hover:text-cyan-400 transition-colors">Paid Steam Games</Link></li>
            <li><Link to="/products?category=Gift Card" className="hover:text-cyan-400 transition-colors">Gift Cards</Link></li>
            <li><Link to="/products?category=Subscription" className="hover:text-cyan-400 transition-colors">Digital Subscriptions</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-bold text-slate-200 text-sm mb-3 uppercase tracking-wider">Platforms</h4>
          <ul className="space-y-2">
            <li><Link to="/products?platform=PC" className="hover:text-cyan-400 transition-colors">PC Gaming</Link></li>
            <li><Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">PlayStation Network</Link></li>
            <li><Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">Xbox Store</Link></li>
            <li><Link to="/products?platform=Mobile" className="hover:text-cyan-400 transition-colors">Mobile Games</Link></li>
          </ul>
        </div>

        {/* Accepted Payment Methods (Strictly FastPay, Korek, MasterCard) */}
        <div>
          <h4 className="font-bold text-slate-200 text-sm mb-3 uppercase tracking-wider">Payment Methods</h4>
          <p className="text-xs text-slate-400 mb-3">Manual payment supported across Kurdistan / Iraq:</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 font-bold text-emerald-400 text-xs">
              FastPay
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 font-bold text-cyan-400 text-xs">
              Korek Cash
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 font-bold text-purple-400 text-xs">
              MasterCard / FIB
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/60 bg-slate-950 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved.</p>
          <p className="flex items-center gap-1 text-slate-400">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> for Iraq & Kurdistan Gamers
          </p>
        </div>
      </div>
    </footer>
  );
};
