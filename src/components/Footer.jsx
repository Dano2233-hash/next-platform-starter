import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#04060d] border-t border-slate-800/80 text-slate-400 text-sm mt-20">
      {/* Trust Badges Bar */}
      <div className="border-b border-slate-800/60 py-8 bg-[#060913]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-cyan-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-slate-100 text-sm">Instant Delivery</h5>
              <p className="text-xs text-slate-400">Digital codes in seconds</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/20 text-blue-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-slate-100 text-sm">100% Genuine</h5>
              <p className="text-xs text-slate-400">Official legal digital keys</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/20 text-purple-400">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-slate-100 text-sm">WhatsApp & Discord</h5>
              <p className="text-xs text-slate-400">Direct active support</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-emerald-400">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-slate-100 text-sm">Local Iraqi Payments</h5>
              <p className="text-xs text-slate-400">FastPay, Korek, MasterCard</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-lg flex items-center justify-center">
                  <Gamepad2 className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-extrabold text-lg text-white">Dano Store</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Your premier digital gaming hub in Kurdistan & Iraq. We specialize in instant game keys, mobile top-ups (UC, Diamonds, Points), digital gift cards, and premium subscriptions with localized payment support.
            </p>

            {/* Accepted Manual Payments */}
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-slate-300 block mb-2 uppercase tracking-wider">
                Accepted Payment Methods:
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 text-xs rounded bg-slate-900 border border-cyan-500/30 text-cyan-300 font-semibold">
                  FastPay
                </span>
                <span className="px-2.5 py-1 text-xs rounded bg-slate-900 border border-blue-500/30 text-blue-300 font-semibold">
                  Korek
                </span>
                <span className="px-2.5 py-1 text-xs rounded bg-slate-900 border border-purple-500/30 text-purple-300 font-semibold">
                  MasterCard
                </span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-bold text-slate-100 text-sm mb-3">Categories</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/products?category=games" className="hover:text-cyan-400 transition-colors">PC & Console Games</Link>
              </li>
              <li>
                <Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups (UC & Diamonds)</Link>
              </li>
              <li>
                <Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">Steam & Store Cards</Link>
              </li>
              <li>
                <Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Discord & Streaming</Link>
              </li>
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h4 className="font-bold text-slate-100 text-sm mb-3">Platforms</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/products?platform=PC" className="hover:text-cyan-400 transition-colors">Steam / Epic / Riot (PC)</Link>
              </li>
              <li>
                <Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">PlayStation PS4 / PS5</Link>
              </li>
              <li>
                <Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">Xbox Series X|S / One</Link>
              </li>
              <li>
                <Link to="/products?platform=Mobile" className="hover:text-cyan-400 transition-colors">iOS & Android Mobile</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="font-bold text-slate-100 text-sm mb-3">Support & Admin</h4>
            <ul className="space-y-2 text-xs">
              <li className="text-slate-400">Erbil & Sulaymaniyah, Kurdistan</li>
              <li className="text-slate-400">Baghdad, Iraq</li>
              <li>
                <a href="https://wa.me/9647500000000" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                  WhatsApp Support
                </a>
              </li>
              <li>
                <Link to="/admin-login" className="text-purple-400 hover:text-purple-300 font-medium">
                  Staff / Admin Login
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-800/80 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Prices displayed exclusively in IQD.</p>
          <div className="flex gap-4">
            <span className="text-slate-400">Terms of Service</span>
            <span className="text-slate-400">Privacy Policy</span>
            <span className="text-slate-400">Refund Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
