import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Shield, Zap, Heart, MessageCircle, Phone, Globe } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#030407] border-t border-slate-800/80 text-slate-400 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800/60">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-[1.5px] shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-[#070a12] rounded-[10px] flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                DANO STORE
              </span>
            </Link>

            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              Kurdistan & Iraq's premier digital gaming marketplace. Instant delivery on PUBG UC, Free Fire Diamonds, Steam Wallet, PSN, Xbox, and PC Games.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/9647500000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 text-xs font-bold hover:bg-emerald-900/50 transition"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-950/60 border border-indigo-800/50 text-indigo-300 text-xs font-bold hover:bg-indigo-900/50 transition"
              >
                <span>Discord</span>
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">
              Popular Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/products?category=mobile" className="hover:text-cyan-400 transition">
                  Mobile Top-Ups
                </Link>
              </li>
              <li>
                <Link to="/products?category=games" className="hover:text-cyan-400 transition">
                  Paid PC Games
                </Link>
              </li>
              <li>
                <Link to="/products?category=giftcards" className="hover:text-cyan-400 transition">
                  Gift Cards
                </Link>
              </li>
              <li>
                <Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition">
                  Subscriptions
                </Link>
              </li>
            </ul>
          </div>

          {/* Platforms */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">
              Platforms
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/products?platform=PC" className="hover:text-cyan-400 transition">
                  PC Gaming
                </Link>
              </li>
              <li>
                <Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition">
                  PlayStation
                </Link>
              </li>
              <li>
                <Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition">
                  Xbox
                </Link>
              </li>
              <li>
                <Link to="/products?platform=Mobile" className="hover:text-cyan-400 transition">
                  Mobile Gaming
                </Link>
              </li>
            </ul>
          </div>

          {/* Supported Payments */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">
              Local Payments
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#080d1a] border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span className="font-semibold text-slate-200">FastPay Wallet</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#080d1a] border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span className="font-semibold text-slate-200">Korek Transfer</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#080d1a] border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span className="font-semibold text-slate-200">MasterCard / FIB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Kurdistan / Iraq.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <Globe className="w-3.5 h-3.5 text-cyan-400" /> English / IQD
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Shield className="w-3.5 h-3.5 text-emerald-400" /> 100% Safe & Instant
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
