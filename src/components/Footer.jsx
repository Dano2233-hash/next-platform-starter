import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Phone, Mail, MapPin, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[2px]">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                DANO <span className="text-cyan-400">STORE</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Kurdistan & Iraq's premier digital gaming marketplace for instant top-ups, game keys, gift cards, and premium subscriptions. Fast, reliable & 100% legal.
            </p>
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold bg-cyan-950/40 p-2.5 rounded-lg border border-cyan-800/40">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>100% Guaranteed Digital Delivery</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/products?category=games" className="hover:text-cyan-400 transition-colors">Paid PC & Console Games</Link></li>
              <li><Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">Mobile Game Top-Ups (PUBG, Free Fire)</Link></li>
              <li><Link to="/products?category=giftcards" className="hover:text-cyan-400 transition-colors">Gift Cards (Steam, PSN, Xbox)</Link></li>
              <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Subscriptions (Discord, Netflix, YT)</Link></li>
              <li><Link to="/cart" className="hover:text-cyan-400 transition-colors">My Cart & Checkout</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Customer Care</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Erbil / Sulaymaniyah, Kurdistan Region, Iraq</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>WhatsApp: +964 750 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>support@danostore.com</span>
              </div>
              <div className="pt-1">
                <Link to="/admin-login" className="text-[11px] text-purple-400 hover:underline">
                  Admin Login Access &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Accepted Payment Methods - ONLY FastPay, Korek, MasterCard */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Accepted Local Payments</h4>
            <p className="text-xs text-slate-400">
              We accept manual payments via Kurdistan local channels:
            </p>
            <div className="grid grid-cols-1 gap-2 pt-1">
              <div className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-200">
                <span className="text-cyan-400 font-bold">FastPay</span>
                <span className="text-[10px] text-slate-500">Instant Mobile</span>
              </div>
              <div className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-200">
                <span className="text-blue-400 font-bold">Korek Cash / Code</span>
                <span className="text-[10px] text-slate-500">Kurdistan Local</span>
              </div>
              <div className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-200">
                <span className="text-purple-400 font-bold">MasterCard / FIB</span>
                <span className="text-[10px] text-slate-500">Bank Transfer</span>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} Dano Store. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with passion for gamers in Kurdistan & Iraq</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
