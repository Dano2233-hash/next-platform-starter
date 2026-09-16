import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, CreditCard, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#030407] border-t border-slate-800/80 text-slate-400 mt-16">
      {/* Value Proposition Highlights */}
      <div className="border-b border-slate-800/60 py-8 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/30 border border-slate-800/50">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wide">Instant Delivery</h4>
              <p className="text-[11px] text-slate-500">Automated digital code distribution</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/30 border border-slate-800/50">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wide">100% Legal & Safe</h4>
              <p className="text-[11px] text-slate-500">Official publishers & direct top-ups</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/30 border border-slate-800/50">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wide">Local Payments</h4>
              <p className="text-[11px] text-slate-500">FastPay, Korek & MasterCard IQD</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/30 border border-slate-800/50">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wide">Customer Support</h4>
              <p className="text-[11px] text-slate-500">WhatsApp & Discord support team</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="text-lg font-black tracking-tight text-white font-sans">
                DANO <span className="text-cyan-400">STORE</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Kurdistan and Iraq's trusted premier digital store for video games, mobile top-ups, gift cards, and subscriptions.
            </p>
            <div className="text-xs text-slate-500 font-mono">
              Currency: <span className="text-cyan-400 font-bold">IQD</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">Categories</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/products?category=Mobile Top-Ups" className="hover:text-cyan-400 transition-colors">
                  Mobile Top-Ups (UC, Diamonds, VP)
                </Link>
              </li>
              <li>
                <Link to="/products?category=Paid Games" className="hover:text-cyan-400 transition-colors">
                  PC & Console Paid Games
                </Link>
              </li>
              <li>
                <Link to="/products?category=Gift Cards" className="hover:text-cyan-400 transition-colors">
                  Gift Cards (Steam, PSN, Xbox, Google)
                </Link>
              </li>
              <li>
                <Link to="/products?category=Subscriptions" className="hover:text-cyan-400 transition-colors">
                  Subscriptions (Nitro, Netflix, Spotify)
                </Link>
              </li>
            </ul>
          </div>

          {/* Platforms */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">Platforms</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/products?platform=PC" className="hover:text-cyan-400 transition-colors">
                  PC Gaming
                </Link>
              </li>
              <li>
                <Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">
                  PlayStation Store
                </Link>
              </li>
              <li>
                <Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">
                  Xbox Series X|S
                </Link>
              </li>
              <li>
                <Link to="/products?platform=Mobile" className="hover:text-cyan-400 transition-colors">
                  Mobile Gaming (iOS & Android)
                </Link>
              </li>
            </ul>
          </div>

          {/* Accepted Local Payment Methods */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">Accepted Local Payments</h3>
            <p className="text-xs text-slate-400">
              Manual transfer via local Iraqi payment methods:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-sky-400 text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400" /> FastPay
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-amber-400 text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" /> Korek
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-cyan-400 text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" /> MasterCard / FIB
              </span>
            </div>
            <div className="pt-2 text-[11px] text-slate-500 flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-400" /> Manual verification & direct code delivery
            </div>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Gaming Store Kurdistan & Iraq.</p>
          <div className="flex items-center gap-4">
            <Link to="/admin-login" className="text-slate-400 hover:text-cyan-400 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
