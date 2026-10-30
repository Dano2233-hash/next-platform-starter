import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#030409] border-t border-slate-800/80 text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1.5px]">
                <div className="w-full h-full bg-[#05070f] rounded-[10px] flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 bg-clip-text text-transparent">
                Dano Store
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Kurdistan & Iraq’s premier digital store for games, game top-ups, gift cards, and subscriptions. Instant delivery, fast support, 100% legal digital keys.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Verified Local Digital Seller</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4 border-l-2 border-cyan-400 pl-2">
              Categories
            </h3>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link to="/products?category=mobile-topups" className="hover:text-cyan-400 transition-colors">
                  Mobile Top-Ups (PUBG UC, Free Fire)
                </Link>
              </li>
              <li>
                <Link to="/products?category=paid-games" className="hover:text-cyan-400 transition-colors">
                  Paid Steam & PC Games
                </Link>
              </li>
              <li>
                <Link to="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">
                  Gift Cards (Steam, PSN, Google Play)
                </Link>
              </li>
              <li>
                <Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">
                  Subscriptions (Discord, YouTube, Netflix)
                </Link>
              </li>
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4 border-l-2 border-purple-500 pl-2">
              Platforms
            </h3>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link to="/products?platform=pc" className="hover:text-cyan-400 transition-colors">
                  PC Games & Top-Ups
                </Link>
              </li>
              <li>
                <Link to="/products?platform=playstation" className="hover:text-cyan-400 transition-colors">
                  PlayStation PSN Store
                </Link>
              </li>
              <li>
                <Link to="/products?platform=xbox" className="hover:text-cyan-400 transition-colors">
                  Xbox & Game Pass
                </Link>
              </li>
              <li>
                <Link to="/products?platform=mobile" className="hover:text-cyan-400 transition-colors">
                  Mobile Games & Apps
                </Link>
              </li>
            </ul>
          </div>

          {/* Accepted Local Payments */}
          <div>
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
              Accepted Payments
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              We accept manual payments in IQD via local payment methods:
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs font-bold text-cyan-400">
                FastPay
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs font-bold text-cyan-400">
                Korek
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs font-bold text-purple-400">
                MasterCard
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Built for Kurdistan & Iraq gamers with</span>
            <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
