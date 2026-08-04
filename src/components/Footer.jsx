import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MessageCircle, RefreshCw, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0c0d12] border-t border-[#1a1e29] mt-20">
      {/* Upper features bar */}
      <div className="max-w-7xl mx-auto px-4 py-8 border-b border-[#1a1e29] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[#0066ff]/10 text-[#0066ff]">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">100% Legal & Secure</h4>
            <p className="text-xs text-gray-400 mt-0.5">Officially licensed keys</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[#00e5ff]/10 text-[#00e5ff]">
            <RefreshCw size={22} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Instant Code Delivery</h4>
            <p className="text-xs text-gray-400 mt-0.5">Delivered directly via chat</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[#7000ff]/10 text-[#7000ff]">
            <MessageCircle size={22} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Local Iraq Support</h4>
            <p className="text-xs text-gray-400 mt-0.5">Fast replies in Kurdish & Arabic</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-yellow-500/10 text-yellow-500">
            <Award size={22} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">No. 1 in Kurdistan</h4>
            <p className="text-xs text-gray-400 mt-0.5">Most trusted gaming shop</p>
          </div>
        </div>
      </div>

      {/* Middle links section */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <Link to="/" className="text-lg font-black tracking-wider text-white flex items-center gap-2">
            <span className="bg-gradient-to-r from-[#00e5ff] via-[#0066ff] to-[#7000ff] bg-clip-text text-transparent">DANO STORE</span>
          </Link>
          <p className="text-xs text-gray-400 mt-4 leading-relaxed max-w-sm">
            Dano Store is Kurdistan's premier gaming hub, offering secure, legal top-ups, paid Steam/console games, digital gift cards, and premium subscriptions. Experience top-tier service tailored for gamers in Iraq.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {/* Accepted payment methods badges */}
            <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Payments:</span>
            <span className="text-xs font-semibold text-white bg-[#e2136e]/20 border border-[#e2136e]/30 px-2 py-0.5 rounded">FastPay</span>
            <span className="text-xs font-semibold text-white bg-[#00e5ff]/20 border border-[#00e5ff]/30 px-2 py-0.5 rounded">Korek</span>
            <span className="text-xs font-semibold text-white bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded">MasterCard</span>
          </div>
        </div>

        <div>
          <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Quick Navigation</h5>
          <ul className="space-y-2.5 text-xs">
            <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">Browse Products</Link></li>
            <li><Link to="/products?category=mobile" className="text-gray-400 hover:text-white transition-colors">Mobile Top-Ups</Link></li>
            <li><Link to="/products?category=giftcards" className="text-gray-400 hover:text-white transition-colors">Digital Gift Cards</Link></li>
            <li><Link to="/products?category=subscriptions" className="text-gray-400 hover:text-white transition-colors">Subscriptions</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Admin Area</h5>
          <ul className="space-y-2.5 text-xs">
            <li><Link to="/admin-login" className="text-gray-400 hover:text-white transition-colors">Admin Login</Link></li>
            <li><Link to="/admin" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link></li>
          </ul>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="bg-[#050505] py-6 border-t border-[#1a1e29]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Dano Store. All rights reserved. Handcrafted for Kurdish & Iraqi gamers.
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
