import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-[#030307] border-t border-slate-900 pt-12 pb-6 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

          {/* Brand Info */}
          <div className="md:col-span-2">
            <span className="text-xl font-extrabold uppercase tracking-wider text-white">
              DANO STORE
            </span>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-sm">
              The premier digital gaming store serving Kurdistan and all of Iraq. We offer reliable manual top-ups, game keys, gift cards, and premium subscriptions with instant processing and manual payment options.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="https://wa.me/9640000000" target="_blank" rel="noreferrer" className="text-xs bg-slate-900 border border-slate-800 px-3 py-2 rounded text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-200">
                WhatsApp
              </a>
              <a href="https://discord.gg/danostore" target="_blank" rel="noreferrer" className="text-xs bg-slate-900 border border-slate-800 px-3 py-2 rounded text-slate-300 hover:text-purple-400 hover:border-purple-500/30 transition-all duration-200">
                Discord
              </a>
              <a href="https://tiktok.com/@danostore" target="_blank" rel="noreferrer" className="text-xs bg-slate-900 border border-slate-800 px-3 py-2 rounded text-slate-300 hover:text-pink-400 hover:border-pink-500/30 transition-all duration-200">
                TikTok
              </a>
            </div>
          </div>

          {/* Useful links */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest mb-4">Store Categories</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/products?category=pc" className="hover:text-cyan-400 transition-colors">PC Gaming</Link></li>
              <li><Link to="/products?category=xbox" className="hover:text-emerald-400 transition-colors">Xbox Store</Link></li>
              <li><Link to="/products?category=playstation" className="hover:text-blue-400 transition-colors">PlayStation Store</Link></li>
              <li><Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups</Link></li>
              <li><Link to="/products?category=giftcards" className="hover:text-purple-400 transition-colors">Digital Gift Cards</Link></li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home Page</Link></li>
              <li><Link to="/products" className="hover:text-cyan-400 transition-colors">All Products</Link></li>
              <li><Link to="/cart" className="hover:text-cyan-400 transition-colors">View Cart</Link></li>
              <li><Link to="/admin" className="hover:text-purple-400 transition-colors">Admin Dashboard</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom row */}
        <div className="border-t border-slate-900/80 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Built for Iraqi & Kurdish gamers.</p>
          <div className="flex space-x-4">
            <span>FastPay</span>
            <span>Korek Telecom</span>
            <span>MasterCard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
