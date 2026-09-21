import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Heart, MessageSquare } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#03060d] text-slate-400 border-t border-slate-800/80 mt-16">
      {/* Trust Badges */}
      <div className="border-b border-slate-800/60 bg-slate-950/50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100">Instant Delivery</h4>
              <p className="text-xs text-slate-500">Automated digital code & account top-up</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100">100% Legal & Safe</h4>
              <p className="text-xs text-slate-500">Authorized digital gaming distributor</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100">24/7 Local Support</h4>
              <p className="text-xs text-slate-500">Fast assistance via WhatsApp & Discord</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 p-0.5">
              <div className="w-full h-full bg-[#050811] rounded-[10px] flex items-center justify-center">
                <span className="font-black text-cyan-400 text-lg">DS</span>
              </div>
            </div>
            <span className="font-extrabold text-xl text-white">Dano Store</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The premier digital gaming hub in Kurdistan & Iraq. Instant mobile top-ups, paid Steam games, gift cards, and official digital subscriptions at local prices.
          </p>
          <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
            <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded">FastPay</span>
            <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded">Korek</span>
            <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded">MasterCard</span>
          </div>
        </div>

        {/* Categories Column */}
        <div>
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4">
            Quick Categories
          </h3>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/products?category=mobile-topup" className="hover:text-cyan-400 transition-colors">
                Mobile Game Top-Ups
              </Link>
            </li>
            <li>
              <Link to="/products?category=paid-games" className="hover:text-cyan-400 transition-colors">
                PC & Steam Paid Games
              </Link>
            </li>
            <li>
              <Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">
                Gift Cards (Steam, PSN, Xbox)
              </Link>
            </li>
            <li>
              <Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">
                Subscriptions (Nitro, Netflix)
              </Link>
            </li>
          </ul>
        </div>

        {/* Platforms Column */}
        <div>
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4">
            Platforms
          </h3>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/products?platform=PC" className="hover:text-cyan-400 transition-colors">
                PC Gaming
              </Link>
            </li>
            <li>
              <Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">
                PlayStation Store
              </Link>
            </li>
            <li>
              <Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">
                Xbox Store
              </Link>
            </li>
            <li>
              <Link to="/products?platform=Mobile" className="hover:text-cyan-400 transition-colors">
                Mobile Gaming
              </Link>
            </li>
            <li>
              <Link to="/admin-login" className="hover:text-purple-400 transition-colors text-slate-500">
                Admin Panel Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Support Column */}
        <div>
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4">
            Local Payments
          </h3>
          <p className="text-xs text-slate-400 mb-3">
            Fast, secure manual payments designed specifically for Iraqi gamers.
          </p>
          <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span className="font-semibold text-cyan-400">FastPay Cash</span>
              <span>Available</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="font-semibold text-amber-400">Korek Cash</span>
              <span>Available</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="font-semibold text-blue-400">MasterCard / FIB</span>
              <span>Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-slate-900 bg-[#020408] py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Kurdistan & Iraq Gamers
          </p>
        </div>
      </div>
    </footer>
  );
};
