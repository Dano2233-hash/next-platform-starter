import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Headphones, CreditCard, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#030409] text-slate-400 text-xs border-t border-slate-800/80 mt-16">
      {/* Value Proposition Badges */}
      <div className="border-b border-slate-900 bg-slate-950/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <Zap className="w-6 h-6 text-cyan-400 shrink-0" />
            <div>
              <h4 className="font-bold text-slate-200">Instant Delivery</h4>
              <p className="text-[11px] text-slate-500">Automated digital code delivery</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <ShieldCheck className="w-6 h-6 text-purple-400 shrink-0" />
            <div>
              <h4 className="font-bold text-slate-200">100% Legal & Safe</h4>
              <p className="text-[11px] text-slate-500">Official top-ups & codes</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <CreditCard className="w-6 h-6 text-blue-400 shrink-0" />
            <div>
              <h4 className="font-bold text-slate-200">Local Payment</h4>
              <p className="text-[11px] text-slate-500">FastPay, Korek, MasterCard</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <Headphones className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <h4 className="font-bold text-slate-200">24/7 Support</h4>
              <p className="text-[11px] text-slate-500">Active Kurdistan team support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand info */}
        <div className="space-y-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center font-black text-white text-lg">
              D
            </div>
            <span className="text-base font-extrabold text-white">
              Dano <span className="text-cyan-400">Store</span>
            </span>
          </Link>
          <p className="text-slate-400 text-xs leading-relaxed">
            Kurdistan & Iraq's premier digital gaming store for games, top-ups, gift cards, and subscriptions.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider text-cyan-400">
            Store Categories
          </h4>
          <ul className="space-y-1.5 text-slate-400">
            <li><Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups (PUBG UC, Diamonds)</Link></li>
            <li><Link to="/products?category=pc" className="hover:text-cyan-400 transition-colors">PC Steam Games</Link></li>
            <li><Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">Xbox Store Games</Link></li>
            <li><Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">PlayStation Games & PSN</Link></li>
            <li><Link to="/products?category=giftcards" className="hover:text-cyan-400 transition-colors">Digital Gift Cards</Link></li>
            <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Subscriptions (Nitro, Premium)</Link></li>
          </ul>
        </div>

        {/* Accepted Payment Methods */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider text-cyan-400">
            Accepted Payment Methods
          </h4>
          <div className="flex flex-col gap-2 pt-1">
            <div className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="font-bold text-slate-200">FastPay</span>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950 px-1.5 py-0.5 rounded">Instant</span>
            </div>
            <div className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="font-bold text-slate-200">Korek Cash / Balance</span>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950 px-1.5 py-0.5 rounded">Instant</span>
            </div>
            <div className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="font-bold text-slate-200">MasterCard</span>
              <span className="text-[10px] text-cyan-400 font-semibold bg-cyan-950 px-1.5 py-0.5 rounded">Secure</span>
            </div>
          </div>
        </div>

        {/* Direct Contact Links */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider text-cyan-400">
            Need Help?
          </h4>
          <p className="text-slate-400 leading-relaxed">
            Have questions about your order or top-up? Contact our team on social media:
          </p>
          <div className="flex flex-col gap-2 pt-1">
            <a href="https://wa.me/9640000000000" target="_blank" rel="noreferrer" className="px-3 py-2 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-bold hover:bg-emerald-900/60 transition-colors flex items-center justify-between">
              <span>WhatsApp Support</span>
              <Sparkles className="w-3.5 h-3.5" />
            </a>
            <a href="https://discord.gg" target="_blank" rel="noreferrer" className="px-3 py-2 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 font-bold hover:bg-indigo-900/60 transition-colors flex items-center justify-between">
              <span>Discord Community</span>
              <Sparkles className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-900 py-6 text-center text-slate-500">
        <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Premium Digital Gaming Services for Kurdistan & Iraq.</p>
      </div>
    </footer>
  );
};

export default Footer;
