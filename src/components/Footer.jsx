import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Headphones, Zap, CreditCard, MessageCircle, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#03050a] border-t border-slate-800/80 text-slate-400 text-sm mt-16">
      {/* Value Props Bar */}
      <div className="border-b border-slate-800/60 bg-[#060914] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-950/60 border border-blue-800/50 text-blue-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-slate-200">Instant Delivery</h5>
              <p className="text-xs text-slate-400">Automated & fast code dispatch</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-800/50 text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-slate-200">100% Legal & Safe</h5>
              <p className="text-xs text-slate-400">Official codes & direct top-ups</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-800/50 text-purple-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-slate-200">Local Payments</h5>
              <p className="text-xs text-slate-400">FastPay, Korek & MasterCard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/50 text-emerald-400">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-slate-200">24/7 Support</h5>
              <p className="text-xs text-slate-400">WhatsApp & Discord active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-lg text-slate-100">Dano Store</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            Kurdistan and Iraq's trusted digital store for game keys, mobile top-ups, gift cards, and premium subscriptions.
          </p>
          {/* Payment Badges */}
          <div className="pt-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">Accepted Payment Methods:</span>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-700/80 rounded-md text-[11px] font-bold text-slate-200">
                FastPay
              </span>
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-700/80 rounded-md text-[11px] font-bold text-slate-200">
                Korek
              </span>
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-700/80 rounded-md text-[11px] font-bold text-slate-200">
                MasterCard
              </span>
            </div>
          </div>
        </div>

        {/* Quick Categories */}
        <div>
          <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">Categories</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/products?category=Mobile Top-Ups" className="hover:text-cyan-400 transition-colors">
                Mobile Top-Ups (PUBG, Free Fire, VP)
              </Link>
            </li>
            <li>
              <Link to="/products?category=Paid Games" className="hover:text-cyan-400 transition-colors">
                PC & Console Games (GTA V, RDR2)
              </Link>
            </li>
            <li>
              <Link to="/products?category=Gift Cards" className="hover:text-cyan-400 transition-colors">
                Gift Cards (Steam, PSN, Xbox, Apple)
              </Link>
            </li>
            <li>
              <Link to="/products?category=Subscriptions" className="hover:text-cyan-400 transition-colors">
                Digital Subscriptions (Nitro, Netflix)
              </Link>
            </li>
          </ul>
        </div>

        {/* Platform Links */}
        <div>
          <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">Platforms</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/products?platform=PC" className="hover:text-cyan-400 transition-colors">
                PC Gaming (Steam & Epic)
              </Link>
            </li>
            <li>
              <Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">
                PlayStation Store
              </Link>
            </li>
            <li>
              <Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">
                Xbox Series X|S & One
              </Link>
            </li>
            <li>
              <Link to="/products?platform=Mobile" className="hover:text-cyan-400 transition-colors">
                iOS & Android Top-Ups
              </Link>
            </li>
          </ul>
        </div>

        {/* Direct Contact & Social */}
        <div>
          <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">Customer Care</h4>
          <p className="text-xs text-slate-400 mb-3">
            Have questions about an order? Contact our support team directly.
          </p>
          <div className="space-y-2">
            <a
              href="https://wa.me/9647500000000"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 text-xs font-semibold hover:bg-emerald-900/50 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Support</span>
            </a>
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-950/40 border border-indigo-800/50 text-indigo-300 text-xs font-semibold hover:bg-indigo-900/50 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Discord Community</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} Dano Store. All rights reserved.</span>
          <span className="text-slate-400">Erbil & Sulaymaniyah, Kurdistan Region, Iraq</span>
        </div>
      </div>
    </footer>
  );
}
