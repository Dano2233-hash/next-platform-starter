import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, MessageCircle, Send, Check } from 'lucide-react';
import { PAYMENT_METHODS } from '../data/categories';

export function Footer() {
  return (
    <footer className="bg-[#03050b] border-t border-slate-800/80 text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5">
                <div className="w-full h-full bg-[#070b19] rounded-[10px] flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                DANO STORE
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Kurdistan and Iraq’s trusted digital gaming marketplace. Instant delivery for game top-ups, Steam codes, console subscriptions, and digital gift cards.
            </p>
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold bg-cyan-950/40 border border-cyan-800/40 p-2.5 rounded-xl">
              <Zap className="w-4 h-4 shrink-0 text-cyan-400" />
              <span>Instant Digital Code Delivery via WhatsApp & Discord</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4 border-l-2 border-cyan-500 pl-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">
                  Mobile Top-Ups (PUBG, Free Fire, Valorant)
                </Link>
              </li>
              <li>
                <Link to="/products?category=games" className="hover:text-cyan-400 transition-colors">
                  Paid PC & Console Games
                </Link>
              </li>
              <li>
                <Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">
                  Steam & Console Gift Cards
                </Link>
              </li>
              <li>
                <Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">
                  Subscriptions (Discord Nitro, YouTube, Netflix)
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-cyan-400 transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Accepted Payments */}
          <div>
            <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4 border-l-2 border-purple-500 pl-2">
              Accepted Payments
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              We accept manual transfers for instant order processing across Iraq:
            </p>
            <div className="space-y-2">
              {PAYMENT_METHODS.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-xs"
                >
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${method.badgeColor}`} />
                  <div>
                    <span className="font-bold text-slate-200 block">{method.name}</span>
                    <span className="text-[10px] text-slate-500">{method.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div>
            <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
              Customer Support
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Have questions or need assistance completing your order? Contact us directly:
            </p>
            <div className="space-y-2">
              <a
                href="https://wa.me/9647500000000"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 hover:bg-emerald-900/60 font-semibold text-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Support
              </a>
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-indigo-950/60 text-indigo-400 border border-indigo-800/60 hover:bg-indigo-900/60 font-semibold text-xs transition-colors"
              >
                <Send className="w-4 h-4" /> Discord Server
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Kurdistan / Iraq Digital Store.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>100% Legal Digital Codes</span>
            <span>•</span>
            <span>Fast Customer Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
