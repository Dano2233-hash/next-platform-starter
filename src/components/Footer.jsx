import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Zap, PhoneCall, CreditCard, ShieldCheck, MessageCircle, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#03050a] border-t border-slate-800/80 text-slate-400 text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5">
                <div className="w-full h-full bg-[#080d1a] rounded-[10px] flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="text-lg font-extrabold tracking-tight text-white font-mono">
                DANO<span className="text-cyan-400">STORE</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed text-xs">
              Premier digital gaming store in Kurdistan & Iraq. Instant delivery for PUBG UC, Free Fire Diamonds, Steam Wallet, PSN & Xbox cards, PC Games, and subscriptions.
            </p>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Genuine Digital Keys & Top-Ups</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-slate-100 mb-4 uppercase tracking-wider">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/products?category=mobile-topups" className="hover:text-cyan-400 transition-colors">
                  Mobile Game Top-Ups
                </Link>
              </li>
              <li>
                <Link to="/products?category=games" className="hover:text-cyan-400 transition-colors">
                  Steam & PC Paid Games
                </Link>
              </li>
              <li>
                <Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">
                  Console & App Gift Cards
                </Link>
              </li>
              <li>
                <Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">
                  Nitro, Premium & Subscriptions
                </Link>
              </li>
              <li>
                <Link to="/admin-login" className="hover:text-cyan-400 transition-colors text-slate-500">
                  Admin Login Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-sm font-bold text-slate-100 mb-4 uppercase tracking-wider">
              Accepted Payment Methods
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Fast & secure local payment options for Iraq & Kurdistan:
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#090e1f] border border-slate-800 text-slate-200 font-medium">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>FastPay Wallet</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#090e1f] border border-slate-800 text-slate-200 font-medium">
                <PhoneCall className="w-4 h-4 text-blue-400" />
                <span>Korek Cash / Balance</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#090e1f] border border-slate-800 text-slate-200 font-medium">
                <CreditCard className="w-4 h-4 text-purple-400" />
                <span>MasterCard / FIB Card</span>
              </div>
            </div>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-sm font-bold text-slate-100 mb-4 uppercase tracking-wider">
              Need Help?
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Our 24/7 gaming support staff is ready on WhatsApp & Discord to assist with payments and delivery.
            </p>
            <a
              href="https://wa.me/9647500000000"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-600/20 border border-green-500/40 text-green-400 font-bold hover:bg-green-600/30 transition-all text-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contact WhatsApp Support</span>
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Erbil & Sulaymaniyah, Kurdistan Region, Iraq.</p>
          <div className="flex items-center gap-1">
            <span>Built with passion for gamers in</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span className="font-semibold text-slate-400">Kurdistan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
