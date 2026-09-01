import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, CreditCard, MessageCircle, Send } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#03050e] border-t border-cyan-900/30 text-slate-400 text-sm mt-20">
      {/* Feature Badges Bar */}
      <div className="border-b border-slate-900/80 bg-[#050818] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-[#080e2b] border border-cyan-900/20">
            <Zap className="w-8 h-8 text-cyan-400 shrink-0" />
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Instant Delivery</h4>
              <p className="text-xs text-slate-400">Codes delivered right after order</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-[#080e2b] border border-cyan-900/20">
            <ShieldCheck className="w-8 h-8 text-cyan-400 shrink-0" />
            <div>
              <h4 className="font-bold text-slate-200 text-sm">100% Legal & Safe</h4>
              <p className="text-xs text-slate-400">Official digital game codes & top-ups</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-[#080e2b] border border-cyan-900/20">
            <CreditCard className="w-8 h-8 text-cyan-400 shrink-0" />
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Local Payment</h4>
              <p className="text-xs text-slate-400">FastPay, Korek, and MasterCard</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-[#080e2b] border border-cyan-900/20">
            <Headphones className="w-8 h-8 text-cyan-400 shrink-0" />
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Kurdistan Support</h4>
              <p className="text-xs text-slate-400">Contact us via WhatsApp & Discord</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500 p-[1px]">
              <div className="w-full h-full bg-[#03050e] rounded-[7px] flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <span className="font-extrabold text-lg text-white">Dano Store</span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed">
            Premier digital gaming store in Kurdistan and Iraq for video games, mobile top-ups, gift cards, and premium subscriptions.
          </p>
          <span className="inline-block text-[11px] font-semibold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-500/20">
            Currency: IQD Only
          </span>
        </div>

        {/* Quick Categories */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-100 text-sm uppercase tracking-wider">Categories</h3>
          <ul className="space-y-2 text-xs">
            <li><Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups</Link></li>
            <li><Link to="/products?category=pc" className="hover:text-cyan-400 transition-colors">PC Games</Link></li>
            <li><Link to="/products?category=playstation" className="hover:text-cyan-400 transition-colors">PlayStation Games</Link></li>
            <li><Link to="/products?category=xbox" className="hover:text-cyan-400 transition-colors">Xbox Games & Cards</Link></li>
            <li><Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">Gift Cards</Link></li>
            <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Subscriptions</Link></li>
          </ul>
        </div>

        {/* Accepted Payment Methods */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-100 text-sm uppercase tracking-wider">Payment Methods</h3>
          <p className="text-xs text-slate-400">We accept manual local payments only:</p>
          <div className="flex flex-col gap-2 pt-1">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#070d24] border border-cyan-900/30 text-xs font-semibold text-slate-200">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span> FastPay
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#070d24] border border-cyan-900/30 text-xs font-semibold text-slate-200">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span> Korek
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#070d24] border border-cyan-900/30 text-xs font-semibold text-slate-200">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span> MasterCard
            </div>
          </div>
        </div>

        {/* Support & Admin */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-100 text-sm uppercase tracking-wider">Contact & Support</h3>
          <p className="text-xs text-slate-400">Need help with an order? Reach us via:</p>
          <div className="space-y-2 text-xs font-semibold">
            <a href="https://wa.me/9640000000000" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-emerald-400 hover:underline">
              <MessageCircle className="w-4 h-4" /> WhatsApp Support
            </a>
            <a href="https://discord.gg" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-indigo-400 hover:underline">
              <Send className="w-4 h-4" /> Discord Server
            </a>
          </div>
          <div className="pt-2">
            <Link to="/admin" className="text-xs text-slate-500 hover:text-cyan-400 transition-colors">
              Admin Portal Login →
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Dano Store. All rights reserved. Servicing Kurdistan & Iraq gamers.
      </div>
    </footer>
  );
};
