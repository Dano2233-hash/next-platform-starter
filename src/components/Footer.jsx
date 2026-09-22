import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, CreditCard, MessageCircle, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#03050a] border-t border-slate-800 text-slate-400 text-xs">
      {/* Top Value Highlights */}
      <div className="border-b border-slate-800/80 py-8 bg-[#050811]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Instant Delivery</h4>
              <p className="text-slate-400 mt-0.5">Codes delivered directly after order completion.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">100% Legal & Safe</h4>
              <p className="text-slate-400 mt-0.5">Official publisher licenses and safe payment methods.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Kurdistan & Iraq Payments</h4>
              <p className="text-slate-400 mt-0.5">FastPay, Korek, and MasterCard accepted.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand Column */}
        <div className="space-y-4 md:col-span-1">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <span className="text-lg font-extrabold text-white tracking-wide">
              Dano Store
            </span>
          </Link>
          <p className="text-slate-400 leading-relaxed">
            The premier digital store in Kurdistan and Iraq for video games, top-ups, gift cards, and premium subscriptions. Fast, reliable, and secure.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="font-bold text-slate-200 text-sm uppercase tracking-wider mb-4 border-l-2 border-cyan-400 pl-2">
            Categories
          </h5>
          <ul className="space-y-2.5">
            <li><Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups</Link></li>
            <li><Link to="/products?category=games" className="hover:text-cyan-400 transition-colors">Paid PC & Console Games</Link></li>
            <li><Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">Digital Gift Cards</Link></li>
            <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Subscriptions & Services</Link></li>
          </ul>
        </div>

        {/* Platforms */}
        <div>
          <h5 className="font-bold text-slate-200 text-sm uppercase tracking-wider mb-4 border-l-2 border-blue-400 pl-2">
            Platforms
          </h5>
          <ul className="space-y-2.5">
            <li><Link to="/products?platform=PC" className="hover:text-cyan-400 transition-colors">PC Gaming</Link></li>
            <li><Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">PlayStation Store</Link></li>
            <li><Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">Xbox Live & Game Pass</Link></li>
            <li><Link to="/products?platform=Mobile" className="hover:text-cyan-400 transition-colors">Android & iOS</Link></li>
          </ul>
        </div>

        {/* Payment Methods Info */}
        <div>
          <h5 className="font-bold text-slate-200 text-sm uppercase tracking-wider mb-4 border-l-2 border-purple-400 pl-2">
            Accepted Payments
          </h5>
          <p className="text-slate-400 mb-3">
            We support easy manual payments tailored for customers in Kurdistan and Iraq:
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-1 bg-slate-900 border border-slate-700 text-slate-200 font-bold rounded-md">FastPay</span>
            <span className="px-2.5 py-1 bg-slate-900 border border-slate-700 text-slate-200 font-bold rounded-md">Korek</span>
            <span className="px-2.5 py-1 bg-slate-900 border border-slate-700 text-slate-200 font-bold rounded-md">MasterCard</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/80 py-6 bg-[#020306]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} Dano Store. All rights reserved. Kurdistan / Iraq Digital Gaming.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-400 font-semibold">Contact Support:</span>
            <a
              href="https://wa.me/9647500000000"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              <Send className="w-4 h-4" /> Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
