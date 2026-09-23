import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, CreditCard, MessageCircle, Gamepad2, Heart, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#03050a] border-t border-slate-800 text-slate-400 mt-20">
      {/* Top Value Props Banner */}
      <div className="border-b border-slate-800/80 bg-[#050812]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Instant Digital Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">Automated codes & direct top-up to your player ID</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Kurdistan Local Payments</h4>
              <p className="text-xs text-slate-400 mt-0.5">Pay via FastPay, Korek Telecom & MasterCard</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">100% Legal & Safe</h4>
              <p className="text-xs text-slate-400 mt-0.5">Official digital codes & official publisher channels</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-[1.5px]">
                <div className="w-full h-full bg-[#05070f] rounded-[10.5px] flex items-center justify-center">
                  <span className="font-black text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    D
                  </span>
                </div>
              </div>
              <span className="font-extrabold text-xl text-white">Dano Store</span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              The leading gaming digital store in Kurdistan and Iraq. We offer game keys, mobile top-ups, gift cards, and premium subscriptions with local payment methods.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Supported Payments:</span>
              <div className="flex gap-1.5">
                <span className="text-[10px] bg-slate-800 text-amber-400 border border-amber-500/30 font-bold px-2 py-0.5 rounded">FastPay</span>
                <span className="text-[10px] bg-slate-800 text-sky-400 border border-sky-500/30 font-bold px-2 py-0.5 rounded">Korek</span>
                <span className="text-[10px] bg-slate-800 text-purple-400 border border-purple-500/30 font-bold px-2 py-0.5 rounded">MasterCard</span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-l-2 border-cyan-400 pl-2">
              Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/products?category=mobile-topups" className="hover:text-cyan-400 transition-colors">Mobile Top-Ups</Link></li>
              <li><Link to="/products?category=paid-games" className="hover:text-cyan-400 transition-colors">Paid PC Games</Link></li>
              <li><Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">Gift Cards</Link></li>
              <li><Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Subscriptions</Link></li>
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-l-2 border-purple-400 pl-2">
              Platforms
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/products?platform=PC" className="hover:text-purple-400 transition-colors">PC Gaming</Link></li>
              <li><Link to="/products?platform=PlayStation" className="hover:text-purple-400 transition-colors">PlayStation 4/5</Link></li>
              <li><Link to="/products?platform=Xbox" className="hover:text-purple-400 transition-colors">Xbox Series X|S</Link></li>
              <li><Link to="/products?platform=Mobile" className="hover:text-purple-400 transition-colors">Mobile Gaming</Link></li>
            </ul>
          </div>

          {/* Support & Admin */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-l-2 border-blue-400 pl-2">
              Customer Support
            </h4>
            <div className="space-y-3 text-xs">
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 font-semibold hover:bg-emerald-900/40 transition-all w-full"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Support</span>
              </a>
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-purple-300 font-semibold hover:bg-slate-800 transition-all w-full"
              >
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span>Admin Login</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Kurdistan / Iraq Gaming Hub</span>
            <span>•</span>
            <span className="text-cyan-400 font-medium">IQD Currency Only</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
