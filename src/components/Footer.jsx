import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad, ShieldCheck, HeartHandshake, PhoneCall, CreditCard, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#03050a] border-t border-slate-800/80 pt-12 pb-8 mt-20 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-slate-800/60">

          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1.5px]">
                <div className="w-full h-full bg-[#05070f] rounded-[6px] flex items-center justify-center">
                  <Gamepad className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-heading font-extrabold text-xl tracking-wider text-white">
                DANO<span className="text-cyan-400 ml-1">STORE</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Premium digital gaming marketplace in Kurdistan & Iraq. Instant delivery for games, mobile top-ups, gift cards, and subscriptions.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="px-2.5 py-1 text-[11px] rounded bg-slate-900 border border-slate-800 text-cyan-400 font-semibold">
                Fast Delivery
              </span>
              <span className="px-2.5 py-1 text-[11px] rounded bg-slate-900 border border-slate-800 text-purple-400 font-semibold">
                100% Safe
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-white tracking-wider uppercase text-sm">Quick Links</h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/products" className="hover:text-cyan-400 transition-colors">All Products</Link></li>
              <li><Link to="/products?category=mobile-topups" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups (UC, VP, Diamonds)</Link></li>
              <li><Link to="/products?category=games" className="hover:text-cyan-400 transition-colors">PC & Console Paid Games</Link></li>
              <li><Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">Steam & PSN Gift Cards</Link></li>
              <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Discord Nitro & Netflix</Link></li>
            </ul>
          </div>

          {/* Payment Methods Info */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-white tracking-wider uppercase text-sm">Payment Methods</h3>
            <p className="text-xs text-slate-400">Accepted local payment options in Iraq & Kurdistan region:</p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-bold text-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span> FastPay
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-bold text-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span> Korek
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-bold text-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span> MasterCard
              </span>
            </div>
          </div>

          {/* Customer Support */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-white tracking-wider uppercase text-sm">Customer Support</h3>
            <p className="text-xs text-slate-400">Need help with your order? Reach out via WhatsApp or Discord support.</p>
            <div className="pt-2 space-y-2">
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 font-semibold text-xs hover:bg-emerald-900/60 transition-all w-full justify-center"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp Support
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Designed for gaming fans in Iraq & Kurdistan.</p>
          <div className="flex items-center gap-4">
            <Link to="/admin-login" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" /> Admin Access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
