import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, MessageSquare, ExternalLink, Lock } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/categories';

export default function Footer() {
  return (
    <footer className="bg-[#03050a] border-t border-slate-900 text-slate-400 text-xs mt-20">
      {/* Service Highlights Bar */}
      <div className="border-b border-slate-800/80 bg-[#060a14] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-800/50 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Instant Delivery</h4>
              <p className="text-[11px] text-slate-400">Fast digital key & recharge code dispatch</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-800/50 flex items-center justify-center text-purple-400 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Genuine</h4>
              <p className="text-[11px] text-slate-400">Direct publisher & distributor sources</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Manual Local Pay</h4>
              <p className="text-[11px] text-slate-400">FastPay, Korek, & Local MasterCard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/50 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">24/7 Support</h4>
              <p className="text-[11px] text-slate-400">Direct Kurdish & Arabic assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1px]">
                <div className="w-full h-full bg-[#070b14] rounded-[7px] flex items-center justify-center">
                  <Gamepad2 className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-base font-black text-white">
                Dano <span className="text-cyan-400">Store</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              The premier destination for video games, digital gift cards, mobile game top-ups, and subscriptions in Kurdistan and Iraq. Fast, reliable, and priced in IQD.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-emerald-950 border border-slate-800 hover:border-emerald-600 text-slate-300 hover:text-emerald-400 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <span>WhatsApp</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={SOCIAL_LINKS.discord}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-indigo-950 border border-slate-800 hover:border-indigo-600 text-slate-300 hover:text-indigo-400 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <span>Discord</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-pink-950 border border-slate-800 hover:border-pink-600 text-slate-300 hover:text-pink-400 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <span>TikTok</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h5 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Categories</h5>
            <ul className="space-y-2">
              <li><Link to="/products?category=games" className="hover:text-cyan-400 transition">PC & Console Games</Link></li>
              <li><Link to="/products?category=mobile-topups" className="hover:text-cyan-400 transition">Mobile Top-Ups (UC, VP, etc)</Link></li>
              <li><Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition">Digital Gift Cards</Link></li>
              <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition">Premium Subscriptions</Link></li>
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h5 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Platforms</h5>
            <ul className="space-y-2">
              <li><Link to="/products?platform=PC" className="hover:text-cyan-400 transition">Steam & PC Games</Link></li>
              <li><Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition">PlayStation 4 & 5</Link></li>
              <li><Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition">Xbox Series X|S</Link></li>
              <li><Link to="/products?platform=Mobile" className="hover:text-cyan-400 transition">iOS & Android</Link></li>
            </ul>
          </div>

          {/* Supported Manual Payments */}
          <div>
            <h5 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Manual Payment</h5>
            <p className="text-[11px] text-slate-400 mb-3">Only manual local Iraqi methods accepted:</p>
            <div className="space-y-1.5">
              <div className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold flex items-center justify-between">
                <span>FastPay</span>
                <span className="text-[10px] text-rose-400 font-bold">Fast</span>
              </div>
              <div className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold flex items-center justify-between">
                <span>Korek Telecom</span>
                <span className="text-[10px] text-blue-400 font-bold">Balance</span>
              </div>
              <div className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold flex items-center justify-between">
                <span>MasterCard (Local)</span>
                <span className="text-[10px] text-amber-400 font-bold">FIB / Direct</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Gaming Store for Kurdistan & Iraq.</p>
          <div className="flex items-center gap-4">
            <Link to="/admin" className="hover:text-cyan-400 transition">Admin Portal</Link>
            <span>•</span>
            <span className="text-slate-400">Pricing in IQD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
