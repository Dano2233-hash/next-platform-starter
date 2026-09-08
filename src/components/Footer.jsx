import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, CreditCard, ShieldCheck, Headphones, MessageSquare, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#03060c] border-t border-slate-800/80 text-slate-400 text-xs mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">

          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-[1.5px]">
                <div className="w-full h-full bg-[#080d1a] rounded-[10px] flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="text-lg font-black tracking-wider text-white uppercase">
                DANO <span className="text-cyan-400">STORE</span>
              </span>
            </Link>

            <p className="text-slate-400 leading-relaxed max-w-sm text-xs">
              Kurdistan and Iraq's premier digital store for video game activations, mobile game top-ups, gift cards, and premium subscriptions. Fast, legal, and guaranteed.
            </p>

            {/* Payment Method Badges */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                Accepted Payment Methods
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-1.5 text-xs font-bold text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  FastPay
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-1.5 text-xs font-bold text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  Korek
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-1.5 text-xs font-bold text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-orange-400" />
                  MasterCard
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4">
              Gaming Categories
            </h4>
            <ul className="space-y-2.5">
              <li><Link to="/products?category=xbox" className="hover:text-cyan-400 transition-colors">Xbox Games & Cards</Link></li>
              <li><Link to="/products?category=playstation" className="hover:text-cyan-400 transition-colors">PlayStation PSN</Link></li>
              <li><Link to="/products?category=pc" className="hover:text-cyan-400 transition-colors">PC Steam & Keys</Link></li>
              <li><Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups (UC, VP)</Link></li>
              <li><Link to="/products?category=giftcards" className="hover:text-cyan-400 transition-colors">Digital Gift Cards</Link></li>
              <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Pro Subscriptions</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4">
              Store Support
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>100% Legal Digital Keys</span>
              </li>
              <li className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Manual Payment Verification</span>
              </li>
              <li className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>24/7 Fast Customer Service</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Social Contacts */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4">
              Need Help?
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Reach out to our customer agents on WhatsApp, Discord, or TikTok after placing an order.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="https://wa.me/9647500000000"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 font-bold flex items-center justify-between hover:bg-emerald-900/60 transition-colors"
              >
                <span>WhatsApp Support</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-xl bg-indigo-950/60 border border-indigo-800/80 text-indigo-300 font-bold flex items-center justify-between hover:bg-indigo-900/60 transition-colors"
              >
                <span>Discord Community</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <Link to="/admin-login" className="hover:text-cyan-400 transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
