import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#030308] border-t border-[#111122] mt-20 text-xs text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          <div className="md:col-span-2">
            <span className="text-xl font-extrabold uppercase bg-gradient-to-r from-[#00e5ff] to-[#7000ff] bg-clip-text text-transparent">
              Dano Store
            </span>
            <p className="mt-4 text-gray-500 max-w-sm leading-relaxed">
              Dano Store is Kurdistan's premier digital gaming store. We provide top-ups, game CD-Keys, official gift cards, and popular premium subscriptions securely and at the best rates.
            </p>
          </div>

          <div>
            <h4 className="font-extrabold text-white uppercase tracking-wider mb-4 text-[11px]">Quick Nav</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition-premium">Home</Link></li>
              <li><Link to="/products" className="hover:text-white transition-premium">Browse All Store</Link></li>
              <li><Link to="/products?category=mobile" className="hover:text-white transition-premium">Mobile Diamonds & UC</Link></li>
              <li><Link to="/products?category=subscriptions" className="hover:text-white transition-premium">Subscriptions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-white uppercase tracking-wider mb-4 text-[11px]">Direct Support</h4>
            <p className="text-gray-500 leading-relaxed mb-4">
              Our automated setup is manual payment. Complete checkout, copy order reference, and contact customer care.
            </p>
            <div className="flex gap-2 text-white">
              <span className="bg-[#120033] border border-[#7000ff]/30 px-2 py-1 rounded text-[10px] font-bold uppercase">FastPay</span>
              <span className="bg-[#002244] border border-[#0066ff]/30 px-2 py-1 rounded text-[10px] font-bold uppercase">Korek</span>
              <span className="bg-neutral-800 border border-neutral-700 px-2 py-1 rounded text-[10px] font-bold uppercase">MasterCard</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#111122]/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-[11px]">
          <p>© {new Date().getFullYear()} Dano Store Kurdistan. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-gray-300">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-gray-300">Terms of Service</span>
            <span>•</span>
            <Link to="/admin" className="hover:text-gray-300">Admin Area</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
