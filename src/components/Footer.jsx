import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, MessageCircle, Send } from 'lucide-react';
import { paymentMethods } from '../data/categories';

export const Footer = () => {
  return (
    <footer className="bg-[#03060f] border-t border-slate-800 text-slate-400 text-sm mt-16">
      {/* Top Value Banner */}
      <div className="border-b border-slate-800/80 bg-[#050916]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm">Instant Digital Delivery</h4>
              <p className="text-xs text-slate-400">Fast processing for top-ups & codes 24/7.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm">100% Legal & Guaranteed</h4>
              <p className="text-xs text-slate-400">Official gift cards & authorized top-up channels.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm">Kurdistan & Iraq Support</h4>
              <p className="text-xs text-slate-400">Direct customer care via WhatsApp & Telegram.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand Info */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-400 to-purple-600 p-[2px]">
              <div className="w-full h-full bg-[#080d1a] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="font-black text-xl tracking-tight text-white">
              DANO STORE
            </span>
          </Link>
          <p className="text-xs leading-relaxed text-slate-400">
            Your premium digital gaming hub in Kurdistan & Iraq. Specializing in instant game top-ups, Steam keys, gift cards, and digital subscriptions with Iraqi IQD local payment options.
          </p>
          <div className="text-xs text-cyan-400 font-semibold">
            Currency: IQD (Iraqi Dinar Only)
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <h4 className="text-slate-100 font-bold text-sm tracking-wider uppercase border-l-2 border-cyan-400 pl-2">
            Categories
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups (PUBG, FF, VP)</Link></li>
            <li><Link to="/products?category=games" className="hover:text-cyan-400 transition-colors">Paid PC & Console Games</Link></li>
            <li><Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">Digital Gift Cards</Link></li>
            <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Subscriptions & Services</Link></li>
            <li><Link to="/products?platform=xbox" className="hover:text-cyan-400 transition-colors">Xbox Store Games</Link></li>
            <li><Link to="/products?platform=playstation" className="hover:text-cyan-400 transition-colors">PlayStation Store</Link></li>
          </ul>
        </div>

        {/* Local Payment Methods */}
        <div className="space-y-3">
          <h4 className="text-slate-100 font-bold text-sm tracking-wider uppercase border-l-2 border-purple-400 pl-2">
            Accepted Payments
          </h4>
          <p className="text-xs text-slate-400">
            Manual transfer options available for local customers:
          </p>
          <div className="flex flex-col gap-2">
            {paymentMethods.map((pm) => (
              <div
                key={pm.id}
                className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-slate-200">{pm.name}</div>
                  <div className="text-[10px] text-slate-500">{pm.type}</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 font-semibold border border-cyan-800/40">
                  Manual
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Social */}
        <div className="space-y-3">
          <h4 className="text-slate-100 font-bold text-sm tracking-wider uppercase border-l-2 border-blue-400 pl-2">
            Connect With Us
          </h4>
          <p className="text-xs text-slate-400">
            Have questions about your order or need top-up assistance? Contact our team.
          </p>
          <div className="flex flex-col gap-2">
            <a
              href="https://wa.me/9647500000000"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              WhatsApp Support
            </a>
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-500/30 text-indigo-300 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <Send className="w-4 h-4 text-indigo-400" />
              Discord Community
            </a>
          </div>
          <div className="pt-2 text-[11px] text-slate-500">
            Admin Access: <Link to="/admin-login" className="text-purple-400 hover:underline font-semibold">/admin-login</Link>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-800/80 bg-[#02040a] py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} Dano Store. All rights reserved.</span>
          <span>Designed for Gamers in Kurdistan & Iraq</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
