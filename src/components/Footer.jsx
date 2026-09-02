import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#04070d] border-t border-slate-800/80 text-slate-400 text-xs mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1px]">
                <div className="w-full h-full rounded-[7px] bg-[#090e18] flex items-center justify-center text-cyan-400">
                  <Gamepad2 className="w-5 h-5" />
                </div>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                DANO <span className="text-cyan-400">STORE</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Kurdistan and Iraq's trusted digital gaming store. Instant delivery for games, game top-ups, gift cards, and subscriptions.
            </p>
            <div className="flex items-center gap-2 text-cyan-400 font-semibold pt-1">
              <Shield className="w-4 h-4" />
              <span>100% Legal & Guaranteed</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-3">
              Categories
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=Mobile%20Top-Ups" className="hover:text-cyan-400 transition-colors">
                  Mobile Top-Ups
                </Link>
              </li>
              <li>
                <Link to="/products?category=Paid%20Games" className="hover:text-cyan-400 transition-colors">
                  PC & Console Paid Games
                </Link>
              </li>
              <li>
                <Link to="/products?category=Gift%20Cards" className="hover:text-cyan-400 transition-colors">
                  Gift Cards (Steam, PSN, Xbox)
                </Link>
              </li>
              <li>
                <Link to="/products?category=Subscriptions" className="hover:text-cyan-400 transition-colors">
                  Subscriptions (Nitro, Premium)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-3">
              Accepted Payments
            </h4>
            <p className="text-slate-400 mb-3">
              Manual direct transfer options available across Iraq:
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-semibold text-[11px]">
                FastPay
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-semibold text-[11px]">
                Korek Cash
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-semibold text-[11px]">
                MasterCard
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Currency: <strong className="text-slate-200">IQD Only</strong>
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-3">
              Store Support
            </h4>
            <p className="text-slate-400 mb-3">
              Have questions or need order assistance? Contact our team on WhatsApp or Discord.
            </p>
            <Link
              to="/admin-login"
              className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:underline font-semibold"
            >
              <span>Admin Portal Login &rarr;</span>
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <p>&copy; {new Date().getFullYear()} Dano Store. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built for Gamers in Kurdistan & Iraq
          </p>
        </div>
      </div>
    </footer>
  );
}
