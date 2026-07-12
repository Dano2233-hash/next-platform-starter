import React from 'react';
import { Link } from 'react-router-dom';
import { Send, CreditCard } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy-900 border-t border-white/10 pt-12 pb-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="text-2xl font-bold text-accent-cyan flex items-center mb-4">
              Dano <span className="text-white ml-1">Store</span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Your premier destination for digital games, top-ups, and gift cards in Kurdistan and Iraq. Fast, reliable, and secure.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent-blue hover:text-white transition-all">
                <span className="font-bold text-xs">FB</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent-cyan hover:text-white transition-all">
                <span className="font-bold text-xs">X</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent-purple hover:text-white transition-all">
                <span className="font-bold text-xs">IG</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/products" className="hover:text-accent-cyan">All Products</Link></li>
              <li><Link to="/products?category=Mobile" className="hover:text-accent-cyan">Mobile Top-Ups</Link></li>
              <li><Link to="/products?category=Gift Cards" className="hover:text-accent-cyan">Gift Cards</Link></li>
              <li><Link to="/products?category=Subscriptions" className="hover:text-accent-cyan">Subscriptions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-accent-cyan">Contact Us</a></li>
              <li><a href="#" className="hover:text-accent-cyan">How to Pay</a></li>
              <li><a href="#" className="hover:text-accent-cyan">Terms of Service</a></li>
              <li><a href="#" className="hover:text-accent-cyan">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">Get the latest deals and updates.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email address"
                className="bg-dark-700 border border-white/10 rounded-l-lg py-2 px-4 w-full text-sm focus:outline-none"
              />
              <button className="bg-accent-blue text-white p-2 rounded-r-lg hover:bg-blue-600">
                <Send size={18} />
              </button>
            </div>
            <div className="mt-6 flex items-center space-x-3 text-gray-400">
              <CreditCard size={24} />
              <div className="flex space-x-2 grayscale opacity-50">
                 {/* Payment Icons can go here */}
                 <span className="text-[10px] border border-white/20 px-1 rounded">FastPay</span>
                 <span className="text-[10px] border border-white/20 px-1 rounded">Korek</span>
                 <span className="text-[10px] border border-white/20 px-1 rounded">MasterCard</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Dano Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
