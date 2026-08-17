import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  MessageCircle,
  Clock,
  PhoneCall,
  Headphones,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#03060d] text-slate-400 border-t border-slate-800/80 pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 p-0.5 shadow-md shadow-cyan-500/20">
                <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
                  <span className="font-extrabold text-base text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    D
                  </span>
                </div>
              </div>
              <span className="text-xl font-black text-white">
                Dano <span className="text-cyan-400">Store</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Kurdistan & Iraq’s premier digital gaming store. Get instant game top-ups, official Steam games, gift cards, and subscriptions with fast local payment options.
            </p>
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold bg-slate-900/80 px-3 py-2 rounded-lg border border-slate-800 w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Legal & Guaranteed Services</span>
            </div>
          </div>

          {/* Quick Category Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              Store Categories
            </h4>
            <ul className="flex flex-col gap-2 text-xs font-medium">
              <li>
                <Link to="/products?category=mobile" className="hover:text-cyan-400 transition">
                  Mobile Top-Ups (PUBG UC, Free Fire)
                </Link>
              </li>
              <li>
                <Link to="/products?category=pc" className="hover:text-cyan-400 transition">
                  PC Games (Steam Keys & VP)
                </Link>
              </li>
              <li>
                <Link to="/products?category=giftcards" className="hover:text-cyan-400 transition">
                  Gift Cards (Steam, PSN, Xbox, Apple)
                </Link>
              </li>
              <li>
                <Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition">
                  Subscriptions (Discord, YouTube, Netflix)
                </Link>
              </li>
              <li>
                <Link to="/products?tag=Flash Deal" className="hover:text-cyan-400 transition">
                  Flash Deals & Discounts
                </Link>
              </li>
            </ul>
          </div>

          {/* Accepted Payments */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              Local Payment Options
            </h4>
            <div className="flex flex-col gap-2 text-xs text-slate-300">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <span className="font-bold text-pink-400">FastPay Mobile</span>
                <span className="text-[10px] text-slate-500">Instant</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <span className="font-bold text-amber-400">Korek Cash / Airtime</span>
                <span className="text-[10px] text-slate-500">Instant</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <span className="font-bold text-cyan-400">MasterCard / FIB Card</span>
                <span className="text-[10px] text-slate-500">Bank Card</span>
              </div>
            </div>
          </div>

          {/* Support & Contact */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              Customer Support
            </h4>
            <p className="text-xs text-slate-400">
              Need help with your order or payment confirmation? Reach out to us directly:
            </p>
            <div className="flex flex-col gap-2 text-xs">
              <a
                href="https://wa.me/9640000000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900/40 transition font-semibold"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Customer Support</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
              </a>
              <div className="flex items-center gap-2 text-slate-400 pt-1">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Working Hours: 10:00 AM – 1:00 AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Premium Digital Store in Iraq.</p>
          <div className="flex items-center gap-6 text-slate-400">
            <Link to="/products" className="hover:text-white transition">
              All Products
            </Link>
            <Link to="/cart" className="hover:text-white transition">
              Cart
            </Link>
            <Link to="/admin-login" className="hover:text-white transition">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
