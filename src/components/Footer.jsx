import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Headphones, CreditCard, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#03040a] border-t border-slate-800/80 text-slate-400 mt-20">
      {/* Features highlight bar */}
      <div className="border-b border-slate-800/60 bg-slate-950/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/30 border border-slate-800/40">
            <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-slate-200">Instant Delivery</h5>
              <p className="text-xs text-slate-400">Digital keys delivered in seconds</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/30 border border-slate-800/40">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-slate-200">100% Guaranteed</h5>
              <p className="text-xs text-slate-400">Official products & digital codes</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/30 border border-slate-800/40">
            <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-slate-200">Local Payments</h5>
              <p className="text-xs text-slate-400">FastPay, Korek & MasterCard</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/30 border border-slate-800/40">
            <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-slate-200">24/7 Support</h5>
              <p className="text-xs text-slate-400">Direct WhatsApp & Discord help</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand column */}
        <div className="space-y-4 md:col-span-1">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 p-0.5 shadow-md">
              <div className="w-full h-full bg-[#05070f] rounded-[10px] flex items-center justify-center">
                <span className="font-black text-cyan-400 text-lg">D</span>
              </div>
            </div>
            <span className="text-xl font-extrabold text-white">
              Dano <span className="text-cyan-400">Store</span>
            </span>
          </Link>
          <p className="text-xs leading-relaxed text-slate-400">
            The leading digital gaming store in Kurdistan and Iraq. Buy original game keys, top-ups, gift cards, and premium subscriptions with instant local payment processing.
          </p>
        </div>

        {/* Categories column */}
        <div>
          <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">Categories</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups</Link></li>
            <li><Link to="/products?category=pc" className="hover:text-cyan-400 transition-colors">PC Steam Games</Link></li>
            <li><Link to="/products?category=xbox" className="hover:text-cyan-400 transition-colors">Xbox Store</Link></li>
            <li><Link to="/products?category=playstation" className="hover:text-cyan-400 transition-colors">PlayStation Network</Link></li>
            <li><Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">Gift Cards</Link></li>
            <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Subscriptions</Link></li>
          </ul>
        </div>

        {/* Customer Service column */}
        <div>
          <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">Customer Care</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/cart" className="hover:text-cyan-400 transition-colors">My Cart</Link></li>
            <li><Link to="/checkout" className="hover:text-cyan-400 transition-colors">Manual Payment</Link></li>
            <li><a href="https://wa.me/9647500000000" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">WhatsApp Support</a></li>
            <li><a href="https://discord.gg" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">Discord Community</a></li>
            <li><Link to="/admin-login" className="hover:text-cyan-400 transition-colors">Admin Portal</Link></li>
          </ul>
        </div>

        {/* Payment Methods column */}
        <div>
          <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">Supported Payments</h4>
          <p className="text-xs text-slate-400 mb-3">Instant local checkout methods in Kurdistan & Iraq:</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-blue-950/60 border border-blue-800/60 text-blue-300 font-bold text-xs">
              FastPay
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 font-bold text-xs">
              Korek Cash
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-purple-950/60 border border-purple-800/60 text-purple-300 font-bold text-xs">
              MasterCard
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-900 py-6 text-center text-xs text-slate-400">
        <p className="flex items-center justify-center gap-1">
          © {new Date().getFullYear()} Dano Store. Built with <Heart className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" /> for Gamers in Kurdistan & Iraq.
        </p>
      </div>
    </footer>
  );
}
