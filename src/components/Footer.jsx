import React from 'react'
import { Link } from 'react-router-dom'
import { Gamepad2, ShieldCheck, Zap, Headphones, MessageSquare, Send } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#030407] border-t border-slate-800/80 text-slate-400 text-xs">
      {/* Features Bar */}
      <div className="border-b border-slate-800/60 py-8 bg-[#050711]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Instant Digital Delivery</h4>
              <p className="text-slate-400 text-xs">Receive codes and top-ups within minutes of payment confirmation.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">100% Legal & Official</h4>
              <p className="text-slate-400 text-xs">Direct partnerships and legitimate regional game licenses.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">24/7 Local Support</h4>
              <p className="text-slate-400 text-xs">Dedicated team in Kurdistan & Iraq via WhatsApp & Discord.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Col 1: Brand */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5">
              <div className="w-full h-full bg-[#070b14] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="text-lg font-extrabold text-white">
              Dano <span className="text-cyan-400">Store</span>
            </span>
          </Link>
          <p className="text-slate-400 leading-relaxed">
            The premier digital gaming hub in Kurdistan & Iraq for PC & Console games, mobile top-ups (PUBG UC, Free Fire, VP), gift cards, and premium subscriptions.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://wa.me/9647500000000"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
              title="WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
            <a
              href="https://discord.gg/danostore"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors"
              title="Discord"
            >
              <Send className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2: Categories */}
        <div>
          <h4 className="font-bold text-slate-200 text-sm mb-4">Popular Categories</h4>
          <ul className="space-y-2.5">
            <li><Link to="/products?category=Mobile%20Top-Ups" className="hover:text-cyan-400 transition-colors">Mobile Game Top-Ups</Link></li>
            <li><Link to="/products?category=Games" className="hover:text-cyan-400 transition-colors">PC & Console Games</Link></li>
            <li><Link to="/products?category=Gift%20Cards" className="hover:text-cyan-400 transition-colors">Steam & Console Gift Cards</Link></li>
            <li><Link to="/products?category=Subscriptions" className="hover:text-cyan-400 transition-colors">Discord Nitro & Subscriptions</Link></li>
            <li><Link to="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">Xbox Store Digital Codes</Link></li>
          </ul>
        </div>

        {/* Col 3: Navigation */}
        <div>
          <h4 className="font-bold text-slate-200 text-sm mb-4">Quick Navigation</h4>
          <ul className="space-y-2.5">
            <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home Page</Link></li>
            <li><Link to="/products" className="hover:text-cyan-400 transition-colors">All Store Products</Link></li>
            <li><Link to="/cart" className="hover:text-cyan-400 transition-colors">View Cart</Link></li>
            <li><Link to="/checkout" className="hover:text-cyan-400 transition-colors">Checkout</Link></li>
            <li><Link to="/admin-login" className="hover:text-cyan-400 transition-colors">Admin Portal</Link></li>
          </ul>
        </div>

        {/* Col 4: Payment Methods */}
        <div>
          <h4 className="font-bold text-slate-200 text-sm mb-4">Supported Payment Methods</h4>
          <p className="text-slate-400 mb-3">
            Manual local payments accepted across all cities in Kurdistan & Iraq:
          </p>
          <div className="space-y-2">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="font-bold text-emerald-400">FastPay</span>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Mobile Wallet</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="font-bold text-amber-400">Korek Telecom</span>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Direct Credit</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="font-bold text-cyan-400">MasterCard / FIB</span>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Bank / Local Card</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800/60 py-6 bg-[#020305]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-slate-500">
            © {new Date().getFullYear()} <span className="text-slate-300 font-semibold">Dano Store</span>. All rights reserved. Designed for Kurdistan & Iraq gamers.
          </p>
          <p className="text-slate-600 text-[11px]">
            Trademarks and game assets belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  )
}
