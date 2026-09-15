import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Wallet, Phone, CreditCard, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#03060a] border-t border-slate-800/80 mt-20 text-slate-400 text-xs">
      {/* Top Value Props Bar */}
      <div className="border-b border-slate-800/60 py-6 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-cyan-400">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h5 className="font-bold text-slate-200">100% Legal Keys</h5>
              <p className="text-[11px] text-slate-400">Official codes & direct player top-up</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h5 className="font-bold text-slate-200">Express Delivery</h5>
              <p className="text-[11px] text-slate-400">Fast processing via WhatsApp / Discord</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Wallet className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h5 className="font-bold text-slate-200">Local Iraq Payments</h5>
              <p className="text-[11px] text-slate-400">FastPay, Korek Cash & MasterCard</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand Column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-base text-slate-100 tracking-wider uppercase">
              Dano <span className="text-cyan-400">Store</span>
            </span>
          </div>
          <p className="leading-relaxed text-slate-400">
            Kurdistan & Iraq's premier digital gaming store for activation keys, mobile game top-ups, gift cards, and subscriptions.
          </p>
          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-md bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Store Status: Online & Delivering
            </span>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="font-bold text-slate-200 text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Categories
          </h4>
          <ul className="space-y-2.5 font-medium">
            <li>
              <Link to="/products?category=games" className="hover:text-cyan-400 transition-colors">
                PC & Console Games
              </Link>
            </li>
            <li>
              <Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">
                Mobile Game Top-Ups
              </Link>
            </li>
            <li>
              <Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">
                Digital Gift Cards
              </Link>
            </li>
            <li>
              <Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">
                Premium Subscriptions
              </Link>
            </li>
          </ul>
        </div>

        {/* Payment Methods Column */}
        <div>
          <h4 className="font-bold text-slate-200 text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Accepted Payments
          </h4>
          <p className="text-slate-400 mb-3">
            Manual transfers accepted across Kurdistan & Iraq:
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800">
              <Wallet className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-slate-200 text-xs">FastPay Mobile Wallet</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800">
              <Phone className="w-4 h-4 text-purple-400" />
              <span className="font-bold text-slate-200 text-xs">Korek Cash / Credit</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800">
              <CreditCard className="w-4 h-4 text-blue-400" />
              <span className="font-bold text-slate-200 text-xs">Iraq MasterCard Transfer</span>
            </div>
          </div>
        </div>

        {/* Support & Admin Column */}
        <div>
          <h4 className="font-bold text-slate-200 text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Customer Support
          </h4>
          <p className="text-slate-400 mb-4">
            Have questions about an order or payment? Reach out to our 24/7 gaming agent team directly.
          </p>
          <div className="space-y-2">
            <a
              href="https://wa.me/9647500000000"
              target="_blank"
              rel="noreferrer"
              className="block w-full py-2 px-3 text-center rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white transition-colors"
            >
              Contact on WhatsApp
            </a>
            <Link
              to="/admin-login"
              className="block w-full py-2 px-3 text-center rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 font-semibold text-slate-300 transition-colors"
            >
              Admin Control Panel
            </Link>
          </div>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-slate-900 py-4 bg-[#020407]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Built for Iraqi & Kurdish gamers.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Kurdistan & Iraq Gamers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
