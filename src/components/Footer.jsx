import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, CreditCard, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#030408] text-slate-400 border-t border-slate-800/80 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Features Ribbon */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-10 border-b border-slate-800/60">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Instant Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">Codes and top-ups delivered within minutes.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center shrink-0 text-blue-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Local Iraq Payments</h4>
              <p className="text-xs text-slate-400 mt-0.5">Pay easily via FastPay, Korek, or MasterCard.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center shrink-0 text-purple-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">100% Official Products</h4>
              <p className="text-xs text-slate-400 mt-0.5">Guaranteed valid licenses & top-up pins.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">24/7 Local Support</h4>
              <p className="text-xs text-slate-400 mt-0.5">Direct help via WhatsApp and Discord.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 py-10">

          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/20">
                <Gamepad2 className="w-5 h-5 text-slate-950" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Dano <span className="text-cyan-400">Store</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The premier digital gaming store for players in Kurdistan and Iraq. Buy game keys, mobile top-ups, gift cards, and premium subscriptions with instant processing and dedicated support.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Supported Methods:</span>
              <span className="text-xs font-bold text-slate-200 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">FastPay</span>
              <span className="text-xs font-bold text-slate-200 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">Korek</span>
              <span className="text-xs font-bold text-slate-200 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">MasterCard</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3.5">
              Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups</Link></li>
              <li><Link to="/products?category=games" className="hover:text-cyan-400 transition-colors">PC & Console Games</Link></li>
              <li><Link to="/products?category=giftcards" className="hover:text-cyan-400 transition-colors">Gift Cards</Link></li>
              <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Subscriptions</Link></li>
              <li><Link to="/products" className="hover:text-cyan-400 transition-colors">All Products</Link></li>
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3.5">
              Platforms
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/products?platform=PC" className="hover:text-cyan-400 transition-colors">PC Gaming</Link></li>
              <li><Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">Xbox Network</Link></li>
              <li><Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">PlayStation Network</Link></li>
              <li><Link to="/products?platform=Mobile" className="hover:text-cyan-400 transition-colors">Mobile Gaming</Link></li>
            </ul>
          </div>

          {/* Support Contacts */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3.5">
              Customer Support
            </h4>
            <div className="space-y-2.5 text-xs">
              <a
                href="https://wa.me/9647500000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors text-slate-300"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Live Chat</span>
              </a>
              <p className="text-[11px] text-slate-400">
                Operating hours: 9:00 AM - 12:00 AM AST
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>&copy; {new Date().getFullYear()} Dano Store. All rights reserved.</p>
          <div className="flex items-center space-x-4 text-[11px]">
            <span>Designed for Kurdistan & Iraq Gamers</span>
            <span>&bull;</span>
            <Link to="/admin-login" className="hover:text-cyan-400 transition-colors">
              Admin Access
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
