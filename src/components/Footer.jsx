import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, MessageSquare, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#03050b] border-t border-slate-800/80 text-slate-400 text-xs mt-16">
      {/* Top Value Banner */}
      <div className="border-b border-slate-800/60 py-8 bg-[#050711]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-slate-200">Instant Delivery</h4>
              <p className="text-[11px] text-slate-500">Codes delivered immediately after verification</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-slate-200">100% Legal & Safe</h4>
              <p className="text-[11px] text-slate-500">Official publisher keys & top-ups</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-slate-200">24/7 Local Support</h4>
              <p className="text-[11px] text-slate-500">WhatsApp & Discord support in Kurdistan</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-slate-200">Local Payments</h4>
              <p className="text-[11px] text-slate-500">FastPay, Korek & Local MasterCard</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1px]">
              <div className="w-full h-full bg-[#070b19] rounded-[7px] flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <span className="font-heading text-lg font-bold text-white">Dano Store</span>
          </Link>
          <p className="text-slate-400 leading-relaxed text-xs pr-4">
            Dano Store is Kurdistan and Iraq’s trusted gaming store for digital games, mobile top-ups, Steam, PlayStation, Xbox, and subscription services. Fast, secure, and always reliable.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <span className="text-[11px] font-semibold text-slate-500">Payment Accepted:</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-bold text-amber-400">FastPay</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-bold text-red-400">Korek</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-bold text-blue-400">MasterCard</span>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-heading font-bold text-slate-200 mb-3 text-sm">Categories</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/products?category=topups" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups</Link></li>
            <li><Link to="/products?category=games" className="hover:text-cyan-400 transition-colors">PC & Console Games</Link></li>
            <li><Link to="/products?category=giftcards" className="hover:text-cyan-400 transition-colors">Gift Cards & Codes</Link></li>
            <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Subscriptions</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-bold text-slate-200 mb-3 text-sm">Quick Links</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/products" className="hover:text-cyan-400 transition-colors">All Products</Link></li>
            <li><Link to="/cart" className="hover:text-cyan-400 transition-colors">Shopping Cart</Link></li>
            <li><Link to="/admin-login" className="hover:text-cyan-400 transition-colors">Admin Area</Link></li>
          </ul>
        </div>

        {/* Community & Contact */}
        <div>
          <h4 className="font-heading font-bold text-slate-200 mb-3 text-sm">Contact Us</h4>
          <div className="space-y-2">
            <a href="https://wa.me/9647500000000" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition-colors">
              <span>WhatsApp Support</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://discord.gg" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-slate-300 hover:text-indigo-400 transition-colors">
              <span>Discord Server</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <p className="text-[11px] text-slate-500 pt-1">
              Erbil / Sulaymaniyah / Duhok / Baghdad
            </p>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-900 bg-[#020307] py-4 text-center text-[11px] text-slate-500">
        <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Built for Kurdistan & Iraq gamers.</p>
      </div>
    </footer>
  );
}
