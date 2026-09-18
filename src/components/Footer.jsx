import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, PhoneCall, MessageSquare, Clock, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#03050a] border-t border-slate-800/80 text-slate-400 text-sm mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-0.5">
                <div className="w-full h-full bg-[#050811] rounded-[10px] flex items-center justify-center">
                  <Gamepad2 class="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-extrabold tracking-wider text-white">
                DANO STORE
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              The leading digital gaming store in Kurdistan and Iraq. Fast, reliable delivery for mobile top-ups, paid Steam games, gift cards, and premium subscriptions.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-slate-400 font-medium">Supported Payments:</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-slate-900 border border-slate-800 text-[11px] font-bold text-cyan-400 rounded">FastPay</span>
                <span className="px-2 py-1 bg-slate-900 border border-slate-800 text-[11px] font-bold text-cyan-400 rounded">Korek</span>
                <span className="px-2 py-1 bg-slate-900 border border-slate-800 text-[11px] font-bold text-purple-400 rounded">MasterCard</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-cyan-400 transition-colors">All Products</Link>
              </li>
              <li>
                <Link to="/products?category=top-up" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups</Link>
              </li>
              <li>
                <Link to="/products?category=paid-games" className="hover:text-cyan-400 transition-colors">Paid Games</Link>
              </li>
              <li>
                <Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">Gift Cards</Link>
              </li>
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Platforms</h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/products?platform=PC" className="hover:text-cyan-400 transition-colors">PC Gaming</Link>
              </li>
              <li>
                <Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">PlayStation</Link>
              </li>
              <li>
                <Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">Xbox Store</Link>
              </li>
              <li>
                <Link to="/products?platform=Mobile" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-cyan-400 transition-colors font-medium text-cyan-400">Admin Portal</Link>
              </li>
            </ul>
          </div>

          {/* Support / Contact */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Customer Support</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Clock class="w-4 h-4 text-cyan-400 shrink-0" />
                <span>24/7 Fast Delivery & Support</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck class="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Legal & Safe Guarantee</span>
              </div>
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href="https://wa.me/9647500000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 px-3 py-2 rounded-xl text-center font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare class="w-3.5 h-3.5" />
                  <span>WhatsApp Support</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Target audience Kurdistan / Iraq.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with precision for gamers</span>
            <Heart class="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
