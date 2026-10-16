import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Heart, MessageSquare, PhoneCall } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#03050a] border-t border-slate-800/80 text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Gamepad2 className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-lg font-black tracking-wider text-slate-100">
                DANO <span className="text-cyan-400">STORE</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your premiere digital gaming store in Kurdistan & Iraq. Fast, reliable codes, PC games, gift cards, subscriptions, and instant mobile top-ups.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 bg-cyan-950/30 border border-cyan-900/50 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4" />
              100% Genuine Digital Codes
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/products?category=mobile-topups" className="hover:text-cyan-400 transition-colors">
                  PUBG UC & Mobile Top-Ups
                </Link>
              </li>
              <li>
                <Link to="/products?category=paid-games" className="hover:text-cyan-400 transition-colors">
                  Steam & PC Paid Games
                </Link>
              </li>
              <li>
                <Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">
                  PlayStation, Xbox & Steam Cards
                </Link>
              </li>
              <li>
                <Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">
                  Discord Nitro & YouTube Premium
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">
              Supported Payments
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-slate-200 font-semibold">FastPay</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="text-slate-200 font-semibold">Korek Cash / Direct</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                <span className="text-slate-200 font-semibold">MasterCard</span>
              </div>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">
              Customer Support
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Need assistance with your order? Reach out on our official channels:
            </p>
            <div className="flex flex-col gap-2 text-xs">
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 hover:bg-emerald-900/50 transition-colors font-bold"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Support
              </a>
              <a
                href="https://discord.com/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-indigo-950/40 border border-indigo-800/40 text-indigo-300 hover:bg-indigo-900/50 transition-colors font-bold"
              >
                <PhoneCall className="w-4 h-4" />
                Discord Community
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/admin-login" className="hover:text-cyan-400 transition-colors">
              Admin Portal
            </Link>
            <span>•</span>
            <span className="text-slate-400">Erbil & Sulaymaniyah, Kurdistan Region</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
