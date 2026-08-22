import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Zap, MessageSquare, PhoneCall, Heart } from 'lucide-react';
import { PAYMENT_METHODS } from '../data/categories';

export const Footer = () => {
  return (
    <footer className="bg-[#040711] border-t border-slate-800/80 text-slate-400 text-sm mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 p-[2px] shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-[#090d1a] rounded-[10px] flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white font-heading">
                DANO <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">STORE</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              The leading digital gaming store serving Kurdistan and Iraq with official game top-ups, gift cards, PC/Console games, and legal subscriptions.
            </p>
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold bg-cyan-950/40 border border-cyan-500/20 rounded-lg p-2 w-fit">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Instant Digital Code Delivery</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4 font-heading text-base">Quick Links</h3>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><Link to="/products?platform=Mobile" className="hover:text-cyan-400 transition-colors">Mobile Game Top-Ups</Link></li>
              <li><Link to="/products?platform=PC" className="hover:text-cyan-400 transition-colors">PC Games &amp; Steam Keys</Link></li>
              <li><Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">Xbox Games &amp; Cards</Link></li>
              <li><Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">PlayStation Network (PSN)</Link></li>
              <li><Link to="/products?category=giftcards" className="hover:text-cyan-400 transition-colors">Gift Cards</Link></li>
              <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Subscriptions &amp; Services</Link></li>
            </ul>
          </div>

          {/* Accepted Payment Methods */}
          <div>
            <h3 className="text-white font-bold mb-4 font-heading text-base">Accepted Payments</h3>
            <p className="text-xs text-slate-400 mb-3">
              We exclusively support manual Iraqi &amp; Kurdish local payment gateways:
            </p>
            <div className="space-y-2">
              {PAYMENT_METHODS.map((pm) => (
                <div
                  key={pm.id}
                  className="p-2 bg-[#080e22] border border-slate-800 rounded-lg flex items-center justify-between"
                >
                  <span className="text-xs font-bold text-slate-200">{pm.name}</span>
                  <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/20">
                    IQD Manual
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-white font-bold mb-4 font-heading text-base">Customer Support</h3>
            <p className="text-xs text-slate-400 mb-4">
              Need help with your top-up or order? Contact our support team directly on social channels:
            </p>
            <div className="space-y-2.5">
              <a
                href="https://wa.me/9647500000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-xs font-bold text-emerald-300 hover:bg-emerald-900/50 transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>WhatsApp Customer Support</span>
              </a>
              <a
                href="https://discord.gg/danostore"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-indigo-950/40 border border-indigo-500/30 rounded-lg text-xs font-bold text-indigo-300 hover:bg-indigo-900/50 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Join Discord Community</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved. Target Region: Kurdistan &amp; Iraq.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Currency: <strong className="text-cyan-400">IQD Only</strong></span>
            <Link to="/admin-login" className="hover:text-cyan-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Gateway</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
