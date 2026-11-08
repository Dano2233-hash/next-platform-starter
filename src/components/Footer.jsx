import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Heart, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#04060d] border-t border-slate-800/80 text-slate-400 text-sm mt-16">
      {/* Trust & Guarantee Banner */}
      <div className="border-b border-slate-800/60 py-8 bg-gradient-to-b from-[#080d1e] to-[#04060d]">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-2.5 rounded-lg bg-cyan-950/70 border border-cyan-800/60 text-cyan-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200">100% Genuine Digital Keys</h4>
              <p className="text-xs text-slate-400">Official publisher keys & direct top-ups.</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-2.5 rounded-lg bg-blue-950/70 border border-blue-800/60 text-blue-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200">Instant Local Processing</h4>
              <p className="text-xs text-slate-400">FastPay, Korek & MasterCard in Kurdistan/Iraq.</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-2.5 rounded-lg bg-purple-950/70 border border-purple-800/60 text-purple-400">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200">Dedicated Support 24/7</h4>
              <p className="text-xs text-slate-400">Instant assistance on WhatsApp & Discord.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer links */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 p-0.5">
                <div className="w-full h-full bg-[#080d1e] rounded-md flex items-center justify-center">
                  <Gamepad2 className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-extrabold text-lg text-white font-mono">
                DANO <span className="text-cyan-400">STORE</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dano Store is Kurdistan and Iraq's premier digital gaming marketplace. We deliver official game top-ups, paid Steam/console games, gift cards, and premium subscriptions with zero hassle.
            </p>
            <div className="pt-2 flex items-center gap-2">
              <span className="text-xs text-slate-400">Accepted Currencies:</span>
              <span className="text-xs font-bold text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                IQD Only
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-200 font-bold mb-3 text-sm uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/products?category=mobile-top-ups" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups (PUBG, Free Fire)</Link></li>
              <li><Link to="/products?category=paid-games" className="hover:text-cyan-400 transition-colors">Paid PC & Console Games</Link></li>
              <li><Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">Gift Cards (Steam, PSN, Xbox)</Link></li>
              <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Digital Subscriptions (Nitro, YouTube)</Link></li>
              <li><Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">Xbox Store</Link></li>
              <li><Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">PlayStation Store</Link></li>
            </ul>
          </div>

          {/* Payment & Security */}
          <div>
            <h4 className="text-slate-200 font-bold mb-3 text-sm uppercase tracking-wider">Payment Methods</h4>
            <p className="text-xs text-slate-400 mb-3">
              We exclusively support trusted Iraqi payment channels:
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span>FastPay Wallet</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <span>Korek Telecom</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-400" />
                <span>MasterCard</span>
              </div>
            </div>
          </div>

          {/* Social Channels */}
          <div>
            <h4 className="text-slate-200 font-bold mb-3 text-sm uppercase tracking-wider">Direct Customer Support</h4>
            <p className="text-xs text-slate-400 mb-3">
              Reach out directly on our official channels to complete payment verification:
            </p>
            <div className="space-y-2">
              <a
                href="https://wa.me/9647500000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-800/40 text-emerald-300 text-xs font-semibold transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: +964 750 000 0000</span>
              </a>
              <a
                href="https://discord.gg/danostore"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-950/40 hover:bg-indigo-900/40 border border-indigo-800/40 text-indigo-300 text-xs font-semibold transition-all"
              >
                <Send className="w-4 h-4 text-indigo-400" />
                <span>Discord: discord.gg/danostore</span>
              </a>
              <a
                href="https://tiktok.com/@danostore"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-pink-950/40 hover:bg-pink-900/40 border border-pink-800/40 text-pink-300 text-xs font-semibold transition-all"
              >
                <span className="font-bold">♪</span>
                <span>TikTok: @danostore</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Kurdistan / Iraq.</p>
          <div className="flex items-center gap-4">
            <Link to="/products" className="hover:text-slate-400">All Products</Link>
            <span>•</span>
            <Link to="/admin-login" className="hover:text-slate-400">Staff Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
