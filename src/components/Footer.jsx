import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, HeartHandshake, Phone, Send, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#04060d] border-t border-slate-800 text-slate-400 text-sm mt-20">
      {/* Trust & Guarantee Strip */}
      <div className="border-b border-slate-800/80 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Instant Digital Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">Codes and top-ups processed rapidly upon payment verification.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Genuine Digital Keys</h4>
              <p className="text-xs text-slate-400 mt-0.5">Official licenses and direct player ID recharges with full warranty.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Local Kurdistan & Iraq Support</h4>
              <p className="text-xs text-slate-400 mt-0.5">Direct friendly assistance via WhatsApp, Discord, and TikTok.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-[1px]">
                <div className="w-full h-full bg-[#05070f] rounded-[11px] flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="text-lg font-extrabold tracking-tight text-white font-mono">
                DANO <span className="text-cyan-400">STORE</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              Leading digital gaming and subscription hub in Kurdistan and Iraq. Top up favorite games, buy official keys, and unlock premium services in IQD.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://wa.me/9647500000000"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
                title="WhatsApp Support"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-indigo-400 hover:border-indigo-500/50 transition-colors"
                title="Discord Community"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-rose-400 hover:border-rose-500/50 transition-colors"
                title="TikTok"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-4">Categories</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/products?category=top-ups" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups</Link></li>
              <li><Link to="/products?category=games" className="hover:text-cyan-400 transition-colors">PC & Console Games</Link></li>
              <li><Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">Digital Gift Cards</Link></li>
              <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Digital Subscriptions</Link></li>
              <li><Link to="/products" className="hover:text-cyan-400 transition-colors">All Products</Link></li>
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-4">Platforms</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/products?platform=PC" className="hover:text-cyan-400 transition-colors">Steam & PC Games</Link></li>
              <li><Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">PlayStation Network (PSN)</Link></li>
              <li><Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">Xbox Store</Link></li>
              <li><Link to="/products?platform=Mobile" className="hover:text-cyan-400 transition-colors">iOS & Android</Link></li>
              <li><Link to="/products?platform=Gift Card" className="hover:text-cyan-400 transition-colors">Prepaid Vouchers</Link></li>
            </ul>
          </div>

          {/* Payment Methods Info */}
          <div>
            <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-4">Accepted Payments</h5>
            <p className="text-xs text-slate-400 mb-3">
              We exclusively accept manual transfers with verified local payment methods in Iraq:
            </p>
            <div className="flex flex-wrap gap-2">
              <div className="px-2.5 py-1 rounded bg-slate-900 border border-emerald-500/30 text-[11px] font-semibold text-emerald-400">
                FastPay
              </div>
              <div className="px-2.5 py-1 rounded bg-slate-900 border border-amber-500/30 text-[11px] font-semibold text-amber-400">
                Korek
              </div>
              <div className="px-2.5 py-1 rounded bg-slate-900 border border-rose-500/30 text-[11px] font-semibold text-rose-400">
                MasterCard
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-3">
              No online card deduction. You transfer directly and contact us for approval.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Built for Iraqi & Kurdish Gamers.</p>
          <div className="flex items-center gap-4">
            <Link to="/admin-login" className="hover:text-slate-400">Admin Portal</Link>
            <span>•</span>
            <span>Currency: IQD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
