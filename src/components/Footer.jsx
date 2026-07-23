import React from 'react';
import { useNavigation } from '../hooks/useNavigation';

export function Footer() {
  const { navigate } = useNavigation();

  return (
    <footer className="bg-[#050505] border-t border-brand-border/60 text-gray-400 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <span
              onClick={() => navigate('#/')}
              className="text-lg font-black uppercase tracking-wider bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple bg-clip-text text-transparent cursor-pointer"
            >
              Dano Store
            </span>
            <p className="text-xs text-gray-500 leading-relaxed">
              Kurdistan and Iraq's premier digital gaming store. Get instant digital delivery, legal keys, subscriptions, and fast local top-ups.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-3">Store Navigation</h3>
            <ul className="space-y-2 text-xs">
              <li><a href="#/" className="hover:text-brand-cyan transition-colors">Home Storefront</a></li>
              <li><a href="#/products" className="hover:text-brand-cyan transition-colors">All Products</a></li>
              <li><a href="#/products?platform=mobile" className="hover:text-brand-cyan transition-colors">Mobile Top-Ups</a></li>
              <li><a href="#/products?platform=giftcard" className="hover:text-brand-cyan transition-colors">Gift Cards</a></li>
            </ul>
          </div>

          {/* Social / Contact Info */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-3">Support & Legal</h3>
            <ul className="space-y-2 text-xs">
              <li><span className="text-gray-500">Working Hours:</span> 9:00 AM - 11:00 PM</li>
              <li><span className="text-gray-500">Location:</span> Erbil, Kurdistan / Iraq</li>
              <li><a href="#/admin" className="hover:text-brand-cyan transition-colors">Merchant Portal (Admin)</a></li>
            </ul>
          </div>

          {/* Secure Payment Badges */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-3">Manual Payment Methods</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1.5 rounded-md bg-[#0d0d15] border border-brand-border/80 text-[10px] font-bold text-white tracking-wide">
                FastPay
              </span>
              <span className="px-2.5 py-1.5 rounded-md bg-[#0d0d15] border border-brand-border/80 text-[10px] font-bold text-white tracking-wide">
                Korek
              </span>
              <span className="px-2.5 py-1.5 rounded-md bg-[#0d0d15] border border-brand-border/80 text-[10px] font-bold text-white tracking-wide">
                MasterCard
              </span>
            </div>
            <p className="text-[10px] text-gray-500 mt-2">
              Secure, instant local payments. Manual payment verification completes within 10-30 minutes.
            </p>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-brand-border/30 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Dano Store. All rights reserved. Built for gamers in Kurdistan and Iraq.
          </p>
          <p className="text-[10px] text-gray-600">
            Dano Store is an independent digital marketplace. All game titles, brand marks, and CDN assets are properties of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
