import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, CreditCard, Gamepad2, PhoneCall } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#03050a] border-t border-slate-800/80 text-slate-400 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Gamepad2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-orbitron font-extrabold text-lg text-white">
                DANO <span className="text-cyan-400">STORE</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Kurdistan & Iraq's premier digital gaming marketplace. Instant delivery for games, gift cards, subscriptions, and mobile top-ups.
            </p>
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>24/7 Digital Fulfillment Active</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-orbitron font-bold text-sm text-white mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups (PUBG / Free Fire)</Link></li>
              <li><Link to="/products?platform=PC" className="hover:text-cyan-400 transition-colors">PC Steam Games</Link></li>
              <li><Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">Xbox Store Cards & Games</Link></li>
              <li><Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">PlayStation Network Cards</Link></li>
              <li><Link to="/products?category=giftcards" className="hover:text-cyan-400 transition-colors">Steam Wallet & Apple Cards</Link></li>
              <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Discord Nitro & YouTube Premium</Link></li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 className="font-orbitron font-bold text-sm text-white mb-4 uppercase tracking-wider">Supported Payments</h4>
            <p className="text-xs text-slate-400 mb-3">Manual, fast processing for local customers:</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 p-2 rounded bg-[#090e1f] border border-slate-800">
                <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                <span className="text-xs font-semibold text-slate-200">FastPay Iraq</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded bg-[#090e1f] border border-slate-800">
                <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                <span className="text-xs font-semibold text-slate-200">Korek Telecom Cash</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded bg-[#090e1f] border border-slate-800">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span className="text-xs font-semibold text-slate-200">MasterCard / FIB</span>
              </div>
            </div>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-orbitron font-bold text-sm text-white mb-4 uppercase tracking-wider">Contact Us</h4>
            <p className="text-xs text-slate-400 mb-3">Need assistance with your order? Reach out directly:</p>
            <div className="space-y-2 text-xs">
              <a
                href="https://wa.me/9640000000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded bg-[#0a1428] hover:bg-[#0f1d3a] border border-cyan-500/30 text-cyan-300 font-medium transition-all"
              >
                <PhoneCall className="w-4 h-4 text-cyan-400" />
                <span>WhatsApp Live Chat</span>
              </a>
              <div className="p-2 rounded bg-[#0a1020] border border-slate-800 text-slate-300">
                <span className="block text-[10px] text-slate-500 uppercase">Location</span>
                <span className="text-xs font-semibold text-slate-200">Erbil / Sulaymaniyah, Kurdistan Region</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/products" className="hover:text-slate-300">Catalog</Link>
            <Link to="/cart" className="hover:text-slate-300">Shopping Cart</Link>
            <Link to="/admin-login" className="hover:text-slate-300">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
