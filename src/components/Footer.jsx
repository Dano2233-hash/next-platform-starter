import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, CreditCard, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#03060d] border-t border-slate-800/80 text-slate-400 text-xs mt-auto">
      {/* Top Features Banner */}
      <div className="border-b border-slate-800/60 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 bg-slate-900/40 p-3 rounded-xl border border-slate-800/50">
            <Zap className="w-6 h-6 text-cyan-400 shrink-0" />
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Instant Delivery</h4>
              <p className="text-[11px] text-slate-400">Automated digital code delivery</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-slate-900/40 p-3 rounded-xl border border-slate-800/50">
            <ShieldCheck className="w-6 h-6 text-blue-400 shrink-0" />
            <div>
              <h4 className="font-bold text-slate-200 text-sm">100% Legal & Genuine</h4>
              <p className="text-[11px] text-slate-400">Official publisher keys & top-ups</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-slate-900/40 p-3 rounded-xl border border-slate-800/50">
            <CreditCard className="w-6 h-6 text-purple-400 shrink-0" />
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Local Payment</h4>
              <p className="text-[11px] text-slate-400">FastPay, Korek & MasterCard</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-slate-900/40 p-3 rounded-xl border border-slate-800/50">
            <Headphones className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <h4 className="font-bold text-slate-200 text-sm">24/7 Gamer Support</h4>
              <p className="text-[11px] text-slate-400">WhatsApp & Discord active support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <span className="text-base font-black text-white tracking-wider">
              DANO <span className="text-cyan-400">STORE</span>
            </span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            The premier digital gaming store serving Kurdistan and Iraq. Get PUBG UC, Free Fire Diamonds, Steam Wallet, PlayStation cards, and digital games with local manual payments.
          </p>
          <div className="pt-2 text-[11px] text-slate-400">
            Currency: <strong className="text-cyan-400">IQD Only</strong>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-bold text-slate-200 mb-3 text-sm">Categories</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">
                Mobile Top-Ups (PUBG UC, Diamonds)
              </Link>
            </li>
            <li>
              <Link to="/products?category=pc" className="hover:text-cyan-400 transition-colors">
                PC Paid Games & Steam Keys
              </Link>
            </li>
            <li>
              <Link to="/products?category=playstation" className="hover:text-cyan-400 transition-colors">
                PlayStation Store & PSN Cards
              </Link>
            </li>
            <li>
              <Link to="/products?category=xbox" className="hover:text-cyan-400 transition-colors">
                Xbox & Microsoft Cards
              </Link>
            </li>
            <li>
              <Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">
                Steam, iTunes & Google Play Cards
              </Link>
            </li>
            <li>
              <Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">
                Discord Nitro, Netflix & Subscriptions
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-slate-200 mb-3 text-sm">Store Navigation</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-cyan-400 transition-colors">
                Home Page
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-cyan-400 transition-colors">
                All Products Catalog
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-cyan-400 transition-colors">
                Shopping Cart
              </Link>
            </li>
            <li>
              <Link to="/admin-login" className="hover:text-cyan-400 transition-colors">
                Admin Login Portal
              </Link>
            </li>
          </ul>
        </div>

        {/* Accepted Payment Methods */}
        <div>
          <h4 className="font-bold text-slate-200 mb-3 text-sm">Accepted Payment Methods</h4>
          <p className="text-slate-400 text-xs mb-3">
            Manual local transfer options. Fast, secure, and direct.
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2 rounded-lg text-slate-200 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span> FastPay Mobile Wallet
            </div>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2 rounded-lg text-slate-200 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span> Korek Direct Transfer
            </div>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2 rounded-lg text-slate-200 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span> MasterCard Digital Payment
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal */}
      <div className="border-t border-slate-800/60 py-4 px-4 bg-[#020409]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} <strong className="text-slate-300">Dano Store</strong>. All rights reserved. Servicing Kurdistan & Iraq gamers.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <Lock className="w-3 h-3 text-emerald-400" /> Secure Manual Checkout System
          </div>
        </div>
      </div>
    </footer>
  );
}
