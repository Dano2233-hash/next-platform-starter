import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, MessageSquare, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#03060d] border-t border-slate-800/80 text-slate-400 text-xs mt-20">
      {/* Top Value Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-slate-800/60">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#070c18] border border-slate-800/80">
            <div className="p-2.5 rounded-lg bg-blue-900/30 text-blue-400 border border-blue-800/40">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200">Instant Digital Delivery</h4>
              <p className="text-[11px] text-slate-500">Fast processing on all codes</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#070c18] border border-slate-800/80">
            <div className="p-2.5 rounded-lg bg-cyan-900/30 text-cyan-400 border border-cyan-800/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200">100% Official & Legal</h4>
              <p className="text-[11px] text-slate-500">Authorized gaming services</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#070c18] border border-slate-800/80">
            <div className="p-2.5 rounded-lg bg-purple-900/30 text-purple-400 border border-purple-800/40">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200">Local Kurdistan/Iraq Payments</h4>
              <p className="text-[11px] text-slate-500">FastPay, Korek & MasterCard</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#070c18] border border-slate-800/80">
            <div className="p-2.5 rounded-lg bg-emerald-900/30 text-emerald-400 border border-emerald-800/40">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200">Customer Support</h4>
              <p className="text-[11px] text-slate-500">WhatsApp & Discord assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Col 1: Branding */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 p-0.5">
              <div className="w-full h-full bg-[#070b15] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <span className="text-lg font-black tracking-tight text-white">
              DANO <span className="text-cyan-400">STORE</span>
            </span>
          </Link>
          <p className="text-slate-400 text-xs leading-relaxed">
            The premier digital gaming platform in Kurdistan and Iraq for video game codes, top-ups, gift cards, and premium subscriptions.
          </p>
        </div>

        {/* Col 2: Categories */}
        <div>
          <h3 className="font-bold text-slate-200 text-sm mb-4 uppercase tracking-wider text-cyan-400">
            Categories
          </h3>
          <ul className="space-y-2">
            <li><Link to="/products?category=games" className="hover:text-white transition-colors">Paid Games</Link></li>
            <li><Link to="/products?category=mobile" className="hover:text-white transition-colors">Mobile Top-Ups</Link></li>
            <li><Link to="/products?category=giftcards" className="hover:text-white transition-colors">Gift Cards</Link></li>
            <li><Link to="/products?category=subscriptions" className="hover:text-white transition-colors">Subscriptions</Link></li>
          </ul>
        </div>

        {/* Col 3: Quick Links */}
        <div>
          <h3 className="font-bold text-slate-200 text-sm mb-4 uppercase tracking-wider text-cyan-400">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
            <li><Link to="/cart" className="hover:text-white transition-colors">My Cart</Link></li>
            <li><Link to="/admin-login" className="hover:text-white transition-colors">Admin Login</Link></li>
            <li><Link to="/admin" className="hover:text-white transition-colors">Admin Dashboard</Link></li>
          </ul>
        </div>

        {/* Col 4: Payment & Contact */}
        <div>
          <h3 className="font-bold text-slate-200 text-sm mb-4 uppercase tracking-wider text-cyan-400">
            Supported Payments
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded font-bold text-slate-300">FastPay</span>
            <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded font-bold text-slate-300">Korek</span>
            <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded font-bold text-slate-300">MasterCard / FIB</span>
          </div>
          <p className="text-[11px] text-slate-500">
            All transactions are conducted in Iraqi Dinar (IQD).
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800/80 bg-[#020409] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved.</p>
          <p>Targeted for Gaming Customers in Kurdistan & Iraq</p>
        </div>
      </div>
    </footer>
  );
}
