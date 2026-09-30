import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Heart, MessageSquare, ExternalLink, Send } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#03050c] border-t border-slate-800/80 text-slate-400 text-xs">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Brand Info */}
        <div className="space-y-4 md:col-span-1">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <span className="font-extrabold text-lg text-white">
              Dano <span className="text-cyan-400">Store</span>
            </span>
          </Link>
          <p className="text-slate-400 text-xs leading-relaxed">
            Kurdistan & Iraq's premier digital gaming marketplace. Official game codes, mobile top-ups, gift cards, and subscriptions with instant delivery.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-cyan-400 font-semibold bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800 w-fit">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>100% Guaranteed & Official Codes</span>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-sm font-bold text-slate-100 mb-3 uppercase tracking-wider">
            Quick Categories
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <Link to="/products?category=Mobile Top-Ups" className="hover:text-cyan-400 transition-colors">
                PUBG UC & Free Fire Diamonds
              </Link>
            </li>
            <li>
              <Link to="/products?category=Paid Games" className="hover:text-cyan-400 transition-colors">
                Steam PC Games (GTA V, Elden Ring)
              </Link>
            </li>
            <li>
              <Link to="/products?category=Gift Cards" className="hover:text-cyan-400 transition-colors">
                Steam, PSN & Xbox Cards
              </Link>
            </li>
            <li>
              <Link to="/products?category=Subscriptions" className="hover:text-cyan-400 transition-colors">
                Discord Nitro & YouTube Premium
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Payment Methods Supported */}
        <div>
          <h4 className="text-sm font-bold text-slate-100 mb-3 uppercase tracking-wider">
            Supported Payments
          </h4>
          <p className="text-xs text-slate-400 mb-3">
            We support local Iraqi manual payment methods with zero online gateway fees:
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-1 rounded bg-rose-500/10 border border-rose-500/30 text-rose-300 font-bold text-[11px]">
              FastPay
            </span>
            <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-[11px]">
              Korek Cash
            </span>
            <span className="px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/30 text-blue-300 font-bold text-[11px]">
              MasterCard / FIB
            </span>
          </div>
        </div>

        {/* Column 4: Contact & Social Support */}
        <div>
          <h4 className="text-sm font-bold text-slate-100 mb-3 uppercase tracking-wider">
            Customer Support
          </h4>
          <p className="text-xs text-slate-400 mb-3">
            Need help with your order? Reach out to us directly:
          </p>
          <div className="space-y-2">
            <a
              href="https://wa.me/9647500000000"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-semibold text-xs hover:bg-emerald-500/20 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Support</span>
            </a>
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-semibold text-xs hover:bg-indigo-500/20 transition-all"
            >
              <Send className="w-4 h-4 text-indigo-400" />
              <span>Discord Community</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 bg-[#020308] py-4 text-center text-slate-500 text-[11px]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} Dano Store. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for Gamers in Kurdistan & Iraq
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
