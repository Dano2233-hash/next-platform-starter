import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, Wallet, PhoneCall, CreditCard, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10 border-b border-slate-800/80 text-center sm:text-left">
          <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800/80">
            <div className="p-3 bg-cyan-950/80 text-cyan-400 rounded-xl border border-cyan-500/30 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Instant Code Delivery</h4>
              <p className="text-xs text-slate-400">Receive codes & top-ups in minutes after order</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800/80">
            <div className="p-3 bg-blue-950/80 text-blue-400 rounded-xl border border-blue-500/30 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">100% Legal & Guaranteed</h4>
              <p className="text-xs text-slate-400">Official digital keys and direct game top-ups</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800/80">
            <div className="p-3 bg-purple-950/80 text-purple-400 rounded-xl border border-purple-500/30 shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Kurdistan Support 24/7</h4>
              <p className="text-xs text-slate-400">Dedicated assistance via WhatsApp & Discord</p>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Gamepad2 className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-black text-xl text-white">
                Dano <span className="text-cyan-400">Store</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              The premier digital gaming & top-up destination serving Kurdistan and Iraq. Pure performance, official game codes, and seamless local payments.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4">Gaming Categories</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">
                  Mobile Game Top-Ups
                </Link>
              </li>
              <li>
                <Link to="/products?platform=PC" className="hover:text-cyan-400 transition-colors">
                  PC Games (Steam Keys)
                </Link>
              </li>
              <li>
                <Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">
                  Xbox Series & Game Pass
                </Link>
              </li>
              <li>
                <Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">
                  PlayStation Store Cards
                </Link>
              </li>
              <li>
                <Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">
                  Digital Gift Cards
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4">Store Nav</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-cyan-400 transition-colors">All Products</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-cyan-400 transition-colors">Cart View</Link>
              </li>
              <li>
                <Link to="/admin-login" className="hover:text-cyan-400 transition-colors">Admin Portal</Link>
              </li>
            </ul>
          </div>

          {/* Local Payment Methods */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4">Accepted Payments</h4>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 bg-slate-900/80 p-2 rounded-lg border border-slate-800 text-xs">
                <Wallet className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-200 font-semibold">FastPay Wallet</span>
              </div>
              <div className="flex items-center gap-2.5 bg-slate-900/80 p-2 rounded-lg border border-slate-800 text-xs">
                <PhoneCall className="w-4 h-4 text-purple-400" />
                <span className="text-slate-200 font-semibold">Korek Cash / Transfer</span>
              </div>
              <div className="flex items-center gap-2.5 bg-slate-900/80 p-2 rounded-lg border border-slate-800 text-xs">
                <CreditCard className="w-4 h-4 text-blue-400" />
                <span className="text-slate-200 font-semibold">First Iraqi Bank (FIB) MasterCard</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved. IQD Only digital store.</p>
          <div className="flex items-center gap-1">
            <span>Built for gamers in Kurdistan & Iraq</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
