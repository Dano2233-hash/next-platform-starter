import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, MessageSquare, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#03050b] border-t border-slate-800/80 text-slate-400 text-xs">
      {/* Top Value Banner */}
      <div className="border-b border-slate-800/60 py-8 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-800/40 text-blue-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-slate-100 text-sm">Instant Delivery</h5>
              <p className="text-[11px] text-slate-400">Automated & immediate key release</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-800/40 text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-slate-100 text-sm">100% Guaranteed</h5>
              <p className="text-[11px] text-slate-400">Official & verified digital products</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-800/40 text-purple-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-slate-100 text-sm">Local Payment</h5>
              <p className="text-[11px] text-slate-400">FastPay, Korek, & MasterCard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-800/40 text-indigo-400">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-slate-100 text-sm">24/7 Fast Support</h5>
              <p className="text-[11px] text-slate-400">Direct WhatsApp & Discord help</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">

        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="text-xl font-black text-white">
              DANO <span className="text-cyan-400">STORE</span>
            </span>
          </Link>

          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            Kurdistan & Iraq’s premier digital gaming destination. We provide instant top-ups for PUBG UC, Free Fire, Valorant VP, Steam Wallet cards, subscriptions, and official PC & console games.
          </p>

          <div className="pt-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-2">
              Supported Payment Methods
            </span>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-blue-400 font-bold text-[11px]">
                FastPay
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-amber-400 font-bold text-[11px]">
                Korek
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-purple-400 font-bold text-[11px]">
                MasterCard
              </span>
            </div>
          </div>
        </div>

        {/* Quick Categories */}
        <div>
          <h4 className="font-bold text-slate-100 text-sm mb-4 uppercase tracking-wider">Categories</h4>
          <ul className="space-y-2.5">
            <li>
              <Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">
                Mobile Top-Ups
              </Link>
            </li>
            <li>
              <Link to="/products?category=paid-games" className="hover:text-cyan-400 transition-colors">
                Paid Steam & PC Games
              </Link>
            </li>
            <li>
              <Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">
                Gift Cards
              </Link>
            </li>
            <li>
              <Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">
                Subscriptions & Pro Apps
              </Link>
            </li>
          </ul>
        </div>

        {/* Platforms */}
        <div>
          <h4 className="font-bold text-slate-100 text-sm mb-4 uppercase tracking-wider">Platforms</h4>
          <ul className="space-y-2.5">
            <li>
              <Link to="/products?platform=PC" className="hover:text-cyan-400 transition-colors">
                PC Gaming
              </Link>
            </li>
            <li>
              <Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">
                PlayStation Store
              </Link>
            </li>
            <li>
              <Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">
                Xbox Store
              </Link>
            </li>
            <li>
              <Link to="/products?platform=Mobile" className="hover:text-cyan-400 transition-colors">
                Mobile Games
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links & Admin */}
        <div>
          <h4 className="font-bold text-slate-100 text-sm mb-4 uppercase tracking-wider">Store Info</h4>
          <ul className="space-y-2.5">
            <li>
              <Link to="/products" className="hover:text-cyan-400 transition-colors">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-cyan-400 transition-colors">
                My Shopping Cart
              </Link>
            </li>
            <li>
              <Link to="/admin-login" className="hover:text-cyan-400 transition-colors">
                Admin Panel Login
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 py-6 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-slate-400">
            &copy; {new Date().getFullYear()} <strong className="text-slate-300">Dano Store</strong>. All rights reserved. Designed for Kurdistan & Iraq gamers.
          </p>
          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span>FastPay, Korek & MasterCard Manual Payments Only</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
