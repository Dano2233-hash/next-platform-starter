import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, MessageCircle, Send, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#030409] border-t border-slate-800/80 text-slate-400 text-xs mt-16">
      {/* Top Features Highlights */}
      <div className="border-b border-slate-800/60 py-8 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start bg-slate-900/40 p-4 rounded-xl border border-slate-800/60">
            <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Instant Digital Delivery</h4>
              <p className="text-slate-400 text-xs">Fast delivery direct to your ID or email.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start bg-slate-900/40 p-4 rounded-xl border border-slate-800/60">
            <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">100% Legal & Safe</h4>
              <p className="text-slate-400 text-xs">Verified official keys and authorized top-ups.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start bg-slate-900/40 p-4 rounded-xl border border-slate-800/60">
            <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">24/7 Local Support</h4>
              <p className="text-slate-400 text-xs">Kurdistan & Iraq dedicated customer care.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black">
              <Gamepad2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-base text-white">
              Dano <span className="text-cyan-400">Store</span>
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            The premier digital store in Kurdistan and Iraq for video games, mobile top-ups, gift cards, and premium subscriptions.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://wa.me/9640000000000"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 hover:bg-emerald-600/20 hover:text-emerald-400 text-slate-300 border border-slate-800 transition-colors"
              title="WhatsApp"
            >
              <Send className="w-4 h-4" />
            </a>
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 hover:bg-indigo-600/20 hover:text-indigo-400 text-slate-300 border border-slate-800 transition-colors"
              title="Discord"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-slate-200 text-sm mb-3 text-white uppercase tracking-wider text-[11px]">
            Store Categories
          </h4>
          <ul className="space-y-2">
            <li>
              <Link to="/products?category=paid-games" className="hover:text-cyan-400 transition-colors">
                Paid PC Games
              </Link>
            </li>
            <li>
              <Link to="/products?category=mobile-topups" className="hover:text-cyan-400 transition-colors">
                Mobile Top-Ups & Coins
              </Link>
            </li>
            <li>
              <Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">
                Digital Gift Cards
              </Link>
            </li>
            <li>
              <Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">
                App Subscriptions
              </Link>
            </li>
          </ul>
        </div>

        {/* Payment Methods Info */}
        <div>
          <h4 className="font-bold text-slate-200 text-sm mb-3 text-white uppercase tracking-wider text-[11px]">
            Accepted Payment Methods
          </h4>
          <p className="text-slate-400 text-xs mb-3">
            Fast, secure manual local payments for Iraq & Kurdistan region:
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-1 bg-slate-900 border border-amber-500/40 text-amber-400 rounded text-[11px] font-bold">
              FastPay
            </span>
            <span className="px-2.5 py-1 bg-slate-900 border border-yellow-500/40 text-yellow-400 rounded text-[11px] font-bold">
              Korek Cash
            </span>
            <span className="px-2.5 py-1 bg-slate-900 border border-blue-500/40 text-blue-400 rounded text-[11px] font-bold">
              MasterCard
            </span>
          </div>
        </div>

        {/* Admin Access */}
        <div>
          <h4 className="font-bold text-slate-200 text-sm mb-3 text-white uppercase tracking-wider text-[11px]">
            Management & Info
          </h4>
          <ul className="space-y-2">
            <li>
              <Link to="/admin-login" className="hover:text-cyan-400 transition-colors font-semibold text-slate-300">
                Admin Control Panel
              </Link>
            </li>
            <li>
              <span className="text-slate-400 text-xs">Currency: IQD Only</span>
            </li>
            <li>
              <span className="text-slate-400 text-xs">Region: Kurdistan / Iraq</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-900 py-4 bg-black/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-400 text-[11px]">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for Kurdish Gamers
          </p>
        </div>
      </div>
    </footer>
  );
}
