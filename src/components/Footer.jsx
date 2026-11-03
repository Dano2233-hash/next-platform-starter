import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, MessageCircle, Send, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#03050a] border-t border-slate-800/80 text-slate-400 text-xs mt-20">
      {/* Value Proposition Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-slate-800/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-3.5 justify-center md:justify-start p-4 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Zap size={20} />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Instant Digital Delivery</h4>
              <p className="text-slate-400 text-xs">Direct recharge & digital keys delivered immediately via WhatsApp or Email.</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 justify-center md:justify-start p-4 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Trusted Kurdish & Iraqi Store</h4>
              <p className="text-slate-400 text-xs">Pay safely in IQD using FastPay, Korek, and MasterCard.</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 justify-center md:justify-start p-4 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <Headphones size={20} />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">24/7 Gaming Support</h4>
              <p className="text-slate-400 text-xs">Direct customer assistance in Kurdish, Arabic, and English.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black">
                <Gamepad2 size={18} />
              </div>
              <span className="text-lg font-bold text-white font-mono">DANO STORE</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Your premier digital gaming destination across Kurdistan and Iraq. Fast, reliable top-ups for PUBG UC, Free Fire, Valorant, paid Steam games, and premium subscriptions.
            </p>
            <div className="pt-2 text-xs text-slate-500">
              Currency: <strong className="text-cyan-400">IQD Only</strong>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h5 className="font-bold text-slate-200 text-sm mb-3">Popular Categories</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">
                  Mobile Top-Ups (PUBG UC, Free Fire)
                </Link>
              </li>
              <li>
                <Link to="/products?platform=PC" className="hover:text-cyan-400 transition-colors">
                  PC Games (Steam Keys & Top-Ups)
                </Link>
              </li>
              <li>
                <Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">
                  PlayStation PSN Cards & Games
                </Link>
              </li>
              <li>
                <Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">
                  Xbox Keys & Game Pass
                </Link>
              </li>
              <li>
                <Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">
                  Discord Nitro & Streaming
                </Link>
              </li>
            </ul>
          </div>

          {/* Supported Payments */}
          <div>
            <h5 className="font-bold text-slate-200 text-sm mb-3">Supported Manual Payments</h5>
            <div className="space-y-2.5">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2 text-slate-300">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0" />
                <span className="font-semibold text-xs">FastPay Iraq</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2 text-slate-300">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-400 shrink-0" />
                <span className="font-semibold text-xs">Korek Telecom (Korek Balance)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2 text-slate-300">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                <span className="font-semibold text-xs">MasterCard / Iraqi Cards</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Orders are confirmed manually via WhatsApp / Discord after placing the order.
            </p>
          </div>

          {/* Support Contacts */}
          <div>
            <h5 className="font-bold text-slate-200 text-sm mb-3">Customer Support</h5>
            <p className="text-xs text-slate-400 mb-3">
              Need help with a key or top-up? Reach out directly:
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="https://wa.me/9647500000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 py-2 px-3 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 font-medium transition-all"
              >
                <MessageCircle size={15} />
                <span>WhatsApp: +964 750 000 0000</span>
              </a>
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 py-2 px-3 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 font-medium transition-all"
              >
                <Send size={15} />
                <span>Discord Community</span>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 py-2 px-3 rounded-lg bg-pink-600/20 hover:bg-pink-600/30 text-pink-400 border border-pink-500/30 font-medium transition-all"
              >
                <Heart size={15} />
                <span>TikTok: @danostore</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 mt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Kurdistan & Iraq.</p>
          <div className="flex items-center gap-4">
            <Link to="/products" className="hover:text-slate-300">Catalog</Link>
            <Link to="/admin-login" className="hover:text-slate-300">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
