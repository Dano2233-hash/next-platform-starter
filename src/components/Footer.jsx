import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Heart, MessageSquare, PhoneCall, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs mt-20">
      {/* Top Value Banner */}
      <div className="border-b border-slate-900 bg-slate-900/40 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-100">Instant Digital Delivery</h4>
              <p className="text-slate-400 mt-0.5">Codes and top-ups delivered within minutes</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-100">100% Legal & Safe</h4>
              <p className="text-slate-400 mt-0.5">Official digital codes & direct ID top-ups</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-100">Local Support 24/7</h4>
              <p className="text-slate-400 mt-0.5">WhatsApp & Discord support for Kurdistan / Iraq</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-slate-950 font-black">
              <Gamepad2 className="w-5 h-5 text-slate-950" />
            </div>
            <span className="font-black text-lg tracking-wider text-slate-100">
              DANO <span className="text-cyan-400">STORE</span>
            </span>
          </Link>
          <p className="leading-relaxed">
            The premier digital gaming store in Kurdistan and Iraq. Buy PC & console games, mobile top-ups (UC, Diamonds, VP), gift cards, and premium subscriptions with local payment methods.
          </p>
          <div className="text-slate-300 font-semibold pt-1">
            Currency: <span className="text-cyan-400 font-extrabold">IQD Only</span>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-extrabold text-sm text-slate-100 uppercase tracking-wider mb-4 border-l-2 border-cyan-400 pl-2">
            Categories
          </h4>
          <ul className="space-y-2.5 font-medium">
            <li>
              <Link to="/products?category=Mobile Top-Ups" className="hover:text-cyan-400 transition-colors">
                Mobile Top-Ups (PUBG UC, Free Fire)
              </Link>
            </li>
            <li>
              <Link to="/products?category=PC Gaming" className="hover:text-cyan-400 transition-colors">
                PC Digital Games & Steam Keys
              </Link>
            </li>
            <li>
              <Link to="/products?category=Gift Cards" className="hover:text-cyan-400 transition-colors">
                Gift Cards (Steam, PSN, Xbox, Apple)
              </Link>
            </li>
            <li>
              <Link to="/products?category=Subscriptions" className="hover:text-cyan-400 transition-colors">
                Subscriptions (Nitro, YouTube, Netflix)
              </Link>
            </li>
            <li>
              <Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">
                PlayStation & Console Games
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-extrabold text-sm text-slate-100 uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
            Quick Navigation
          </h4>
          <ul className="space-y-2.5 font-medium">
            <li>
              <Link to="/" className="hover:text-cyan-400 transition-colors">
                Home Page
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-cyan-400 transition-colors">
                All Products Catalog
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-cyan-400 transition-colors">
                Shopping Cart
              </Link>
            </li>
            <li>
              <Link to="/checkout" className="hover:text-cyan-400 transition-colors">
                Checkout & Manual Payment
              </Link>
            </li>
            <li>
              <Link to="/admin-login" className="hover:text-cyan-400 transition-colors">
                Admin Portal Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Accepted Payments & Support */}
        <div>
          <h4 className="font-extrabold text-sm text-slate-100 uppercase tracking-wider mb-4 border-l-2 border-purple-500 pl-2">
            Accepted Payments
          </h4>
          <p className="mb-3 text-slate-400">Manual payment instructions provided at checkout:</p>
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 font-extrabold text-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              FastPay
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 font-extrabold text-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Korek
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 font-extrabold text-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              MasterCard
            </span>
          </div>

          <h5 className="font-bold text-xs text-slate-200 mb-2">Connect With Us</h5>
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30 transition-all font-bold text-xs flex items-center gap-1"
            >
              <span>WhatsApp</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600/30 transition-all font-bold text-xs flex items-center gap-1"
            >
              <span>Discord</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-900 bg-slate-950 py-4 px-4 text-center text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Dano Store. All rights reserved.</span>
          <span className="flex items-center gap-1 text-slate-400">
            Crafted for Gamers in Kurdistan & Iraq
          </span>
        </div>
      </div>
    </footer>
  );
};
