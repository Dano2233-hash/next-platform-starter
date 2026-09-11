import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Heart, MessageCircle, Send, Globe2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-auto bg-[#040609] border-t border-slate-800/80 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-slate-950 font-bold">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white">
                DANO <span className="text-cyan-400">STORE</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Kurdistan & Iraq's trusted digital gaming marketplace. Instant delivery for games, mobile top-ups, gift cards, and subscriptions.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Safe & Verified Digital Delivery</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-slate-200 mb-4 text-xs tracking-wider uppercase">Categories</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">
                  PUBG & Mobile Top-Ups
                </Link>
              </li>
              <li>
                <Link to="/products?category=games" className="hover:text-cyan-400 transition-colors">
                  Steam & PC Games
                </Link>
              </li>
              <li>
                <Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">
                  Steam, PSN & Xbox Gift Cards
                </Link>
              </li>
              <li>
                <Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">
                  Discord Nitro & Subscriptions
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h4 className="font-bold text-slate-200 mb-4 text-xs tracking-wider uppercase">Direct Support</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://wa.me/9647500000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Support</span>
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                >
                  <Send className="w-4 h-4" />
                  <span>Discord Community</span>
                </a>
              </li>
              <li className="text-slate-500 pt-1">Working Hours: 24/7 Service</li>
            </ul>
          </div>

          {/* Allowed Payment Methods */}
          <div>
            <h4 className="font-bold text-slate-200 mb-4 text-xs tracking-wider uppercase">Supported Local Payments</h4>
            <p className="text-xs text-slate-400 mb-3">
              We support fast manual transfers in IQD:
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-400 font-bold text-xs">
                FastPay
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 font-bold text-xs">
                Korek
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-purple-400 font-bold text-xs">
                MasterCard
              </span>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Built for gamers in Kurdistan & Iraq.</p>
          <div className="flex items-center gap-4">
            <Link to="/products" className="hover:text-slate-300">Products</Link>
            <Link to="/admin-login" className="hover:text-slate-300">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
