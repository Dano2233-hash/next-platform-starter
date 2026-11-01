import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, MessageCircle } from 'lucide-react';
import { SOCIAL_CONTACTS } from '../data/categories';

export default function Footer() {
  return (
    <footer className="bg-[#04060c] border-t border-slate-850 pt-12 pb-8 text-slate-400 text-xs">
      {/* Top Features Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 mb-10 border-b border-slate-800/80">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-950/60 text-cyan-400 border border-blue-800/40">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Instant Delivery</h4>
              <p className="text-slate-400 text-xs">Codes & top-ups loaded directly</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-950/60 text-indigo-400 border border-indigo-800/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Legal & Safe</h4>
              <p className="text-slate-400 text-xs">Authorized regional distribution</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950/60 text-cyan-400 border border-cyan-800/40">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Local Kurdistan Support</h4>
              <p className="text-slate-400 text-xs">Available via WhatsApp & Discord</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-950/60 text-purple-400 border border-purple-800/40">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Fair IQD Pricing</h4>
              <p className="text-slate-400 text-xs">Fixed rates with zero surprise fees</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-8 pb-10">
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-black text-white">
              Dano <span className="text-cyan-400">Store</span>
            </span>
          </Link>
          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            Dano Store is Kurdistan and Iraq's dedicated digital gaming store. Offering the fastest direct top-ups for PUBG Mobile, Free Fire, Fortnite, Valorant, plus full paid Steam titles, PlayStation & Xbox gift cards, and premium subscriptions.
          </p>

          <div className="pt-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-2">
              Customer Support Direct Lines
            </span>
            <div className="flex flex-wrap gap-2">
              <a
                href={SOCIAL_CONTACTS.whatsapp.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-xs font-semibold hover:bg-emerald-900/60 transition-colors"
              >
                <span>WhatsApp</span>
              </a>
              <a
                href={SOCIAL_CONTACTS.discord.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/60 text-indigo-400 border border-indigo-500/30 text-xs font-semibold hover:bg-indigo-900/60 transition-colors"
              >
                <span>Discord</span>
              </a>
              <a
                href={SOCIAL_CONTACTS.tiktok.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-950/60 text-pink-400 border border-pink-500/30 text-xs font-semibold hover:bg-pink-900/60 transition-colors"
              >
                <span>TikTok</span>
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Shop Categories</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/products?category=mobile-topups" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups</Link></li>
            <li><Link to="/products?category=games" className="hover:text-cyan-400 transition-colors">PC & Console Games</Link></li>
            <li><Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">Digital Gift Cards</Link></li>
            <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Premium Subscriptions</Link></li>
            <li><Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">Xbox Store</Link></li>
            <li><Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">PlayStation Store</Link></li>
          </ul>
        </div>

        {/* Useful Pages */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Store Navigation</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home Page</Link></li>
            <li><Link to="/products" className="hover:text-cyan-400 transition-colors">All Products</Link></li>
            <li><Link to="/cart" className="hover:text-cyan-400 transition-colors">View Cart</Link></li>
            <li><Link to="/checkout" className="hover:text-cyan-400 transition-colors">Checkout</Link></li>
            <li><Link to="/admin-login" className="hover:text-cyan-400 transition-colors">Admin Portal</Link></li>
          </ul>
        </div>

        {/* Payment Methods */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Accepted Payments</h4>
          <p className="text-[11px] text-slate-400 mb-3">
            Manual transfers exclusively via local Iraqi payment methods:
          </p>
          <div className="space-y-2">
            <div className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="font-bold text-cyan-400">FastPay</span>
              <span className="text-[10px] text-slate-500">Mobile Wallet</span>
            </div>
            <div className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="font-bold text-yellow-400">Korek</span>
              <span className="text-[10px] text-slate-500">Telecom / Cash</span>
            </div>
            <div className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="font-bold text-red-400">MasterCard</span>
              <span className="text-[10px] text-slate-500">Local Bank Card</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <div>
          &copy; {new Date().getFullYear()} Dano Store. All rights reserved. Built for Iraqi and Kurdish Gamers.
        </div>
        <div className="flex items-center gap-4">
          <span>Official Digital Delivery</span>
          <span>•</span>
          <span>Currency: IQD</span>
        </div>
      </div>
    </footer>
  );
}
