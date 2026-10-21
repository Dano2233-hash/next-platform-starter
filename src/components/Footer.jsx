import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Heart, MessageCircle, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#03050a] border-t border-slate-800/80 text-slate-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-black text-xl text-white">
                Dano <span className="text-cyan-400">Store</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Kurdistan & Iraq's leading digital gaming store. Instant delivery for game top-ups, activation keys, gift cards, and premium subscriptions.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Guaranteed & Official Codes</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800/80 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home Store</Link></li>
              <li><Link to="/products" className="hover:text-cyan-400 transition-colors">All Products</Link></li>
              <li><Link to="/products?category=mobile" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups</Link></li>
              <li><Link to="/products?category=games" className="hover:text-cyan-400 transition-colors">PC & Console Games</Link></li>
              <li><Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">Digital Gift Cards</Link></li>
              <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Subscriptions</Link></li>
            </ul>
          </div>

          {/* Supported Platforms */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800/80 pb-2">
              Platforms
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/products?platform=PC" className="hover:text-cyan-400 transition-colors">PC Gaming (Steam / Epic / Riot)</Link></li>
              <li><Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition-colors">PlayStation PSN</Link></li>
              <li><Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">Xbox Series X|S & One</Link></li>
              <li><Link to="/products?platform=Mobile" className="hover:text-cyan-400 transition-colors">iOS & Android Mobile</Link></li>
              <li><Link to="/admin-login" className="hover:text-purple-400 transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Payment & Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800/80 pb-2">
              Accepted Payments
            </h4>
            <p className="text-xs text-slate-400">
              Manual payments accepted in <span className="text-cyan-400 font-bold">IQD</span> only:
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-200">
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700">FastPay</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700">Korek Cash</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700">MasterCard</span>
            </div>

            <div className="pt-2">
              <span className="text-xs font-bold text-white block mb-2">Customer Support</span>
              <div className="flex items-center gap-2">
                <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-700/60 text-emerald-400 hover:bg-emerald-900/60 transition-colors text-xs font-bold flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <a href="https://discord.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-indigo-950/60 border border-indigo-700/60 text-indigo-400 hover:bg-indigo-900/60 transition-colors text-xs font-bold flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5" />
                  <span>Discord</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built for gamers in <span className="text-slate-300 font-semibold">Kurdistan & Iraq</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
