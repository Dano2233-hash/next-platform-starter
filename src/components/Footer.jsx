import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Shield, MessageCircle, Send, Heart, Clock, Award } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#03050a] border-t border-slate-800/80 text-slate-400 text-xs mt-20">
      {/* Upper Features Bar */}
      <div className="border-b border-slate-800/60 bg-[#050814] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800">
            <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/20">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm">Instant Delivery</h4>
              <p className="text-slate-400 text-xs">Codes &amp; top-ups sent directly via WhatsApp / Order page.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm">100% Legal &amp; Safe</h4>
              <p className="text-slate-400 text-xs">Official codes &amp; direct publisher top-ups guaranteed.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800">
            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm">Local Iraqi Payments</h4>
              <p className="text-slate-400 text-xs">Pay conveniently via FastPay, Korek, or MasterCard.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center">
              <Gamepad2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-lg text-white">DANO STORE</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-xs">
            Kurdistan and Iraq's premier digital store for original PC games, mobile game top-ups, gift cards, and premium subscriptions.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-emerald-400 font-semibold">Service Status: Online (24/7)</span>
          </div>
        </div>

        {/* Col 2: Categories */}
        <div className="space-y-3">
          <h4 className="font-bold text-slate-100 text-sm uppercase tracking-wider text-cyan-400">Categories</h4>
          <ul className="space-y-2 font-medium">
            <li><Link to="/products?category=mobile" className="hover:text-cyan-300 transition-colors">Mobile Top-Ups (UC, Diamonds)</Link></li>
            <li><Link to="/products?category=pc" className="hover:text-cyan-300 transition-colors">PC Steam &amp; Epic Games</Link></li>
            <li><Link to="/products?category=gift-cards" className="hover:text-cyan-300 transition-colors">Digital Gift Cards</Link></li>
            <li><Link to="/products?category=subscriptions" className="hover:text-cyan-300 transition-colors">Subscriptions (Nitro, Netflix)</Link></li>
            <li><Link to="/products?category=xbox" className="hover:text-cyan-300 transition-colors">Xbox Store</Link></li>
            <li><Link to="/products?category=playstation" className="hover:text-cyan-300 transition-colors">PlayStation Network</Link></li>
          </ul>
        </div>

        {/* Col 3: Quick Navigation */}
        <div className="space-y-3">
          <h4 className="font-bold text-slate-100 text-sm uppercase tracking-wider text-cyan-400">Navigation</h4>
          <ul className="space-y-2 font-medium">
            <li><Link to="/" className="hover:text-cyan-300 transition-colors">Home Page</Link></li>
            <li><Link to="/products" className="hover:text-cyan-300 transition-colors">All Store Products</Link></li>
            <li><Link to="/cart" className="hover:text-cyan-300 transition-colors">Shopping Cart</Link></li>
            <li><Link to="/admin-login" className="hover:text-cyan-300 transition-colors">Admin Portal</Link></li>
          </ul>
        </div>

        {/* Col 4: Payment Methods & Support */}
        <div className="space-y-4">
          <h4 className="font-bold text-slate-100 text-sm uppercase tracking-wider text-cyan-400">Accepted Payment Methods</h4>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-center font-bold text-[10px] text-pink-400">
              FastPay
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-center font-bold text-[10px] text-amber-400">
              Korek
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-center font-bold text-[10px] text-cyan-400">
              MasterCard
            </div>
          </div>
          <p className="text-[11px] text-slate-500">
            Currency strictly in <strong className="text-slate-300">IQD</strong> for local Kurdistan and Iraq residents.
          </p>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-800/80 py-6 bg-[#020307]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built for Iraq &amp; Kurdistan gamers with <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
