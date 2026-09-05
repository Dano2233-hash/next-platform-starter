import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Headphones, CreditCard, Gamepad2, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#03060a] border-t border-slate-900 text-slate-400 text-xs">
      {/* Features Banner */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6 border-b border-slate-900/80">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-200 text-sm">Instant Digital Delivery</h4>
            <p className="text-[11px] text-slate-500">Fast code & top-up fulfillment</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-200 text-sm">100% Official Codes</h4>
            <p className="text-[11px] text-slate-500">Guaranteed authentic items</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-200 text-sm">Local Payment Support</h4>
            <p className="text-[11px] text-slate-500">FastPay, Korek & MasterCard</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-200 text-sm">Customer Support</h4>
            <p className="text-[11px] text-slate-500">WhatsApp & Discord support</p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">

        {/* Brand Col */}
        <div className="md:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 flex items-center justify-center text-white font-black">
              <Gamepad2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-xl text-white tracking-tight">
              Dano Store
            </span>
          </Link>
          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            Kurdistan & Iraq’s premier digital gaming store for mobile game top-ups, paid Steam & console titles, gift cards, and premium subscriptions. Fast manual verification and instant delivery.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <span className="text-[11px] text-slate-500 font-medium">Accepted Payments:</span>
            <span className="px-2 py-1 rounded bg-amber-950/60 border border-amber-800/50 text-amber-400 text-[10px] font-bold">FastPay</span>
            <span className="px-2 py-1 rounded bg-red-950/60 border border-red-800/50 text-rose-400 text-[10px] font-bold">Korek Cash</span>
            <span className="px-2 py-1 rounded bg-blue-950/60 border border-blue-800/50 text-blue-400 text-[10px] font-bold">MasterCard</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold text-slate-200 mb-3">Quick Navigation</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
            <li><Link to="/products" className="hover:text-cyan-400 transition-colors">All Products</Link></li>
            <li><Link to="/products?category=mobile-topups" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups</Link></li>
            <li><Link to="/products?category=paid-games" className="hover:text-cyan-400 transition-colors">Paid Games</Link></li>
            <li><Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">Gift Cards</Link></li>
            <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Subscriptions</Link></li>
          </ul>
        </div>

        {/* Support & Admin */}
        <div>
          <h4 className="text-sm font-bold text-slate-200 mb-3">Customer Service</h4>
          <ul className="space-y-2">
            <li><Link to="/cart" className="hover:text-cyan-400 transition-colors">View Cart</Link></li>
            <li><Link to="/checkout" className="hover:text-cyan-400 transition-colors">Checkout</Link></li>
            <li><Link to="/admin-login" className="hover:text-cyan-400 transition-colors">Admin Portal</Link></li>
          </ul>
        </div>

        {/* Store Information */}
        <div>
          <h4 className="text-sm font-bold text-slate-200 mb-3">Store Info</h4>
          <ul className="space-y-2 text-slate-400">
            <li>Region: Kurdistan / Iraq</li>
            <li>Currency: IQD Only</li>
            <li>Language: English</li>
            <li>Support: WhatsApp / Discord</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#020407] py-4 border-t border-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" /> for Kurdistan & Iraq Gamers
          </p>
        </div>
      </div>
    </footer>
  );
};
