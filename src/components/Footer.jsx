import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Heart, MessageCircle, Phone, Globe, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#04060b] border-t border-slate-800/80 pt-12 pb-8 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/60">

          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5">
                <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
                  <Gamepad2 className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-extrabold text-lg text-white font-sans">
                Dano <span className="text-cyan-400">Store</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your premier digital gaming hub in Kurdistan &amp; Iraq. Instant codes, official top-ups, game keys, and digital subscriptions at guaranteed local prices.
            </p>
            <div className="flex items-center gap-3 text-xs text-cyan-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Legal &amp; Authorized Digital Keys</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 tracking-wider uppercase">Categories</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups (PUBG / Free Fire)</Link></li>
              <li><Link to="/products?category=pc" className="hover:text-cyan-400 transition-colors">PC Steam Games</Link></li>
              <li><Link to="/products?category=playstation" className="hover:text-cyan-400 transition-colors">PlayStation Games &amp; Cards</Link></li>
              <li><Link to="/products?category=xbox" className="hover:text-cyan-400 transition-colors">Xbox Game Pass &amp; Games</Link></li>
              <li><Link to="/products?category=giftcards" className="hover:text-cyan-400 transition-colors">Gift Cards &amp; Wallet Codes</Link></li>
              <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Discord &amp; Entertainment Subs</Link></li>
            </ul>
          </div>

          {/* Payment Methods Info */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 tracking-wider uppercase">Payment Methods</h4>
            <p className="text-xs text-slate-400 mb-3">
              We exclusively support trusted manual local payments for Kurdistan &amp; Iraq customers:
            </p>
            <div className="space-y-2">
              <div className="bg-[#0a0f1d] border border-slate-800 p-2 rounded-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="text-xs font-semibold text-slate-200">FastPay Mobile Wallet</span>
              </div>
              <div className="bg-[#0a0f1d] border border-slate-800 p-2 rounded-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                <span className="text-xs font-semibold text-slate-200">Korek Telecom Direct</span>
              </div>
              <div className="bg-[#0a0f1d] border border-slate-800 p-2 rounded-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                <span className="text-xs font-semibold text-slate-200">MasterCard Local Cards</span>
              </div>
            </div>
          </div>

          {/* Customer Support & Socials */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 tracking-wider uppercase">Direct Support</h4>
            <p className="text-xs text-slate-400 mb-3">
              Need help with your order? Our team is active 24/7 on local messaging apps:
            </p>
            <div className="space-y-2.5">
              <a
                href="https://wa.me/9647500000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 px-3 py-2 rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Instant Support</span>
              </a>
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs font-semibold text-indigo-400 bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-500/30 px-3 py-2 rounded-lg transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>Join Discord Community</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Dano Store. All rights reserved. Serving Erbil, Sulaymaniyah, Duhok, Kirkuk &amp; Baghdad.</p>
          <div className="flex items-center gap-4">
            <Link to="/admin-login" className="hover:text-slate-300 transition-colors">Admin Portal</Link>
            <span>•</span>
            <span className="text-slate-400">IQD Currency Only</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
