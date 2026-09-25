import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, CreditCard, Headset, MessageSquare, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#03050b] border-t border-slate-800/80 text-slate-400 text-xs mt-16">
      {/* Features Banner */}
      <div className="border-b border-slate-800/60 bg-[#050814]/50 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 text-cyan-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-xs">Instant Delivery</h4>
              <p className="text-[11px] text-slate-400">Automated digital codes</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-xs">100% Legal & Safe</h4>
              <p className="text-[11px] text-slate-400">Official distributor keys</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 text-purple-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-xs">Local Payment</h4>
              <p className="text-[11px] text-slate-400">FastPay, Korek, MasterCard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400">
              <Headset className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-xs">24/7 Support</h4>
              <p className="text-[11px] text-slate-400">Kurdistan & Iraq support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#05070f] rounded-[6px] flex items-center justify-center font-black text-cyan-400 text-base">
                  D
                </div>
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">Dano Store</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              The premier digital gaming store in Kurdistan and Iraq. Fast, reliable top-ups for PUBG Mobile, Free Fire, Valorant, Steam Cards, and digital PC & console games.
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-slate-400 block mb-2">Accepted Local Payments:</span>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-[#0c1224] border border-cyan-500/30 rounded text-[10px] font-bold text-cyan-300">
                  FastPay
                </span>
                <span className="px-2.5 py-1 bg-[#0c1224] border border-blue-500/30 rounded text-[10px] font-bold text-blue-300">
                  Korek
                </span>
                <span className="px-2.5 py-1 bg-[#0c1224] border border-purple-500/30 rounded text-[10px] font-bold text-purple-300">
                  MasterCard
                </span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-bold text-slate-100 text-sm mb-3 text-cyan-400">Categories</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups (UC & VP)</Link></li>
              <li><Link to="/products?category=pc" className="hover:text-cyan-400 transition-colors">PC Steam Games</Link></li>
              <li><Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">Steam & PSN Cards</Link></li>
              <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Discord & YouTube Subscriptions</Link></li>
              <li><Link to="/products?category=xbox" className="hover:text-cyan-400 transition-colors">Xbox Store</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-slate-100 text-sm mb-3 text-cyan-400">Quick Links</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-cyan-400 transition-colors">All Store Products</Link></li>
              <li><Link to="/cart" className="hover:text-cyan-400 transition-colors">My Shopping Cart</Link></li>
              <li><Link to="/admin-login" className="hover:text-cyan-400 transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="font-bold text-slate-100 text-sm mb-3 text-cyan-400">Support & Region</h4>
            <p className="text-slate-400 text-xs mb-3">
              Serving gamers in Erbil, Sulaymaniyah, Duhok, Kirkuk, Baghdad, and all regions across Iraq.
            </p>
            <div className="space-y-2">
              <a
                href="https://wa.me/9647500000000"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 rounded-lg text-xs font-semibold hover:bg-emerald-900/80 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Customer Service</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-10 pt-6 border-t border-slate-800/60 text-center text-slate-400 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} Dano Store. All rights reserved. Kurdistan & Iraq.</span>
          <span className="text-slate-400">Designed with dark gaming aesthetic</span>
        </div>
      </div>
    </footer>
  );
}
