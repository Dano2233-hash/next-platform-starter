import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, MessageSquare, Phone, Send, CreditCard, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-12 pb-8 mt-20 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800/80">

          {/* Brand & Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Gamepad2 className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Dano<span className="text-cyan-400">Store</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Kurdistan & Iraq's leading digital gaming store for video games, mobile top-ups, gift cards, and premium online subscriptions with instant manual payment processing.
            </p>
            <div className="flex items-center space-x-4 pt-1">
              <a
                href="https://wa.me/9647500000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold hover:bg-emerald-500/20 transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp Support</span>
              </a>
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-semibold hover:bg-indigo-500/20 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Discord</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-cyan-400 transition-colors">All Products</Link></li>
              <li><Link to="/products?category=mobile-topups" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups</Link></li>
              <li><Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">Gift Cards</Link></li>
              <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Subscriptions</Link></li>
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wider">Platforms</h4>
            <ul className="space-y-2">
              <li><Link to="/products?category=pc" className="hover:text-cyan-400 transition-colors">PC Gaming</Link></li>
              <li><Link to="/products?category=xbox" className="hover:text-cyan-400 transition-colors">Xbox Console</Link></li>
              <li><Link to="/products?category=playstation" className="hover:text-cyan-400 transition-colors">PlayStation Network</Link></li>
              <li><Link to="/products?category=mobile-topups" className="hover:text-cyan-400 transition-colors">Mobile Gaming</Link></li>
              <li><Link to="/admin-login" className="hover:text-cyan-400 transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Supported Payments */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wider">Accepted Payments</h4>
            <p className="text-slate-400 text-xs mb-3">Manual local transfer accepted in Iraq & Kurdistan:</p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-semibold">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>FastPay Wallet</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-semibold">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Korek Cash</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-semibold">
                <CreditCard className="w-4 h-4 text-purple-400" />
                <span>MasterCard / FIB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Built for Gamers in Kurdistan & Iraq.</p>
          <div className="flex items-center space-x-2 text-[11px] text-slate-400">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Secure Digital Code Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
