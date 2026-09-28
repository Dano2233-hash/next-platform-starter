import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, PhoneCall, CreditCard, MessageCircle, Globe } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-20 bg-[#03050a] border-t border-slate-800/80 text-slate-400 text-sm">
      {/* Top Highlights Banner */}
      <div className="border-b border-slate-800/60 bg-slate-900/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800/50">
            <Zap className="w-6 h-6 text-cyan-400 shrink-0" />
            <div>
              <h5 className="font-bold text-slate-200 text-xs uppercase tracking-wider">Instant Delivery</h5>
              <p className="text-[11px] text-slate-400">Automated & fast code dispatch</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800/50">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <h5 className="font-bold text-slate-200 text-xs uppercase tracking-wider">100% Legal & Safe</h5>
              <p className="text-[11px] text-slate-400">Official digital game licenses</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800/50">
            <PhoneCall className="w-6 h-6 text-purple-400 shrink-0" />
            <div>
              <h5 className="font-bold text-slate-200 text-xs uppercase tracking-wider">Kurdistan Support</h5>
              <p className="text-[11px] text-slate-400">Direct WhatsApp support</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800/50">
            <CreditCard className="w-6 h-6 text-blue-400 shrink-0" />
            <div>
              <h5 className="font-bold text-slate-200 text-xs uppercase tracking-wider">Local Payment</h5>
              <p className="text-[11px] text-slate-400">FastPay, Korek, MasterCard</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-lg text-white">
                Dano <span className="text-cyan-400">Store</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Premium digital gaming store for Kurdistan and Iraq. Fast top-ups, official CD keys, gift cards, and subscriptions at the best prices.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <span className="px-2.5 py-1 text-[11px] font-semibold bg-slate-800/80 text-cyan-400 rounded-md border border-slate-700">
                IQD Currency Only
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-cyan-400 transition-colors">All Products</Link></li>
              <li><Link to="/cart" className="hover:text-cyan-400 transition-colors">Shopping Cart</Link></li>
              <li><Link to="/admin" className="hover:text-cyan-400 transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider mb-4">Categories</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups</Link></li>
              <li><Link to="/products?category=pc" className="hover:text-cyan-400 transition-colors">PC Games</Link></li>
              <li><Link to="/products?category=xbox" className="hover:text-cyan-400 transition-colors">Xbox Console</Link></li>
              <li><Link to="/products?category=playstation" className="hover:text-cyan-400 transition-colors">PlayStation Store</Link></li>
              <li><Link to="/products?category=giftcards" className="hover:text-cyan-400 transition-colors">Digital Gift Cards</Link></li>
              <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Subscriptions</Link></li>
            </ul>
          </div>

          {/* Supported Payments & Contact */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider">Accepted Local Payments</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium text-slate-300">
                FastPay
              </span>
              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium text-slate-300">
                Korek
              </span>
              <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium text-slate-300">
                MasterCard
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Manual payment transfer with instant verification.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Gaming Store Kurdistan / Iraq.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 transition-colors">Privacy Policy</span>
            <span className="hover:text-slate-400 transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
