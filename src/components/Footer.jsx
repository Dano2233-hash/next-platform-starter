import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, MessageCircle, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#03050b] border-t border-slate-800/80 text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-[1.5px]">
                <div className="w-full h-full bg-[#080d1a] rounded-[10px] flex items-center justify-center">
                  <Gamepad2 className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-lg font-black tracking-wider text-slate-100">
                DANO STORE
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Kurdistan & Iraq’s trusted destination for digital games, mobile top-ups, gift cards, and subscriptions with fast local manual payments.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-cyan-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Legal Digital Codes
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4">
              Quick Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/products?category=mobile-topups" className="hover:text-cyan-400 transition">
                  Mobile Top-Ups (PUBG / Free Fire)
                </Link>
              </li>
              <li>
                <Link to="/products?category=pc-games" className="hover:text-cyan-400 transition">
                  PC Paid Games (GTA V / Elden Ring)
                </Link>
              </li>
              <li>
                <Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition">
                  Steam & Console Gift Cards
                </Link>
              </li>
              <li>
                <Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition">
                  Discord Nitro & Subscriptions
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4">
              Customer Support
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Need instant assistance with an order? Reach out on our social channels:
            </p>
            <div className="flex flex-col gap-2 text-xs">
              <a
                href="https://wa.me/9647500000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:underline"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Support
              </a>
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-indigo-400 hover:underline"
              >
                <Send className="w-4 h-4" /> Discord Community
              </a>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4">
              Accepted Payments
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Manual local payment methods accepted for fast processing:
            </p>
            <div className="flex flex-wrap gap-2">
              <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-bold text-yellow-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-yellow-400"></span> FastPay
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-bold text-red-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400"></span> Korek
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-bold text-blue-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span> MasterCard
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/admin" className="hover:text-cyan-400 transition">
              Admin Portal
            </Link>
            <span>•</span>
            <span>Kurdistan & Iraq Digital Gaming</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
