import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#030508] border-t border-slate-800/80 pt-12 pb-8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Features banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10 border-b border-slate-800/60 mb-10">
          <div className="flex items-center gap-3 bg-slate-900/40 p-4 rounded-xl border border-slate-800/60">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Instant Delivery</h4>
              <p className="text-slate-400 text-xs mt-0.5">Automated codes and fast top-ups for Kurdistan & Iraq.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/40 p-4 rounded-xl border border-slate-800/60">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">100% Legal & Safe</h4>
              <p className="text-slate-400 text-xs mt-0.5">Verified digital products directly from official distributors.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/40 p-4 rounded-xl border border-slate-800/60">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Local Customer Support</h4>
              <p className="text-slate-400 text-xs mt-0.5">Dedicated WhatsApp & Discord support team ready to assist.</p>
            </div>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10">

          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white">
                <Gamepad2 className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-wider">
                Dano Store
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Kurdistan and Iraq’s premier digital gaming destination. We provide base games, game top-ups, gift cards, and subscriptions with fast manual payment options.
            </p>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wider">
              Categories
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=mobile-topups" className="hover:text-cyan-400 transition-colors">
                  Mobile Top-Ups
                </Link>
              </li>
              <li>
                <Link to="/products?category=paid-games" className="hover:text-cyan-400 transition-colors">
                  Paid Base Games
                </Link>
              </li>
              <li>
                <Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">
                  Gift Cards
                </Link>
              </li>
              <li>
                <Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">
                  Subscriptions
                </Link>
              </li>
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wider">
              Platforms
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products?platform=PC" className="hover:text-cyan-400 transition-colors">
                  PC Gaming
                </Link>
              </li>
              <li>
                <Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">
                  PlayStation
                </Link>
              </li>
              <li>
                <Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">
                  Xbox Series X|S
                </Link>
              </li>
              <li>
                <Link to="/products?platform=Mobile" className="hover:text-cyan-400 transition-colors">
                  Mobile Games
                </Link>
              </li>
            </ul>
          </div>

          {/* Accepted Payments */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wider">
              Accepted Payments
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-bold text-[11px] text-pink-400">
                FastPay
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-bold text-[11px] text-yellow-400">
                Korek
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-bold text-[11px] text-blue-400">
                MasterCard
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-3 leading-tight">
              Local manual payment processing only.
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built for gamers in Kurdistan & Iraq with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>

      </div>
    </footer>
  );
}
