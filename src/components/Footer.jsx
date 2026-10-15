import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, MessageCircle, Send, Music2, CreditCard } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#03050a] border-t border-slate-800/80 text-slate-400 text-sm mt-16 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-24 bg-cyan-500/10 blur-3xl pointer-events-none" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">

          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5">
                <div className="w-full h-full bg-[#05070f] rounded-[10px] flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Dano Store
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              The premier digital gaming store for Kurdistan & Iraq. Offering instant game top-ups, activation codes, gift cards, and premium subscriptions with guaranteed instant delivery.
            </p>

            {/* Guarantees */}
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-300 pt-2">
              <div className="flex items-center gap-1.5 text-cyan-400">
                <Zap className="w-4 h-4" />
                <span>Instant Code</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Safe</span>
              </div>
              <div className="flex items-center gap-1.5 text-purple-400">
                <Headphones className="w-4 h-4" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4 border-l-2 border-cyan-400 pl-2">
              Quick Categories
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><Link to="/products?category=Mobile Top-Ups" className="hover:text-cyan-400 transition-colors">PUBG UC & Top-Ups</Link></li>
              <li><Link to="/products?platform=PC" className="hover:text-cyan-400 transition-colors">PC Games & Steam</Link></li>
              <li><Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">PlayStation Store</Link></li>
              <li><Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">Xbox Game Pass</Link></li>
              <li><Link to="/products?category=Gift Cards" className="hover:text-cyan-400 transition-colors">Digital Gift Cards</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4 border-l-2 border-purple-400 pl-2">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><Link to="/products" className="hover:text-cyan-400 transition-colors">Browse Products</Link></li>
              <li><Link to="/cart" className="hover:text-cyan-400 transition-colors">Shopping Cart</Link></li>
              <li><Link to="/admin-login" className="hover:text-cyan-400 transition-colors">Admin Login</Link></li>
            </ul>
          </div>

          {/* Contact Socials */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4 border-l-2 border-cyan-400 pl-2">
              Connect With Us
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Need help with your order? Contact us on WhatsApp or Discord:
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="https://wa.me/9647500000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/60 transition-colors text-xs font-bold"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-400 text-slate-900" />
                <span>WhatsApp Support</span>
              </a>
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-900/60 transition-colors text-xs font-bold"
              >
                <Send className="w-4 h-4 text-indigo-400" />
                <span>Discord Community</span>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 transition-colors text-xs font-bold"
              >
                <Music2 className="w-4 h-4 text-pink-400" />
                <span>TikTok Channel</span>
              </a>
            </div>
          </div>
        </div>

        {/* Payment Methods Banner */}
        <div className="border-t border-b border-slate-800/80 py-6 my-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <CreditCard className="w-4 h-4 text-cyan-400" />
            <span>Supported Payment Methods in Iraq & Kurdistan:</span>
          </div>

          <div className="flex items-center gap-3">
            {/* FastPay */}
            <div className="px-3 py-1.5 rounded-lg bg-[#0d152c] border border-cyan-500/30 flex items-center gap-2 text-xs font-bold text-cyan-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>FastPay</span>
            </div>

            {/* Korek */}
            <div className="px-3 py-1.5 rounded-lg bg-[#1a0f2c] border border-purple-500/30 flex items-center gap-2 text-xs font-bold text-purple-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>Korek Cash</span>
            </div>

            {/* MasterCard */}
            <div className="px-3 py-1.5 rounded-lg bg-[#1e1526] border border-amber-500/30 flex items-center gap-2 text-xs font-bold text-amber-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>MasterCard</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved.</p>
          <p className="text-[11px]">Designed for Gamers in Kurdistan & Iraq</p>
        </div>
      </div>
    </footer>
  );
};
