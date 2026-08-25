import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Heart, MessageSquare, ExternalLink } from 'lucide-react';
import { CONTACT_LINKS } from '../data/categories';

export default function Footer() {
  return (
    <footer className="bg-[#03060d] border-t border-slate-800/80 text-slate-400 text-xs mt-16">
      {/* Top Value Props Banner */}
      <div className="border-b border-slate-800/60 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">100% Legal & Verified</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Official game codes & direct top-ups.</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">24/7 Kurdistan Support</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Instant help via WhatsApp & Discord.</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Fast Instant Delivery</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Quick processing for FastPay & Korek.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand Column */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center">
              <Gamepad2 className="w-4 h-4 text-black font-extrabold" />
            </div>
            <span className="font-extrabold text-base text-slate-100 tracking-wider">
              DANO STORE
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed text-xs">
            The premier digital gaming store for Kurdistan & Iraq. Buy original games, mobile top-ups, gift cards, and subscriptions securely.
          </p>
          <div className="text-[11px] text-cyan-400 font-semibold">
            Currency: IQD Only (Kurdistan / Iraq)
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-2">
          <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider mb-3">
            Categories
          </h4>
          <ul className="space-y-1.5 text-xs">
            <li><Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups (UC, Diamonds)</Link></li>
            <li><Link to="/products?category=games" className="hover:text-cyan-400 transition-colors">Paid PC & Console Games</Link></li>
            <li><Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">Steam & PlayStation Gift Cards</Link></li>
            <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Discord Nitro & Subscriptions</Link></li>
          </ul>
        </div>

        {/* Payment Methods Info */}
        <div className="space-y-2">
          <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider mb-3">
            Supported Payments
          </h4>
          <p className="text-slate-400 text-xs">
            We accept trusted local manual payment options:
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-400 font-bold text-[11px]">
              FastPay
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-purple-400 font-bold text-[11px]">
              Korek
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-bold text-[11px]">
              MasterCard / FIB
            </span>
          </div>
        </div>

        {/* Social & Contact */}
        <div className="space-y-3">
          <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider mb-3">
            Connect & Support
          </h4>
          <div className="flex flex-col gap-2">
            <a
              href={CONTACT_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 font-bold flex items-center justify-between transition-all"
            >
              <span>WhatsApp Support</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={CONTACT_LINKS.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10 font-bold flex items-center justify-between transition-all"
            >
              <span>Discord Community</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={CONTACT_LINKS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-pink-500/50 text-pink-400 hover:bg-pink-500/10 font-bold flex items-center justify-between transition-all"
            >
              <span>TikTok Channel</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-900 py-4 bg-[#020408] text-center text-slate-500 text-[11px]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with precision for Kurdistan & Iraq gamers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
