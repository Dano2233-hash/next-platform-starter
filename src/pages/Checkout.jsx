import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, ShoppingBag, Zap } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CheckoutForm } from '../components/CheckoutForm';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export const Checkout = () => {
  const { cart, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#05070f] text-slate-100 flex flex-col justify-between">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
          <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
          <h2 className="text-xl font-bold text-slate-200">Your Cart is Empty</h2>
          <p className="text-xs text-slate-400">Please add items to your cart before proceeding to checkout.</p>
          <Link
            to="/products"
            className="inline-block px-5 py-2.5 bg-cyan-500 text-slate-950 font-black text-xs rounded-xl shadow-md"
          >
            Browse Products Catalog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070f] text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 flex-1 w-full">

        {/* Navigation Back */}
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cart</span>
        </Link>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 uppercase tracking-tight flex items-center gap-2.5">
            <ShieldCheck className="w-7 h-7 text-cyan-400" />
            <span>Manual Payment Checkout</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Complete your customer details and select FastPay, Korek, or MasterCard.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <CheckoutForm />
          </div>

          {/* Cart Summary Sidebar */}
          <div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 sticky top-24 shadow-xl">
              <h3 className="text-sm font-black text-slate-100 uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center justify-between">
                <span>Order Items</span>
                <span className="text-xs text-cyan-400 font-bold">{cart.length} items</span>
              </h3>

              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="flex items-center justify-between text-xs py-1 border-b border-slate-800/60">
                    <div className="min-w-0 pr-2">
                      <span className="font-extrabold text-slate-200 block truncate">{item.name}</span>
                      <span className="text-[10px] text-slate-400 block">
                        Qty: {item.quantity} {item.selectedPackage ? `(${item.selectedPackage.name})` : ''}
                      </span>
                    </div>
                    <span className="font-black text-cyan-300 flex-shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Delivery Method</span>
                  <span className="text-emerald-400 font-bold">Instant Code / Direct Top-Up</span>
                </div>
                <div className="flex justify-between items-baseline pt-2">
                  <span className="text-sm font-extrabold text-slate-100">Total IQD</span>
                  <span className="text-xl font-black text-cyan-300">{formatPrice(getCartTotal())}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};
