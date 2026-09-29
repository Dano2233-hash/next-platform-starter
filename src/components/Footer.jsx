import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, MessageSquare, ShieldAlert, CreditCard, Send, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#03050c] border-t border-slate-800/80 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 text-slate-950 font-bold" />
              </div>
              <span className="text-lg font-black text-slate-100">Dano Store</span>
            </Link>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Kurdistan and Iraq's premier digital gaming store. Offering instant top-ups, paid Steam keys, digital gift cards, and premium subscriptions with local IQD payments.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-cyan-400 font-bold">
              <span>Currency Supported:</span>
              <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                IQD Only
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-100 font-bold text-xs uppercase tracking-wider mb-3 text-cyan-400">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-cyan-300 transition-colors">Home Page</Link></li>
              <li><Link to="/products" className="hover:text-cyan-300 transition-colors">All Store Products</Link></li>
              <li><Link to="/products?category=Mobile%20Top-Ups" className="hover:text-cyan-300 transition-colors">Mobile Game Top-Ups</Link></li>
              <li><Link to="/products?category=Paid%20Games" className="hover:text-cyan-300 transition-colors">PC & Console Games</Link></li>
              <li><Link to="/products?category=Gift%20Cards" className="hover:text-cyan-300 transition-colors">Digital Gift Cards</Link></li>
              <li><Link to="/products?category=Subscriptions" className="hover:text-cyan-300 transition-colors">Subscriptions</Link></li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 className="text-slate-100 font-bold text-xs uppercase tracking-wider mb-3 text-cyan-400">
              Accepted Payments
            </h4>
            <p className="text-[11px] text-slate-400 mb-3">
              We support fast manual transfers in IQD:
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="font-bold">FastPay Wallet</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="font-bold">Korek Cash / Balance</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
                <div className="w-2 h-2 rounded-full bg-purple-400" />
                <span className="font-bold">MasterCard / FIB</span>
              </div>
            </div>
          </div>

          {/* Support & Community */}
          <div>
            <h4 className="text-slate-100 font-bold text-xs uppercase tracking-wider mb-3 text-cyan-400">
              Customer Support
            </h4>
            <p className="text-[11px] text-slate-400 mb-3">
              Need help completing your order? Reach us directly on our official channels:
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="https://wa.me/9647500000000"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/40 font-bold text-xs flex items-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                WhatsApp Support
              </a>
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-900/40 font-bold text-xs flex items-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4 text-indigo-400" />
                Discord Community
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Dano Store. Built for Kurdistan & Iraq gamers.</p>
          <div className="flex items-center gap-1 text-slate-400">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for the Gaming Community
          </div>
        </div>
      </div>
    </footer>
  );
}
