import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MessageCircle, Send, CheckCircle2, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#03050a] border-t border-slate-800 text-slate-400 text-sm mt-auto">
      {/* Upper features bar */}
      <div className="border-b border-slate-900 bg-[#060a15] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-200 text-sm">100% Guaranteed Keys</p>
              <p className="text-xs text-slate-400">Authentic digital codes and top-ups</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-200 text-sm">Local Iraqi Payments</p>
              <p className="text-xs text-slate-400">FastPay, Korek & MasterCard accepted</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-950/60 border border-blue-800/40 flex items-center justify-center text-blue-400">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-200 text-sm">Instant Customer Support</p>
              <p className="text-xs text-slate-400">Contact us via WhatsApp & Discord</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-200 text-sm">Manual Delivery</p>
              <p className="text-xs text-slate-400">Fast verification directly to your phone</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-4">
            <span className="text-2xl font-black text-white font-['Rajdhani',sans-serif] tracking-wider">
              DANO <span className="text-cyan-400">STORE</span>
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dano Store is Kurdistan & Iraq's premier digital gaming marketplace. We provide top-ups, paid Steam keys, console games, subscriptions, and verified gift cards with manual local payment options.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/9647501234567"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-900/40 border border-emerald-700/50 flex items-center justify-center text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all text-xs font-bold"
              >
                WA
              </a>
              <a
                href="https://discord.gg/danostore"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-indigo-900/40 border border-indigo-700/50 flex items-center justify-center text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all text-xs font-bold"
              >
                DC
              </a>
              <a
                href="https://tiktok.com/@danostore"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-pink-900/40 border border-pink-700/50 flex items-center justify-center text-pink-400 hover:bg-pink-600 hover:text-white transition-all text-xs font-bold"
              >
                TT
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              Explore Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/products?category=Mobile+Top-Up" className="hover:text-cyan-400 transition-colors">
                  Mobile Top-Ups (UC, Diamonds, VP)
                </Link>
              </li>
              <li>
                <Link to="/products?category=Games" className="hover:text-cyan-400 transition-colors">
                  Steam & PC Paid Games
                </Link>
              </li>
              <li>
                <Link to="/products?category=Gift+Cards" className="hover:text-cyan-400 transition-colors">
                  Steam, PSN & Xbox Gift Cards
                </Link>
              </li>
              <li>
                <Link to="/products?category=Subscriptions" className="hover:text-cyan-400 transition-colors">
                  Discord Nitro, YouTube & Netflix
                </Link>
              </li>
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              Shop by Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/products?platform=PC" className="hover:text-cyan-400 transition-colors">
                  PC Gaming & Steam Keys
                </Link>
              </li>
              <li>
                <Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">
                  Xbox Series X|S & Game Pass
                </Link>
              </li>
              <li>
                <Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">
                  PlayStation 4 & 5
                </Link>
              </li>
              <li>
                <Link to="/products?platform=Mobile" className="hover:text-cyan-400 transition-colors">
                  iOS & Android Mobile
                </Link>
              </li>
            </ul>
          </div>

          {/* Accepted Local Payments */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              Accepted Payment Methods
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              We exclusively accept verified manual transfers within Iraq:
            </p>
            <div className="flex flex-col gap-2">
              <div className="px-3 py-2 rounded-lg bg-slate-900 border border-emerald-900/50 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-400">FastPay</span>
                <span className="text-[10px] text-slate-400">Direct Wallet</span>
              </div>
              <div className="px-3 py-2 rounded-lg bg-slate-900 border border-blue-900/50 flex items-center justify-between">
                <span className="text-xs font-semibold text-blue-400">Korek Telecom</span>
                <span className="text-[10px] text-slate-400">Balance Transfer</span>
              </div>
              <div className="px-3 py-2 rounded-lg bg-slate-900 border border-purple-900/50 flex items-center justify-between">
                <span className="text-xs font-semibold text-purple-400">MasterCard</span>
                <span className="text-[10px] text-slate-400">Manual Card Transfer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-900 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Built for gamers in Kurdistan & Iraq.</p>
          <div className="flex items-center gap-4">
            <Link to="/admin-login" className="hover:text-cyan-400 transition-colors">
              Staff Portal
            </Link>
            <span>•</span>
            <span className="text-slate-400">Prices in Iraqi Dinar (IQD)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
