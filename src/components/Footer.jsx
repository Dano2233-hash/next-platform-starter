import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, CreditCard, MessageSquare } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#03050a] border-t border-slate-800/80 text-slate-400 pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Features banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-slate-800/60">
          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-slate-200">Instant Delivery</h5>
              <p className="text-xs text-slate-500">Automated digital code distribution</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-slate-200">100% Legal & Safe</h5>
              <p className="text-xs text-slate-500">Official codes & game keys</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-slate-200">Local Payments</h5>
              <p className="text-xs text-slate-500">FastPay, Korek & MasterCard</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-slate-200">24/7 Support</h5>
              <p className="text-xs text-slate-500">WhatsApp & Discord active</p>
            </div>
          </div>
        </div>

        {/* Footer Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-0.5">
                <div className="w-full h-full bg-[#05070f] rounded-[10px] flex items-center justify-center">
                  <Gamepad2 className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-lg font-extrabold text-white">
                Dano<span className="text-cyan-400">Store</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Premier digital store for PC & console games, mobile top-ups, gift cards, and subscriptions across Kurdistan and Iraq.
            </p>
            <div className="text-xs text-slate-500">
              Region: <span className="text-cyan-400 font-semibold">Erbil / Sulaymaniyah / Duhok / Iraq</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/products?category=mobile-top-ups" className="hover:text-cyan-400 transition-colors">
                  Mobile Top-Ups (PUBG UC, Diamonds)
                </Link>
              </li>
              <li>
                <Link to="/products?category=pc-gaming" className="hover:text-cyan-400 transition-colors">
                  PC Games (Steam Keys & CD Keys)
                </Link>
              </li>
              <li>
                <Link to="/products?category=playstation" className="hover:text-cyan-400 transition-colors">
                  PlayStation Cards & Games
                </Link>
              </li>
              <li>
                <Link to="/products?category=xbox" className="hover:text-cyan-400 transition-colors">
                  Xbox Game Pass & Cards
                </Link>
              </li>
              <li>
                <Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">
                  Gift Cards (Steam, iTunes, Google)
                </Link>
              </li>
              <li>
                <Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">
                  Subscriptions (Discord Nitro, Premium)
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/products" className="hover:text-cyan-400 transition-colors">
                  Browse All Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-cyan-400 transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-cyan-400 transition-colors">
                  Checkout
                </Link>
              </li>
              <li>
                <Link to="/admin-login" className="hover:text-cyan-400 transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Accepted Payments */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Supported Payments
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              We accept manual local Kurdistan & Iraq payment methods:
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-cyan-400">
                FastPay
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-amber-400">
                Korek
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-blue-400">
                MasterCard
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 transition-colors cursor-pointer">
              Terms of Service
            </span>
            <span>•</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">
              Privacy Policy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
