import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, CreditCard } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#03060d] border-t border-slate-800/80 text-slate-400 text-sm mt-20">
      {/* Trust Features Bar */}
      <div className="border-b border-slate-800/60 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Instant Delivery</h4>
                <p className="text-xs text-slate-500">Automated digital code delivery</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-xs uppercase tracking-wider">100% Guaranteed</h4>
                <p className="text-xs text-slate-500">Official license keys & top-ups</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Kurdistan Support</h4>
                <p className="text-xs text-slate-500">Fast assistance via WhatsApp & Discord</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Local Payments</h4>
                <p className="text-xs text-slate-500">FastPay, Korek, & MasterCard</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                Dano <span className="text-cyan-400">Store</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              The leading digital gaming store in Kurdistan and Iraq. We deliver top-ups, game keys, gift cards, and premium subscriptions with instant processing and dedicated customer support.
            </p>
            <div className="pt-2 text-xs text-slate-500 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-cyan-400">IQD</span>
              <span>All prices listed in Iraqi Dinar</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 border-l-2 border-cyan-500 pl-2">
              Popular Categories
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">PUBG UC & Mobile Top-ups</Link>
              </li>
              <li>
                <Link to="/products?category=paid-games" className="hover:text-cyan-400 transition-colors">Steam PC Paid Games</Link>
              </li>
              <li>
                <Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">Steam & PSN Gift Cards</Link>
              </li>
              <li>
                <Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Discord & Streaming Subs</Link>
              </li>
              <li>
                <Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">Xbox Digital Games</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/cart" className="hover:text-cyan-400 transition-colors">Shopping Cart</Link>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-cyan-400 transition-colors">Checkout</Link>
              </li>
              <li>
                <Link to="/admin-login" className="hover:text-cyan-400 transition-colors">Admin Login</Link>
              </li>
            </ul>
          </div>

          {/* Accepted Payments */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 border-l-2 border-purple-500 pl-2">
              Payment Methods
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>FastPay Wallet</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Korek Cash</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span>MasterCard Transfer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-slate-800/80 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved.</p>
          <p className="text-[11px] text-slate-500">
            All game titles, trademarks, logos, and images are copyright of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
};
