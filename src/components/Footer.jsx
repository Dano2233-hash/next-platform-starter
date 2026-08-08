import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#070709] border-t border-white/5 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Logo & Info */}
          <div className="space-y-4">
            <Link to="/" className="text-xl font-black tracking-wider text-white flex items-center gap-2">
              <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-600 bg-clip-text text-transparent">
                DANO
              </span>
              <span className="text-white text-base font-medium px-2 py-0.5 rounded bg-white/5 border border-white/10 uppercase tracking-widest text-xs">
                STORE
              </span>
            </Link>
            <p className="text-xs text-white/50 leading-relaxed">
              Dano Store is Kurdistan's premier gaming and digital service provider. We provide instant game keys, subscriptions, mobile top-ups, and gift cards with the most competitive pricing.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Categories</h4>
            <ul className="space-y-2 text-xs text-white/60">
              <li><Link to="/products?category=xbox" className="hover:text-cyan-400 transition-colors">Xbox Store</Link></li>
              <li><Link to="/products?category=playstation" className="hover:text-cyan-400 transition-colors">PlayStation Store</Link></li>
              <li><Link to="/products?category=pc" className="hover:text-cyan-400 transition-colors">PC Gaming</Link></li>
              <li><Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups</Link></li>
            </ul>
          </div>

          {/* Legal / Info */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Support</h4>
            <ul className="space-y-2 text-xs text-white/60">
              <li><Link to="/admin" className="hover:text-cyan-400 transition-colors">Admin Area</Link></li>
              <li><span className="cursor-not-allowed text-white/40">Terms of Service</span></li>
              <li><span className="cursor-not-allowed text-white/40">Refund Policy</span></li>
              <li><span className="cursor-not-allowed text-white/40">FAQs</span></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Payment Methods</h4>
            <p className="text-xs text-white/50 mb-4 leading-relaxed">
              We support fast and secure manual payment methods in Iraq.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] font-semibold bg-white/5 px-2 py-1 rounded border border-white/10 text-cyan-300">FastPay</span>
              <span className="text-[10px] font-semibold bg-white/5 px-2 py-1 rounded border border-white/10 text-cyan-300">Korek</span>
              <span className="text-[10px] font-semibold bg-white/5 px-2 py-1 rounded border border-white/10 text-cyan-300">MasterCard</span>
            </div>
          </div>

        </div>

        <div className="border-t border-white/5 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/40">
            &copy; {new Date().getFullYear()} Dano Store. All rights reserved.
          </p>
          <div className="flex space-x-4 text-[11px] text-white/40">
            <span>Powered by Lawa - Built for Kurdistan & Iraq Gamers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
