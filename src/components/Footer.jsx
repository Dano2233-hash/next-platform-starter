import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, CreditCard, Headphones, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#03060d] border-t border-slate-800/80 text-slate-400 text-sm mt-20">
      {/* Feature Highlights Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-slate-800/60">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 text-sm">Instant Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">Codes & top-ups sent fast</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 text-sm">100% Legal & Safe</h4>
              <p className="text-xs text-slate-400 mt-0.5">Official digital products</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 text-sm">Local Kurdistan Payments</h4>
              <p className="text-xs text-slate-400 mt-0.5">FastPay, Korek & MasterCard</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 text-sm">Dedicated Support</h4>
              <p className="text-xs text-slate-400 mt-0.5">WhatsApp & Discord support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5">
                <div className="w-full h-full bg-[#080d1a] rounded-[10px] flex items-center justify-center font-black text-cyan-400 text-lg">
                  DS
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Dano <span className="text-cyan-400">Store</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your premier digital gaming store in Kurdistan and Iraq. Top-ups, PC games, gift cards, and premium subscriptions delivered with speed and security.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-slate-200 font-semibold text-xs uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups</Link></li>
              <li><Link to="/products?category=paid-games" className="hover:text-cyan-400 transition-colors">Paid PC Games</Link></li>
              <li><Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">Gift Cards</Link></li>
              <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Digital Subscriptions</Link></li>
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h3 className="text-slate-200 font-semibold text-xs uppercase tracking-wider mb-4">Platforms</h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/products?platform=PC" className="hover:text-cyan-400 transition-colors">PC Gaming</Link></li>
              <li><Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">PlayStation Store</Link></li>
              <li><Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">Xbox Network</Link></li>
              <li><Link to="/products?platform=Mobile" className="hover:text-cyan-400 transition-colors">iOS & Android</Link></li>
            </ul>
          </div>

          {/* Payment Badges */}
          <div>
            <h3 className="text-slate-200 font-semibold text-xs uppercase tracking-wider mb-4">Supported Payments</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-md bg-blue-950/60 text-blue-400 border border-blue-800/60 text-xs font-semibold">
                FastPay
              </span>
              <span className="px-2.5 py-1 rounded-md bg-cyan-950/60 text-cyan-400 border border-cyan-800/60 text-xs font-semibold">
                Korek
              </span>
              <span className="px-2.5 py-1 rounded-md bg-purple-950/60 text-purple-400 border border-purple-800/60 text-xs font-semibold">
                MasterCard
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-3">
              Currency: <strong className="text-slate-300">IQD only</strong>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted for gamers in Kurdistan & Iraq</span>
            <Heart className="w-3.5 h-3.5 text-cyan-500 inline fill-cyan-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
