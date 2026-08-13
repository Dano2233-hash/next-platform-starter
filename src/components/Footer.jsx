import React from 'react';
import { Link } from 'react-router-dom';
import { Send, Flame, Gift, ShieldAlert, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#151522] bg-[#030306] text-gray-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand Info */}
          <div className="space-y-4">
            <span className="text-xl font-black uppercase tracking-wider text-white">
              DANO <span className="text-[#00e5ff]">STORE</span>
            </span>
            <p className="text-xs leading-relaxed text-gray-500">
              The premier digital gaming gateway in Kurdistan and Iraq. We deliver gaming keys, digital top-ups, subcodes, and legal memberships instantly with maximum manual payment security.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/9647500000000"
                target="_blank"
                rel="noreferrer"
                className="rounded-md bg-[#25D366]/10 p-2 text-[#25D366] hover:bg-[#25D366]/20 transition"
                title="WhatsApp Support"
              >
                WhatsApp
              </a>
              <a
                href="https://discord.gg/danostore"
                target="_blank"
                rel="noreferrer"
                className="rounded-md bg-[#5865F2]/10 p-2 text-[#5865F2] hover:bg-[#5865F2]/20 transition"
                title="Discord Community"
              >
                Discord
              </a>
              <a
                href="https://tiktok.com/@danostore"
                target="_blank"
                rel="noreferrer"
                className="rounded-md bg-white/5 p-2 text-white hover:bg-white/10 transition"
                title="TikTok channel"
              >
                TikTok
              </a>
            </div>
          </div>

          {/* Quick categories */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Store Sections</h3>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <Link to="/products?category=mobile" className="hover:text-[#00e5ff] transition">Mobile Top-Ups</Link>
              </li>
              <li>
                <Link to="/products?category=giftcards" className="hover:text-[#00e5ff] transition">Digital Gift Cards</Link>
              </li>
              <li>
                <Link to="/products?category=subscriptions" className="hover:text-[#00e5ff] transition">Premium Subscriptions</Link>
              </li>
              <li>
                <Link to="/products?platform=PC" className="hover:text-[#00e5ff] transition">PC Gaming Keys</Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Legal & Help</h3>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <span className="text-gray-500">Manual payment verified inside Kurdistan</span>
              </li>
              <li>
                <span className="text-gray-500">FastPay, Korek, and MasterCard accepted</span>
              </li>
              <li>
                <Link to="/admin-login" className="hover:text-[#7000ff] transition">Merchant Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Safe Gaming Store</h3>
            <p className="mt-4 text-xs leading-relaxed text-gray-500">
              No automated bots. Our support agents verify manual receipt payments via official Kurdistan telecom networks & local payment networks.
            </p>
            <p className="mt-2 text-xs font-semibold text-white">
              Erbil / Sulaymaniyah / Duhok, Iraq
            </p>
          </div>

        </div>

        <div className="mt-12 border-t border-[#12121e] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Dano Store. Built with pride for gaming communities in Kurdistan & Iraq.
          </p>
          <div className="flex items-center gap-1 text-[10px] text-gray-600">
            <span>Crafted securely with</span>
            <Heart size={10} className="text-red-500 fill-red-500" />
            <span>and clean React architecture.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
