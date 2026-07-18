import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MessageSquare, Flame, HelpCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative mt-24 bg-[#030303] border-t border-blue-500/10 text-gray-400">
      {/* Background radial highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand block */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1.5px]">
                <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-[#030303]">
                  <span className="text-sm font-black tracking-tight text-white">D</span>
                </div>
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Dano<span className="text-cyan-400"> Store</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              The premier digital gaming store in Kurdistan and Iraq. Get game keys, top-ups, gift cards, and premium accounts instantly and securely.
            </p>
            <div className="flex gap-4 text-xs text-cyan-400 font-semibold pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                100% Legal Services
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4 text-blue-400" />
                Live Kurdish Support
              </span>
            </div>
          </div>

          {/* Quick categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Products</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products?category=games" className="hover:text-cyan-400 transition">Paid Base Games</Link>
              </li>
              <li>
                <Link to="/products?category=mobile" className="hover:text-cyan-400 transition">Mobile Top-Ups</Link>
              </li>
              <li>
                <Link to="/products?category=giftcards" className="hover:text-cyan-400 transition">Gift Cards</Link>
              </li>
              <li>
                <Link to="/products?category=subscriptions" className="hover:text-cyan-400 transition">Subscriptions</Link>
              </li>
            </ul>
          </div>

          {/* Quick platforms */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Platforms</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products?platform=PC" className="hover:text-cyan-400 transition">PC Gaming</Link>
              </li>
              <li>
                <Link to="/products?platform=PlayStation" className="hover:text-cyan-400 transition">PlayStation</Link>
              </li>
              <li>
                <Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition">Xbox Series X|S</Link>
              </li>
              <li>
                <Link to="/products?platform=Mobile" className="hover:text-cyan-400 transition">Mobile Gaming</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Payments info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Payment & Support</h3>
            <p className="text-sm text-gray-400">
              We process payments manually. Pay easily with fast digital methods in Kurdistan/Iraq.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2 py-1 text-[11px] font-bold rounded bg-cyan-950/40 text-cyan-400 border border-cyan-800/30">FastPay</span>
              <span className="px-2 py-1 text-[11px] font-bold rounded bg-purple-950/40 text-purple-400 border border-purple-800/30">Korek Pay</span>
              <span className="px-2 py-1 text-[11px] font-bold rounded bg-blue-950/40 text-blue-400 border border-blue-800/30">MasterCard</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-blue-500/10" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Dano Store. Developed with pride in Kurdistan. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/admin" className="hover:text-white transition">Admin Portal</Link>
            <span className="text-gray-600">|</span>
            <span className="text-gray-500 font-semibold">Solo Currency: IQD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
