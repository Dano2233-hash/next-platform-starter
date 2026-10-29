import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, MessageCircle, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#03050a] border-t border-slate-800/80 text-slate-400 mt-20">
      {/* Top Features Strip */}
      <div className="border-b border-slate-800/60 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/50">
              <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-100">Instant Digital Delivery</h4>
                <p className="text-xs text-slate-400">Receive codes and top-ups in minutes.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/50">
              <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-100">100% Guaranteed</h4>
                <p className="text-xs text-slate-400">Official codes & secure processing.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/50">
              <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-100">24/7 Gamer Support</h4>
                <p className="text-xs text-slate-400">Direct WhatsApp & Discord assistance.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/50">
              <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-100">Local Payment Options</h4>
                <p className="text-xs text-slate-400">FastPay, Korek, & MasterCard (IQD).</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Dano Store
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The leading digital store for games, game top-ups, gift cards, subscriptions, and gaming services in Kurdistan & Iraq. Instant delivery with localized payments.
            </p>
            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Supported Local Payments
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-900 border border-slate-800 text-slate-300">FastPay</span>
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-900 border border-slate-800 text-slate-300">Korek</span>
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-900 border border-slate-800 text-slate-300">MasterCard</span>
              </div>
            </div>
          </div>

          {/* Categories Link */}
          <div>
            <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4">Categories</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/products?category=Mobile Top-Ups" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups</Link></li>
              <li><Link to="/products?category=Paid Games" className="hover:text-cyan-400 transition-colors">Paid Games</Link></li>
              <li><Link to="/products?category=Gift Cards" className="hover:text-cyan-400 transition-colors">Gift Cards</Link></li>
              <li><Link to="/products?category=Subscriptions" className="hover:text-cyan-400 transition-colors">Subscriptions</Link></li>
              <li><Link to="/products" className="hover:text-cyan-400 transition-colors">All Products</Link></li>
            </ul>
          </div>

          {/* Quick Platforms */}
          <div>
            <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4">Platforms</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/products?platform=PC" className="hover:text-cyan-400 transition-colors">PC Gaming</Link></li>
              <li><Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">PlayStation</Link></li>
              <li><Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">Xbox Series / One</Link></li>
              <li><Link to="/products?platform=Mobile" className="hover:text-cyan-400 transition-colors">Mobile Gaming</Link></li>
              <li><Link to="/products?platform=Gift Card" className="hover:text-cyan-400 transition-colors">Gift Cards</Link></li>
            </ul>
          </div>

          {/* Quick Actions / Contact */}
          <div>
            <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4">Store Access</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/cart" className="hover:text-cyan-400 transition-colors">View Cart</Link></li>
              <li><Link to="/checkout" className="hover:text-cyan-400 transition-colors">Checkout</Link></li>
              <li><Link to="/admin-login" className="hover:text-cyan-400 transition-colors flex items-center gap-1 text-slate-400">Admin Portal <ArrowRight className="w-3 h-3" /></Link></li>
            </ul>
            <div className="mt-6 p-3 rounded-xl bg-blue-950/30 border border-blue-500/20 text-xs">
              <span className="font-bold text-blue-300 block mb-1">Need Direct Support?</span>
              <p className="text-slate-400 mb-2">Message us directly on WhatsApp or Discord after checkout.</p>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-800/80 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Gaming & Digital Services Kurdistan / Iraq.</p>
          <div className="flex gap-4">
            <span className="text-slate-400">All prices in IQD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
