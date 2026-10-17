import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#03050a] border-t border-slate-800/80 text-slate-400 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-slate-800/60">

          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 text-slate-950 font-bold" />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-white">
                DANO STORE
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              The premier digital gaming store in Kurdistan & Iraq. Buy game keys, top-ups, gift cards, and subscriptions with instant digital delivery.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>100% Guaranteed Official Digital Codes</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-cyan-400 transition-colors">All Products</Link>
              </li>
              <li>
                <Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups (PUBG UC, Diamonds)</Link>
              </li>
              <li>
                <Link to="/products?category=games" className="hover:text-cyan-400 transition-colors">Paid PC & Console Games</Link>
              </li>
              <li>
                <Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">Gift Cards (Steam, PSN, Xbox)</Link>
              </li>
              <li>
                <Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Subscriptions (Discord, YouTube)</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Payment Methods */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider">Payment Methods</h4>
            <p className="text-xs text-slate-400">
              We accept manual payments in IQD for seamless transactions in Kurdistan & Iraq:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200">
                FastPay
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200">
                Korek Cash
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200">
                MasterCard / FIB
              </span>
            </div>
          </div>

          {/* Column 4: Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider">Need Help?</h4>
            <p className="text-xs text-slate-400">
              Have questions about your order or payment? Contact our customer support:
            </p>
            <div className="space-y-2 pt-1">
              <a
                href="https://wa.me/9647500000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-emerald-400 text-xs font-bold hover:bg-emerald-900/40 transition-colors"
              >
                <Zap className="w-4 h-4" />
                <span>WhatsApp Customer Support</span>
              </a>
              <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                <Headphones className="w-3.5 h-3.5 text-cyan-400" />
                <span>Support Hours: 9:00 AM - 12:00 AM</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Dano Store. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Currency: <strong className="text-slate-300">IQD</strong></span>
            <Link to="/admin" className="hover:text-cyan-400">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
