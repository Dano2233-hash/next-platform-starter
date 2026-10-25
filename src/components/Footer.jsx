import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Zap, ShieldCheck, HeartHandshake, PhoneCall } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#03050a] border-t border-slate-800/80 text-slate-400 text-sm mt-16">
      {/* Feature Highlights Banner */}
      <div className="border-b border-slate-800/60 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Instant Digital Delivery</h4>
              <p className="text-xs text-slate-400">Receive codes & top-ups right after payment confirmation.</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">100% Legal & Guaranteed</h4>
              <p className="text-xs text-slate-400">Directly authorized game top-ups & original digital keys.</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Local Kurdish Support</h4>
              <p className="text-xs text-slate-400">Available on WhatsApp & Discord to assist your order.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand info */}
        <div className="space-y-4 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 p-0.5 shadow-md">
              <div className="w-full h-full bg-[#070b19] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="text-lg font-extrabold text-white">
              Dano <span className="text-cyan-400">Store</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed">
            The premier digital gaming hub for Kurdistan & Iraq. Offering premium digital keys, mobile game top-ups, gift cards, and legal subscriptions with fast local payments.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Categories</h5>
          <ul className="space-y-2 text-xs">
            <li><Link to="/products?category=games" className="hover:text-cyan-400 transition-colors">PC & Console Games</Link></li>
            <li><Link to="/products?category=top-ups" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups (UC, VP, Robux)</Link></li>
            <li><Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">Gift Cards (Steam, PSN, Xbox)</Link></li>
            <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Subscriptions (Discord, YouTube)</Link></li>
          </ul>
        </div>

        {/* Platforms */}
        <div>
          <h5 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Platforms</h5>
          <ul className="space-y-2 text-xs">
            <li><Link to="/products?platform=PC" className="hover:text-cyan-400 transition-colors">PC Gaming</Link></li>
            <li><Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">PlayStation 4 / 5</Link></li>
            <li><Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">Xbox Series / One</Link></li>
            <li><Link to="/products?platform=Mobile" className="hover:text-cyan-400 transition-colors">Mobile Devices</Link></li>
          </ul>
        </div>

        {/* Payment Methods Info */}
        <div>
          <h5 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Accepted Payments</h5>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-cyan-400 font-semibold text-xs">FastPay</span>
            <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-cyan-400 font-semibold text-xs">Korek Cash</span>
            <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-cyan-400 font-semibold text-xs">MasterCard</span>
          </div>
          <p className="text-xs text-slate-500">
            All prices are explicitly listed and processed in IQD currency.
          </p>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-800/80 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Kurdistan, Iraq.</p>
          <div className="flex items-center gap-4">
            <Link to="/admin" className="hover:text-cyan-400 transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
