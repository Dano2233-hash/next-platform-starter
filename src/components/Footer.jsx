import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, MessageSquare } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#03060d] border-t border-slate-800/80 text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Features banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-slate-800/80">
          <div className="flex items-center gap-4 bg-[#080d1a] p-4 rounded-xl border border-slate-800/60">
            <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-lg">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-200">Instant Digital Delivery</h4>
              <p className="text-xs text-slate-400">Codes &amp; top-ups sent directly via WhatsApp or Email</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#080d1a] p-4 rounded-xl border border-slate-800/60">
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-200">100% Legal &amp; Safe</h4>
              <p className="text-xs text-slate-400">Official gift cards and authorized publisher top-ups</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#080d1a] p-4 rounded-xl border border-slate-800/60 sm:col-span-2 md:col-span-1">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-200">24/7 Local Support</h4>
              <p className="text-xs text-slate-400">Dedicated support in Kurdish, Arabic &amp; English</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                  <Gamepad2 className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-100">Dano Store</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              The premier digital gaming store in Kurdistan and Iraq for paid PC/Console games, mobile top-ups, gift cards, and premium subscriptions.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-xs font-semibold text-emerald-400">Services Online &amp; Active</span>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Categories</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/products?category=mobile" className="hover:text-cyan-400 transition">Mobile Top-Ups</Link></li>
              <li><Link to="/products?category=pc" className="hover:text-cyan-400 transition">PC Gaming</Link></li>
              <li><Link to="/products?category=playstation" className="hover:text-cyan-400 transition">PlayStation Store</Link></li>
              <li><Link to="/products?category=xbox" className="hover:text-cyan-400 transition">Xbox Store</Link></li>
              <li><Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition">Gift Cards</Link></li>
              <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition">Subscriptions</Link></li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-cyan-400 transition">Home</Link></li>
              <li><Link to="/products" className="hover:text-cyan-400 transition">All Products</Link></li>
              <li><Link to="/cart" className="hover:text-cyan-400 transition">View Shopping Cart</Link></li>
              <li><Link to="/admin" className="hover:text-cyan-400 transition">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Col 4: Payment Methods & Community */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Accepted Payment Methods</h4>
            <p className="text-xs text-slate-400 mb-3">We accept manual payments in IQD via:</p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-[#090f1d] border border-cyan-500/30 text-cyan-400 text-xs font-bold rounded-lg">FastPay</span>
              <span className="px-3 py-1 bg-[#090f1d] border border-blue-500/30 text-blue-400 text-xs font-bold rounded-lg">Korek</span>
              <span className="px-3 py-1 bg-[#090f1d] border border-purple-500/30 text-purple-400 text-xs font-bold rounded-lg">MasterCard</span>
            </div>

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Customer Support</h4>
            <div className="flex items-center gap-3">
              <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="p-2 bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 rounded-lg hover:bg-emerald-900/60 transition text-xs font-semibold flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
              </a>
              <a href="https://discord.com" target="_blank" rel="noreferrer" className="p-2 bg-indigo-950/60 border border-indigo-500/40 text-indigo-400 rounded-lg hover:bg-indigo-900/60 transition text-xs font-semibold flex items-center gap-1.5">
                Discord
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Kurdistan &amp; Iraq Digital Gaming.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>100% Guaranteed</span>
            <span>•</span>
            <span>Manual Verification</span>
            <span>•</span>
            <span>IQD Only</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
