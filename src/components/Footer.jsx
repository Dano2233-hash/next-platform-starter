import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, Headphones, MessageSquare, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#03050b] border-t border-slate-800/80 text-slate-400 text-xs">
      {/* Features Ribbon */}
      <div className="border-b border-slate-800/60 py-6 bg-slate-950/40">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <Zap className="w-6 h-6 text-cyan-400 shrink-0" />
            <div>
              <h5 className="font-bold text-slate-200">Instant Delivery</h5>
              <p className="text-[11px] text-slate-400">Automated digital code processing</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <ShieldCheck className="w-6 h-6 text-blue-400 shrink-0" />
            <div>
              <h5 className="font-bold text-slate-200">100% Legal & Safe</h5>
              <p className="text-[11px] text-slate-400">Official publisher channels</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <Headphones className="w-6 h-6 text-purple-400 shrink-0" />
            <div>
              <h5 className="font-bold text-slate-200">Local Payment</h5>
              <p className="text-[11px] text-slate-400">FastPay, Korek & MasterCard</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <MessageSquare className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <h5 className="font-bold text-slate-200">24/7 Support</h5>
              <p className="text-[11px] text-slate-400">WhatsApp & Live Assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white">
                <Gamepad2 className="w-4 h-4" />
              </div>
              <span className="text-lg font-black text-white">
                DANO<span className="text-cyan-400 ml-1">STORE</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-sm mb-4">
              Kurdistan and Iraq’s trusted destination for digital gaming cards, game top-ups, paid Steam codes, and premium subscriptions. Fast manual payment verification via FastPay, Korek & MasterCard.
            </p>
            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>Currency: <strong>IQD Only</strong></span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-bold text-slate-200 uppercase tracking-wider mb-3 text-xs">
              Categories
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">
                  Mobile Top-Ups
                </Link>
              </li>
              <li>
                <Link to="/products?category=pc" className="hover:text-cyan-400 transition-colors">
                  PC Games & VP
                </Link>
              </li>
              <li>
                <Link to="/products?category=xbox" className="hover:text-cyan-400 transition-colors">
                  Xbox Digital Keys
                </Link>
              </li>
              <li>
                <Link to="/products?category=playstation" className="hover:text-cyan-400 transition-colors">
                  PlayStation Cards
                </Link>
              </li>
              <li>
                <Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">
                  Gift Cards Store
                </Link>
              </li>
              <li>
                <Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">
                  Subscriptions
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Items */}
          <div>
            <h4 className="font-bold text-slate-200 uppercase tracking-wider mb-3 text-xs">
              Popular Top-Ups
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products/pubg-mobile-uc" className="hover:text-cyan-400 transition-colors">
                  PUBG Mobile UC
                </Link>
              </li>
              <li>
                <Link to="/products/free-fire-diamonds" className="hover:text-cyan-400 transition-colors">
                  Free Fire Diamonds
                </Link>
              </li>
              <li>
                <Link to="/products/steam-wallet-card" className="hover:text-cyan-400 transition-colors">
                  Steam Wallet Cards
                </Link>
              </li>
              <li>
                <Link to="/products/discord-nitro" className="hover:text-cyan-400 transition-colors">
                  Discord Nitro
                </Link>
              </li>
              <li>
                <Link to="/products/gta-v" className="hover:text-cyan-400 transition-colors">
                  GTA V PC Steam
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Admin */}
          <div>
            <h4 className="font-bold text-slate-200 uppercase tracking-wider mb-3 text-xs">
              Store Support
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/cart" className="hover:text-cyan-400 transition-colors">
                  My Shopping Cart
                </Link>
              </li>
              <li>
                <a href="https://wa.me/" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
                  WhatsApp Support
                </a>
              </li>
              <li>
                <a href="https://discord.gg/" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
                  Community Discord
                </a>
              </li>
              <li className="pt-2 border-t border-slate-800">
                <Link to="/admin-login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                  Admin Portal Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-900 py-4 bg-slate-950 text-slate-400 text-[11px]">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Dano Store. All Rights Reserved. Kurdistan & Iraq Digital Gaming Store.</p>
          <div className="flex items-center gap-4">
            <span>FastPay</span>
            <span>•</span>
            <span>Korek</span>
            <span>•</span>
            <span>MasterCard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
