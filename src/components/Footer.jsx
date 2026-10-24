import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, MessageSquare, ExternalLink } from 'lucide-react';
import { PAYMENT_METHODS } from '../data/categories';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-sm mt-16">
      {/* Top Features Ribbon */}
      <div className="border-b border-slate-800/60 py-8 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Zap size={24} />
            </div>
            <div>
              <h4 className="font-heading font-bold text-slate-100">Instant Delivery</h4>
              <p className="text-xs text-slate-400">Digital codes delivered fast via WhatsApp & Order Success page.</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-heading font-bold text-slate-100">100% Guaranteed</h4>
              <p className="text-xs text-slate-400">Official digital product keys & legitimate mobile top-ups.</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
              <Headphones size={24} />
            </div>
            <div>
              <h4 className="font-heading font-bold text-slate-100">Kurdistan Support</h4>
              <p className="text-xs text-slate-400">24/7 dedicated customer service in Kurdish, Arabic & English.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div className="space-y-4 md:col-span-1">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 p-0.5">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Gamepad2 size={20} className="text-cyan-400" />
              </div>
            </div>
            <span className="font-heading font-black text-xl text-white">
              Dano <span className="text-cyan-400">Store</span>
            </span>
          </Link>

          <p className="text-xs text-slate-400 leading-relaxed">
            The premier digital gaming hub for Kurdistan & Iraq. Buy official Steam keys, PUBG UC, Free Fire Diamonds, gift cards, and premium subscriptions with local payment methods.
          </p>

          {/* Social Contact Links */}
          <div className="flex items-center gap-2 pt-2">
            <a
              href="https://wa.me/9647500000000"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-colors text-xs font-semibold flex items-center gap-1.5"
            >
              <MessageSquare size={14} /> WhatsApp
            </a>
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20 transition-colors text-xs font-semibold flex items-center gap-1.5"
            >
              <ExternalLink size={14} /> Discord
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-bold text-slate-200 text-sm uppercase tracking-wider mb-4">
            Navigation
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home Store</Link></li>
            <li><Link to="/products?category=games" className="hover:text-cyan-400 transition-colors">Paid Games</Link></li>
            <li><Link to="/products?category=topups" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups</Link></li>
            <li><Link to="/products?category=giftcards" className="hover:text-cyan-400 transition-colors">Gift Cards</Link></li>
            <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Subscriptions</Link></li>
            <li><Link to="/cart" className="hover:text-cyan-400 transition-colors">Shopping Cart</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-heading font-bold text-slate-200 text-sm uppercase tracking-wider mb-4">
            Top Platforms
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link to="/products?platform=PC" className="hover:text-cyan-400 transition-colors">PC Gaming</Link></li>
            <li><Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">PlayStation Store</Link></li>
            <li><Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">Xbox Store</Link></li>
            <li><Link to="/products?platform=Mobile" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups</Link></li>
            <li><Link to="/admin" className="hover:text-cyan-400 transition-colors">Admin Dashboard</Link></li>
          </ul>
        </div>

        {/* Payment Methods */}
        <div>
          <h4 className="font-heading font-bold text-slate-200 text-sm uppercase tracking-wider mb-4">
            Accepted Payments
          </h4>
          <p className="text-xs text-slate-400 mb-3">
            We support direct local transfers in IQD:
          </p>
          <div className="space-y-2">
            {PAYMENT_METHODS.map((pm) => (
              <div
                key={pm.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold"
              >
                <span className="text-slate-200">{pm.name}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${pm.badgeColor}`}>
                  {pm.logoText}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} Dano Store. All rights reserved. Kurdistan & Iraq Gaming Store.</span>
          <span className="text-slate-400 font-medium">Built with React, Vite & Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
