import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, MessageSquare, PhoneCall } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#03050a] border-t border-gray-800/80 text-gray-400 pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Features banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pb-10 border-b border-gray-800/80">
          <div className="flex items-center space-x-3 p-4 rounded-2xl bg-[#080d1a] border border-gray-800/60">
            <div className="p-3 rounded-xl bg-blue-600/10 text-cyan-400 border border-cyan-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Instant Delivery</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">Automated codes & top-ups</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 rounded-2xl bg-[#080d1a] border border-gray-800/60">
            <div className="p-3 rounded-xl bg-purple-600/10 text-purple-400 border border-purple-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">100% Legal & Safe</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">Official digital licenses</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 rounded-2xl bg-[#080d1a] border border-gray-800/60">
            <div className="p-3 rounded-xl bg-cyan-600/10 text-cyan-300 border border-cyan-500/20">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">24/7 Gaming Support</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">Fast response on WhatsApp</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 rounded-2xl bg-[#080d1a] border border-gray-800/60">
            <div className="p-3 rounded-xl bg-emerald-600/10 text-emerald-400 border border-emerald-500/20">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Local Payments</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">FastPay, Korek & MasterCard</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10 border-b border-gray-800/80">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-[1px]">
                <div className="w-full h-full bg-[#03050a] rounded-[11px] flex items-center justify-center">
                  <Gamepad2 className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-lg font-black tracking-wider text-white">
                DANO<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">STORE</span>
              </span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed">
              Kurdistan and Iraq’s trusted destination for digital games, mobile top-ups, game gift cards, and subscriptions.
            </p>
            {/* Social Buttons */}
            <div className="flex items-center space-x-2 pt-2">
              <a
                href="https://wa.me/9647500000000"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-bold hover:bg-emerald-900/40 transition-all flex items-center space-x-1"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-indigo-400 text-xs font-bold hover:bg-indigo-900/40 transition-all"
              >
                Discord
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-pink-950/40 border border-pink-500/30 text-pink-400 text-xs font-bold hover:bg-pink-900/40 transition-all"
              >
                TikTok
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Categories</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups (PUBG & Free Fire)</Link></li>
              <li><Link to="/products?category=pc" className="hover:text-cyan-400 transition-colors">PC Steam Games</Link></li>
              <li><Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">Gift Cards (Steam, PSN, Xbox)</Link></li>
              <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Subscriptions (Discord & YouTube)</Link></li>
              <li><Link to="/products?category=playstation" className="hover:text-cyan-400 transition-colors">PlayStation Digital</Link></li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Store Navigation</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home Page</Link></li>
              <li><Link to="/products" className="hover:text-cyan-400 transition-colors">All Products</Link></li>
              <li><Link to="/cart" className="hover:text-cyan-400 transition-colors">Shopping Cart</Link></li>
              <li><Link to="/checkout" className="hover:text-cyan-400 transition-colors">Checkout</Link></li>
              <li><Link to="/admin-login" className="hover:text-cyan-400 transition-colors">Admin Access</Link></li>
            </ul>
          </div>

          {/* Local Payments Supported */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Supported Payments</h4>
            <p className="text-xs text-gray-400 mb-3">
              We exclusively support trusted local payment gateways across Kurdistan & Iraq:
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-300 font-bold text-xs">
                FastPay
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-blue-950/60 border border-blue-500/40 text-blue-300 font-bold text-xs">
                Korek Cash
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-300 font-bold text-xs">
                MasterCard
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 pt-6 gap-2">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved.</p>
          <p className="text-cyan-500/80 font-medium">Designed for Kurdistan & Iraq Gamers</p>
        </div>
      </div>
    </footer>
  );
}
