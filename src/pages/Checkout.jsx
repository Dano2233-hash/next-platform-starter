import React from 'react';
import { useCart } from '../hooks/useCart';
import CheckoutForm from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export default function Checkout() {
  const { cart, getCartTotal } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">

      {/* Title block */}
      <div className="space-y-2 mb-8 text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-white">
          Manual Checkout Invoice
        </h1>
        <p className="text-sm text-gray-400">
          Enter your gamer credentials and choose a payment wallet to complete your manual purchase.
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-[#080811] border border-white/5 rounded-3xl p-8">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto text-gray-500">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">Your cart is currently empty</h3>
            <p className="text-gray-400 text-xs mt-1">
              Add premium games or game top-ups to your cart before proceeding to checkout!
            </p>
          </div>
          <a
            href="/products"
            className="inline-block bg-[#111122] hover:bg-[#1a1a36] border border-white/10 text-gray-200 text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-xl"
          >
            Go Catalog
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Grid: Checkout Form (7 Columns) */}
          <div className="lg:col-span-7">
            <CheckoutForm />
          </div>

          {/* Right Grid: Order Summary Invoice Card (5 Columns) */}
          <div className="lg:col-span-5 bg-[#080811] border border-white/5 rounded-2xl p-6 space-y-5 sticky top-24">
            <h3 className="text-white font-bold text-base uppercase tracking-wider border-b border-white/5 pb-3">
              Order Summary Invoice
            </h3>

            {/* Cart products listing */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
              {cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedPackage}-${idx}`}
                  className="flex items-center gap-3 bg-[#0c0c16] border border-white/5 p-2 rounded-xl"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-950 flex-shrink-0">
                    <ProductImage product={item.product} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-white text-xs font-bold truncate">{item.product.name}</h5>
                    <div className="text-[10px] font-semibold text-cyan-400">
                      Option: {item.selectedPackage}
                    </div>
                    <div className="text-[10px] text-gray-400">Qty: {item.quantity}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-xs font-black text-white">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing details */}
            <div className="space-y-2 border-t border-white/5 pt-4">
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>Total Items</span>
                <span className="text-white font-bold">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)} items
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>Shipping / Activation Fee</span>
                <span className="text-emerald-400 font-bold">FREE DELIVERY</span>
              </div>
              <div className="flex justify-between items-center border-t border-white/5 pt-3">
                <span className="text-sm font-bold text-white uppercase">Grand Total (IQD)</span>
                <span className="text-lg font-black text-cyan-400">
                  {formatPrice(getCartTotal())}
                </span>
              </div>
            </div>

            {/* Back button */}
            <a
              href="/cart"
              className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl border border-white/5 hover:bg-white/5 text-gray-400 hover:text-white text-xs font-bold uppercase transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Modify Cart Items</span>
            </a>

          </div>

        </div>
      )}

    </div>
  );
}
