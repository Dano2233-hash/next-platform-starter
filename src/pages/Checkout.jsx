import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart.jsx';
import CheckoutForm from '../components/CheckoutForm.jsx';
import { formatPrice } from '../utils/formatPrice.js';
import { ShoppingBag, ChevronLeft, ShieldCheck, Zap } from 'lucide-react';

export const Checkout = () => {
  const { cart, cartTotal, cartCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
        <h2 className="text-2xl font-extrabold text-white">Your Cart is Empty</h2>
        <p className="text-xs text-gray-400">
          Please add products to your cart before proceeding to checkout.
        </p>
        <Link
          to="/products"
          className="px-5 py-2.5 bg-cyan-500 text-gray-950 font-black text-xs rounded-xl"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-cyan-400 transition-colors mb-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Return to Cart</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Checkout & Order Confirmation
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Complete your information and select your preferred local payment method.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 xl:col-span-8">
          <CheckoutForm />
        </div>

        {/* Right Column: Order Summary Sidebar */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          <div className="bg-[#080d1e] border border-gray-800 rounded-2xl p-6 space-y-6 sticky top-24 shadow-2xl">
            <h3 className="text-lg font-bold text-white flex items-center justify-between border-b border-gray-800 pb-3">
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-cyan-400" />
                Order Items
              </span>
              <span className="text-xs font-semibold text-gray-400">
                {cartCount} {cartCount === 1 ? 'item' : 'items'}
              </span>
            </h3>

            {/* Item List */}
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={item.itemKey}
                  className="flex items-center justify-between text-xs py-2 border-b border-gray-800/50"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-white line-clamp-1">{item.productName}</div>
                    {item.packageName && (
                      <div className="text-[10px] text-cyan-400 font-semibold">
                        {item.packageName}
                      </div>
                    )}
                    <div className="text-[10px] text-gray-400">Qty: {item.quantity}</div>
                  </div>
                  <div className="font-extrabold text-cyan-300">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Total Row */}
            <div className="pt-3 border-t border-gray-800 space-y-2">
              <div className="flex justify-between text-xs text-gray-300">
                <span>Subtotal:</span>
                <span className="font-bold text-white">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-300">
                <span>Digital Delivery Fee:</span>
                <span className="font-bold text-emerald-400">0 IQD (Instant)</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-gray-800">
                <span className="text-sm font-bold text-white">Total Amount:</span>
                <span className="text-2xl font-black text-cyan-400">
                  {formatPrice(cartTotal)}
                </span>
              </div>
            </div>

            {/* Badges Box */}
            <div className="p-4 bg-[#050814] border border-gray-800 rounded-xl space-y-2 text-xs text-gray-400">
              <div className="flex items-center gap-2 text-white font-bold">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Instant Digital Processing</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                After placing your order, send payment via FastPay, Korek, or MasterCard to complete delivery.
              </p>
              <div className="flex items-center gap-2 pt-1 border-t border-gray-800 text-[11px] text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" /> 100% Legal & Guaranteed
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
