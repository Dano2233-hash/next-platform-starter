import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, MessageSquare, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#03050a] border-t border-gray-800/80 text-gray-400 mt-16">
      {/* Value props bar */}
      <div className="border-b border-gray-800/60 bg-[#050814]">
        <div className="max-w-7xl mx-mx-auto px-4 sm:px-6 lg:px-8 py-8 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#090e1f] border border-gray-800/60">
              <div className="p-3 bg-blue-600/10 text-blue-400 rounded-lg border border-blue-500/20">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Instant Digital Delivery</h4>
                <p className="text-xs text-gray-400">Fast code & top-up delivery across Kurdistan & Iraq</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#090e1f] border border-gray-800/60">
              <div className="p-3 bg-cyan-600/10 text-cyan-400 rounded-lg border border-cyan-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">100% Legal & Guaranteed</h4>
                <p className="text-xs text-gray-400">Official digital gift cards and authorized top-ups</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#090e1f] border border-gray-800/60">
              <div className="p-3 bg-purple-600/10 text-purple-400 rounded-lg border border-purple-500/20">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">24/7 Local Support</h4>
                <p className="text-xs text-gray-400">Reach us on WhatsApp, Discord & TikTok anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-gray-950 font-black shadow-lg shadow-cyan-500/20">
                <Gamepad2 className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-wider">
                DANO <span className="text-cyan-400">STORE</span>
              </span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed">
              The premier digital gaming store for Kurdistan and Iraq gamers. Top-ups, gift cards, subscriptions, and games delivered reliably.
            </p>
            {/* Accepted payment badges */}
            <div className="pt-2">
              <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Accepted Local Payments:
              </p>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold rounded">
                  FastPay
                </span>
                <span className="px-2.5 py-1 bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold rounded">
                  Korek
                </span>
                <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold rounded">
                  MasterCard
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors">Home Store</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-cyan-400 transition-colors">All Products Catalog</Link>
              </li>
              <li>
                <Link to="/products?category=Gift Cards" className="hover:text-cyan-400 transition-colors">Gift Cards & Wallets</Link>
              </li>
              <li>
                <Link to="/products?category=Subscriptions" className="hover:text-cyan-400 transition-colors">Digital Subscriptions</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-cyan-400 transition-colors">Shopping Cart</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Platforms & Games</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/products?platform=Mobile" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups (UC & Diamonds)</Link>
              </li>
              <li>
                <Link to="/products?platform=PC" className="hover:text-cyan-400 transition-colors">PC Steam Games & Codes</Link>
              </li>
              <li>
                <Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">PlayStation Games & PSN Cards</Link>
              </li>
              <li>
                <Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">Xbox Store & Game Pass</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-cyan-400 transition-colors">Admin Portal</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Social */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Customer Support</h4>
            <p className="text-xs text-gray-400 mb-3">
              Need help with your order or payment? Contact our support team:
            </p>
            <div className="space-y-2 text-xs">
              <a
                href="https://wa.me/9647500000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-[#0d1527] hover:bg-[#121c35] text-emerald-400 transition-colors border border-emerald-900/40"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="font-semibold">WhatsApp Live Chat</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
              </a>
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-[#0d1527] hover:bg-[#121c35] text-indigo-400 transition-colors border border-indigo-900/40"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="font-semibold">Discord Community</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-[#0d1527] hover:bg-[#121c35] text-pink-400 transition-colors border border-pink-900/40"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="font-semibold">TikTok Updates</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2025 Dano Store. All rights reserved. Designed for Kurdistan & Iraq gamers.</p>
          <div className="flex items-center gap-4">
            <Link to="/products" className="hover:text-gray-400">Catalog</Link>
            <span>•</span>
            <Link to="/admin-login" className="hover:text-gray-400">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
