import React from 'react';
import { ShieldCheck, MessageSquare, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#030304] border-t border-slate-950 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0066ff] to-[#7000ff] flex items-center justify-center border border-blue-400/20">
                <span className="font-black text-white text-base tracking-tighter">DS</span>
              </div>
              <span className="font-black text-xl text-white tracking-tight group-hover:text-[#00e5ff] transition-colors">
                Dano Store
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed mb-6">
              Kurdistan's premier gaming hub. Providing genuine steam keys, game packages, custom subscriptions, and high-speed mobile top-ups securely and fast.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#00e5ff] hover:border-[#00e5ff]/20 transition-all">
                <span className="text-xs font-black">WA</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#00e5ff] hover:border-[#00e5ff]/20 transition-all">
                <span className="text-xs font-black">DC</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#00e5ff] hover:border-[#00e5ff]/20 transition-all">
                <span className="text-xs font-black">TT</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-white mb-5 border-l-2 border-[#0066ff] pl-3">
              Explore Store
            </h4>
            <ul className="space-y-3.5 text-sm text-slate-400 font-semibold">
              <li>
                <Link to="/products?category=games" className="hover:text-[#00e5ff] transition-colors">Paid Games</Link>
              </li>
              <li>
                <Link to="/products?category=top-ups" className="hover:text-[#00e5ff] transition-colors">Mobile Top-Ups</Link>
              </li>
              <li>
                <Link to="/products?category=gift-cards" className="hover:text-[#00e5ff] transition-colors">Gift Cards</Link>
              </li>
              <li>
                <Link to="/products?category=subscriptions" className="hover:text-[#00e5ff] transition-colors">Subscriptions</Link>
              </li>
            </ul>
          </div>

          {/* Trust Info */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-white mb-5 border-l-2 border-[#7000ff] pl-3">
              Secure Delivery
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#00e5ff] shrink-0 mt-0.5" />
                <p className="text-xs text-slate-400 leading-relaxed">
                  <span className="text-slate-200 font-bold block mb-0.5">100% Genuine & Legal</span>
                  All activation keys and subscriptions are officially sourced.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-[#7000ff] shrink-0 mt-0.5" />
                <p className="text-xs text-slate-400 leading-relaxed">
                  <span className="text-slate-200 font-bold block mb-0.5">Contact 24/7 Support</span>
                  Get immediate assistance on WhatsApp or Discord.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-900/60 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-bold">
          <p>© {currentYear} Dano Store. All Rights Reserved. Designed for gamers in Iraq / Kurdistan.</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for Kurdish Gamers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
