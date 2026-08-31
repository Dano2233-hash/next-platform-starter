import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, MessageCircle, Send, Video } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#03050a] border-t border-slate-800/80 text-slate-400 text-xs">
      {/* Features Bar */}
      <div className="border-b border-slate-800/60 py-8 bg-[#050812]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-cyan-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200">Instant Digital Delivery</h4>
              <p className="text-[11px] text-slate-400">Receive codes & top-ups fast</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200">100% Legal & Verified</h4>
              <p className="text-[11px] text-slate-400">Official digital products</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200">Customer Support</h4>
              <p className="text-[11px] text-slate-400">Kurdistan & Iraq support</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200">Local Manual Payment</h4>
              <p className="text-[11px] text-slate-400">FastPay, Korek & MasterCard</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 flex items-center justify-center text-white">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <span className="text-lg font-extrabold text-white">
              Dano<span className="text-cyan-400">Store</span>
            </span>
          </Link>
          <p className="leading-relaxed">
            The leading digital gaming store in Kurdistan and Iraq for video games, game top-ups, gift cards, subscriptions, and legal digital codes.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a href="https://wa.me/" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-all">
              <MessageCircle className="w-4 h-4" />
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-indigo-600 text-slate-300 hover:text-white flex items-center justify-center transition-all">
              <Send className="w-4 h-4" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-all">
              <Video className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2: Categories */}
        <div>
          <h3 className="font-bold text-slate-100 uppercase tracking-wider mb-3">Categories</h3>
          <ul className="space-y-2">
            <li><Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups</Link></li>
            <li><Link to="/products?category=games" className="hover:text-cyan-400 transition-colors">Paid PC & Console Games</Link></li>
            <li><Link to="/products?category=giftcards" className="hover:text-cyan-400 transition-colors">Digital Gift Cards</Link></li>
            <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Subscriptions & Pass</Link></li>
          </ul>
        </div>

        {/* Col 3: Quick Links */}
        <div>
          <h3 className="font-bold text-slate-100 uppercase tracking-wider mb-3">Store Links</h3>
          <ul className="space-y-2">
            <li><Link to="/products" className="hover:text-cyan-400 transition-colors">All Products</Link></li>
            <li><Link to="/cart" className="hover:text-cyan-400 transition-colors">Shopping Cart</Link></li>
            <li><Link to="/checkout" className="hover:text-cyan-400 transition-colors">Checkout</Link></li>
            <li><Link to="/admin-login" className="hover:text-cyan-400 transition-colors">Admin Portal</Link></li>
          </ul>
        </div>

        {/* Col 4: Payment Methods */}
        <div>
          <h3 className="font-bold text-slate-100 uppercase tracking-wider mb-3">Supported Payment Methods</h3>
          <p className="mb-3 text-[11px] text-slate-400">
            We accept manual local payments only:
          </p>
          <div className="space-y-2">
            <div className="px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <span className="font-bold text-rose-400">FastPay</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Mobile Wallet</span>
            </div>
            <div className="px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <span className="font-bold text-cyan-400">Korek</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Balance Transfer</span>
            </div>
            <div className="px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <span className="font-bold text-purple-400">MasterCard</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Fib / First Iraqi</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-900 py-4 text-center text-slate-400 text-[11px]">
        © {new Date().getFullYear()} Dano Store. All rights reserved. Designed for gaming customers in Kurdistan & Iraq.
      </div>
    </footer>
  );
}
