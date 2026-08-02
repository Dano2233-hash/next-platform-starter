import React from 'react';
import { Gamepad2, Heart, ShieldCheck, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#030307] border-t border-white/5 pt-16 pb-8 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Col 1: Brand details */}
          <div className="space-y-4">
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-black uppercase tracking-wider text-white">
                Dano Store
              </span>
            </a>
            <p className="text-sm leading-relaxed text-gray-400">
              The premier digital gaming store for players in Kurdistan and Iraq. Fast digital delivery of keys, top-ups, subscriptions, and gift cards with trusted manual payments.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Secure & Legal Digital Services</span>
            </div>
          </div>

          {/* Col 2: Useful categories */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Quick Categories</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/products?category=mobile" className="hover:text-cyan-400 transition-colors">Mobile Game Top-Ups</a>
              </li>
              <li>
                <a href="/products?category=gift-cards" className="hover:text-cyan-400 transition-colors">Digital Gift Cards</a>
              </li>
              <li>
                <a href="/products?category=subscriptions" className="hover:text-cyan-400 transition-colors">Premium Subscriptions</a>
              </li>
              <li>
                <a href="/products?platform=PC" className="hover:text-cyan-400 transition-colors">PC Game Keys</a>
              </li>
              <li>
                <a href="/products?platform=Xbox" className="hover:text-cyan-400 transition-colors">Xbox Store Keys</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Support */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Manual Payment</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                FastPay Wallet Transfer
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Korek Telecom Balance
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                MasterCard (Manual)
              </li>
              <li className="text-xs text-gray-500 italic mt-2">
                * Real-time online gateways are excluded. Secure manual verification only.
              </li>
            </ul>
          </div>

          {/* Col 4: Reach Us */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-1">Contact Us</h3>
            <p className="text-sm">For payment verification and support, contact us through our official social media channels.</p>
            <div className="flex flex-col gap-2.5 text-sm">
              <a href="https://wa.me/9647500000000" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-all">
                <span className="font-bold">WhatsApp:</span> +964 750 000 0000 <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="flex items-center gap-2 text-purple-400">
                <span className="font-bold">Discord:</span> DanoStore#0001
              </span>
              <span className="flex items-center gap-2 text-pink-400">
                <span className="font-bold">TikTok:</span> @danostore.net
              </span>
            </div>
          </div>

        </div>

        {/* Footer Bottom copyright and heart line */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            &copy; {new Date().getFullYear()} <span className="text-gray-300 font-semibold">Dano Store</span>. All Rights Reserved.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for Gamers in Kurdistan & Iraq</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
