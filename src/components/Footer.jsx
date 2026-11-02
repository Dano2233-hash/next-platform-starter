import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Headphones, Sparkles, MessageCircle, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#03050a] border-t border-slate-900 text-slate-400 text-sm mt-20">
      {/* Service Highlights */}
      <div className="border-b border-slate-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-800/40">
            <div className="p-2.5 rounded-lg bg-cyan-950/60 border border-cyan-800/40 text-cyan-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Instant Digital Delivery</h4>
              <p className="text-xs text-slate-400 mt-1">Codes and top-ups processed directly after payment verification in Kurdistan and Iraq.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-800/40">
            <div className="p-2.5 rounded-lg bg-blue-950/60 border border-blue-800/40 text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">100% Legal & Safe</h4>
              <p className="text-xs text-slate-400 mt-1">Official publishers, authorized top-up methods, and verified digital game licenses.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-800/40">
            <div className="p-2.5 rounded-lg bg-purple-950/60 border border-purple-800/40 text-purple-400">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">24/7 Gamer Support</h4>
              <p className="text-xs text-slate-400 mt-1">Direct support via WhatsApp, Discord, and TikTok to assist you at every step.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-black text-sm">
                DS
              </div>
              <span className="font-extrabold text-lg text-white">Dano Store</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              The premier digital gaming store serving Iraqi & Kurdistan players with instant game top-ups, game keys, gift cards, and premium subscriptions.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/9647500000000"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-green-400 hover:border-green-500/40 transition-colors"
                title="WhatsApp Support"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-indigo-400 hover:border-indigo-500/40 transition-colors"
                title="Discord Community"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h5 className="font-bold text-white uppercase tracking-wider text-xs mb-3">Categories</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups</Link></li>
              <li><Link to="/products?category=games" className="hover:text-cyan-400 transition-colors">PC & Console Games</Link></li>
              <li><Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">Digital Gift Cards</Link></li>
              <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Digital Subscriptions</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-bold text-white uppercase tracking-wider text-xs mb-3">Quick Links</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Store Home</Link></li>
              <li><Link to="/products" className="hover:text-cyan-400 transition-colors">All Products</Link></li>
              <li><Link to="/cart" className="hover:text-cyan-400 transition-colors">Shopping Cart</Link></li>
              <li><Link to="/admin" className="hover:text-cyan-400 transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Payment Methods Accepted */}
          <div>
            <h5 className="font-bold text-white uppercase tracking-wider text-xs mb-3">Supported Manual Payments</h5>
            <div className="space-y-2">
              <div className="px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                <span className="font-bold text-cyan-400">FastPay</span>
                <span className="text-[10px] text-slate-400">Mobile Wallet</span>
              </div>
              <div className="px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                <span className="font-bold text-amber-400">Korek Telecom</span>
                <span className="text-[10px] text-slate-400">Direct Transfer</span>
              </div>
              <div className="px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                <span className="font-bold text-red-400">MasterCard</span>
                <span className="text-[10px] text-slate-400">Direct Transfer</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Currency: <strong>IQD only</strong>. Manual confirmation via WhatsApp or Discord.
            </p>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Kurdistan / Iraq Digital Store.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-slate-400 font-medium">Store Status: Online 24/7</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
