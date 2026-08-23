import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Phone, Headphones, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#03060d] border-t border-slate-800/80 text-slate-400 text-sm mt-16">
      {/* Top Features Banner */}
      <div className="border-b border-slate-800/60 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Instant Delivery</h4>
              <p className="text-xs text-slate-400">Digital keys delivered in seconds</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">100% Legal & Safe</h4>
              <p className="text-xs text-slate-400">Official publisher keys & top-ups</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Kurdistan & Iraq</h4>
              <p className="text-xs text-slate-400">FastPay, Korek & MasterCard</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">24/7 Gamer Support</h4>
              <p className="text-xs text-slate-400">WhatsApp & Discord team</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-lg">
              D
            </div>
            <span className="text-xl font-black text-white">
              Dano <span className="text-cyan-400">Store</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed">
            The premier digital store for games, game top-ups, gift cards, and subscriptions in Kurdistan and Iraq. Fast, secure, and always reliable.
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider text-cyan-400">Quick Navigation</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home Page</Link></li>
            <li><Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">Mobile Game Top-Ups</Link></li>
            <li><Link to="/products?category=games" className="hover:text-cyan-400 transition-colors">Paid PC & Console Games</Link></li>
            <li><Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">Digital Gift Cards</Link></li>
            <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Digital Subscriptions</Link></li>
          </ul>
        </div>

        {/* Local Payment Methods */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider text-cyan-400">Supported Local Payments</h4>
          <p className="text-xs text-slate-400">Pay conveniently using regional Iraqi payment channels:</p>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-300">FastPay</span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-300">Korek Mobile</span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-300">MasterCard</span>
          </div>
        </div>

        {/* Support & Contact */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider text-cyan-400">Need Help?</h4>
          <p className="text-xs text-slate-400">Have questions about your order or top-up? Contact our team on WhatsApp.</p>
          <a
            href="https://wa.me/9647500000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30 transition-colors font-medium text-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-900 py-6 text-center text-xs text-slate-400">
        <p>&copy; {new Date().getFullYear()} Dano Store. All rights reserved. Built for Kurdistan & Iraq gamers.</p>
      </div>
    </footer>
  );
}
