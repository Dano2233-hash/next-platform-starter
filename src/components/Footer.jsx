import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, PhoneCall, Mail, MessageSquare, CreditCard, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#03050a] border-t border-slate-800/80 text-slate-400 text-xs mt-auto">
      {/* Top Features Banner */}
      <div className="border-b border-slate-800/60 bg-slate-950/60 py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <Zap className="w-6 h-6 text-cyan-400 shrink-0" />
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Instant Delivery</h4>
              <p className="text-[11px] text-slate-400">Codes delivered immediately via WhatsApp & Order Success page</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <ShieldCheck className="w-6 h-6 text-blue-400 shrink-0" />
            <div>
              <h4 className="font-bold text-slate-200 text-sm">100% Genuine</h4>
              <p className="text-[11px] text-slate-400">Official digital codes & authorized local reloads</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <CreditCard className="w-6 h-6 text-purple-400 shrink-0" />
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Local Payment</h4>
              <p className="text-[11px] text-slate-400">FastPay, Korek Cash & MasterCard support</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <PhoneCall className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <h4 className="font-bold text-slate-200 text-sm">24/7 Support</h4>
              <p className="text-[11px] text-slate-400">Direct assistance via WhatsApp, Discord & TikTok</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-5 gap-8">

        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 shadow-md">
              <div className="w-full h-full bg-[#05070f] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="font-extrabold text-xl bg-gradient-to-r from-cyan-400 via-blue-200 to-purple-400 bg-clip-text text-transparent">
              Dano Store
            </span>
          </Link>

          <p className="text-slate-400 leading-relaxed max-w-sm">
            Kurdistan and Iraq's premier digital gaming marketplace. Your trusted source for PUBG UC, Steam gift cards, PC games, PlayStation top-ups, Xbox codes, and premium subscriptions.
          </p>

          {/* Payment Method Badges */}
          <div className="pt-2">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-2">
              Accepted Payment Methods
            </span>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 font-bold text-xs tracking-wide">
                FastPay
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-red-400 font-bold text-xs tracking-wide">
                Korek
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-400 font-bold text-xs tracking-wide">
                MasterCard
              </span>
            </div>
          </div>
        </div>

        {/* Categories Column */}
        <div>
          <h4 className="font-bold text-slate-200 text-sm mb-3 text-cyan-400">Game Categories</h4>
          <ul className="space-y-2">
            <li><Link to="/products?category=mobile" className="hover:text-cyan-300 transition-colors">PUBG UC & Mobile Top-Ups</Link></li>
            <li><Link to="/products?category=pc" className="hover:text-cyan-300 transition-colors">Steam PC Games & VP</Link></li>
            <li><Link to="/products?category=playstation" className="hover:text-cyan-300 transition-colors">PlayStation PSN Cards</Link></li>
            <li><Link to="/products?category=xbox" className="hover:text-cyan-300 transition-colors">Xbox Game Pass & Cards</Link></li>
            <li><Link to="/products?category=gift-cards" className="hover:text-cyan-300 transition-colors">Apple & Google Play Cards</Link></li>
            <li><Link to="/products?category=subscriptions" className="hover:text-cyan-300 transition-colors">Discord Nitro & Subscriptions</Link></li>
          </ul>
        </div>

        {/* Navigation Column */}
        <div>
          <h4 className="font-bold text-slate-200 text-sm mb-3 text-cyan-400">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-cyan-300 transition-colors">Home Page</Link></li>
            <li><Link to="/products" className="hover:text-cyan-300 transition-colors">All Store Products</Link></li>
            <li><Link to="/cart" className="hover:text-cyan-300 transition-colors">Shopping Cart</Link></li>
            <li><Link to="/checkout" className="hover:text-cyan-300 transition-colors">Checkout</Link></li>
            <li><Link to="/admin-login" className="hover:text-cyan-300 transition-colors">Admin Portal</Link></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="font-bold text-slate-200 text-sm mb-3 text-cyan-400">Customer Support</h4>
          <p className="text-slate-400 mb-3">Reach out via our official social channels after placing your order for instant manual verification.</p>
          <div className="space-y-2 font-medium">
            <div className="flex items-center gap-2 text-cyan-300">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp: +964 750 000 0000</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Discord: @DanoStoreSupport</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-slate-900 bg-[#020307] py-4 px-4 text-center text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Target market: Kurdistan & Iraq.</p>
          <p className="text-[11px] text-slate-600">Designed for gamers in Erbil, Sulaymaniyah, Duhok, Kirkuk, and Baghdad.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
