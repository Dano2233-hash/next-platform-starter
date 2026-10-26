import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#03050a] border-t border-slate-800/80 text-slate-400 mt-20">
      {/* Features Bar */}
      <div className="border-b border-slate-800/60 bg-[#060914] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center space-x-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-cyan-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Instant Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">Codes and top-ups delivered instantly after payment confirmation.</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-xl bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Safe & Legal</h4>
              <p className="text-xs text-slate-400 mt-0.5">Official products and trusted digital codes directly for Kurdistan & Iraq.</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Local Support 24/7</h4>
              <p className="text-xs text-slate-400 mt-0.5">Reach out via WhatsApp, TikTok or Discord for fast assistance.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Column 1: Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 p-0.5">
              <div className="w-full h-full bg-[#05070f] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="text-lg font-black tracking-tight text-white">
              DANO<span className="text-cyan-400">STORE</span>
            </span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            Dano Store is your #1 destination for digital game keys, top-ups, gift cards, and subscriptions in Kurdistan and Iraq. Fast, reliable, and secure.
          </p>
          <div className="pt-2">
            <span className="text-xs font-semibold text-slate-300 block mb-2">Supported Payment Methods:</span>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 text-[11px] font-bold rounded bg-slate-900 border border-slate-800 text-cyan-400">FastPay</span>
              <span className="px-2.5 py-1 text-[11px] font-bold rounded bg-slate-900 border border-slate-800 text-blue-400">Korek</span>
              <span className="px-2.5 py-1 text-[11px] font-bold rounded bg-slate-900 border border-slate-800 text-purple-400">MasterCard</span>
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-cyan-500 pl-2">
            Categories
          </h3>
          <ul className="space-y-2.5 text-xs">
            <li><Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups</Link></li>
            <li><Link to="/products?category=games" className="hover:text-cyan-400 transition-colors">Paid PC & Console Games</Link></li>
            <li><Link to="/products?category=giftcards" className="hover:text-cyan-400 transition-colors">Digital Gift Cards</Link></li>
            <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Premium Subscriptions</Link></li>
            <li><Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">Xbox Store</Link></li>
            <li><Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">PlayStation Store</Link></li>
          </ul>
        </div>

        {/* Column 3: Customer Care */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
            Customer Care
          </h3>
          <ul className="space-y-2.5 text-xs">
            <li><Link to="/cart" className="hover:text-cyan-400 transition-colors">View Cart</Link></li>
            <li><Link to="/products" className="hover:text-cyan-400 transition-colors">All Products Catalog</Link></li>
            <li><Link to="/admin-login" className="hover:text-cyan-400 transition-colors">Admin Portal</Link></li>
            <li><span className="text-slate-400">Currency: IQD (Iraqi Dinar)</span></li>
            <li><span className="text-slate-400">Region: Kurdistan & Iraq</span></li>
          </ul>
        </div>

        {/* Column 4: Contact & Socials */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-purple-500 pl-2">
            Connect With Us
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Need help with your purchase or payment confirmation? Reach out directly on our social channels.
          </p>
          <div className="flex flex-col space-y-2 text-xs">
            <a
              href="https://wa.me/9647500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
            >
              <span className="font-semibold">WhatsApp Support</span>
            </a>
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20 transition-colors"
            >
              <span className="font-semibold">Discord Community</span>
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 p-2 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400 hover:bg-pink-500/20 transition-colors"
            >
              <span className="font-semibold">TikTok Channel</span>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/80 bg-[#020306] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Built for gamers in Kurdistan & Iraq</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline ml-1" />
          </p>
        </div>
      </div>
    </footer>
  );
}
