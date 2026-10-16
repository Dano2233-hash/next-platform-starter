import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart.jsx';
import { formatPrice } from '../utils/formatPrice.js';
import { ProductImage } from '../components/ProductImage.jsx';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';

export const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4 bg-[#080d1a] border border-slate-800 rounded-3xl p-8">
        <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
          <ShoppingCart className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-100">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400">
          You haven't added any products or game top-ups to your cart yet.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 transition-colors shadow-md shadow-cyan-950/40"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-100">Shopping Cart</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Review your items before proceeding to payment selection
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-400 hover:text-rose-300 transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="md:col-span-7 space-y-4">
          {cart.map((item) => (
            <div
              key={item.cartId}
              className="bg-[#080d1a] border border-slate-800 rounded-2xl p-4 flex gap-4 items-center justify-between"
            >
              <div className="flex items-center gap-3 min-w-0">
                <ProductImage product={item.product} className="w-16 h-16 rounded-xl flex-shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-sm font-extrabold text-slate-100 truncate">
                    {item.product.name}
                  </h3>
                  {item.selectedPackage && (
                    <span className="text-xs font-bold text-cyan-400 block truncate">
                      {item.selectedPackage.name}
                    </span>
                  )}
                  <span className="text-xs font-black text-slate-200 block mt-1">
                    {formatPrice(item.price)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-slate-700 rounded-xl bg-slate-950">
                  <button
                    onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                    className="px-2.5 py-1 text-slate-300 hover:text-cyan-400 font-bold"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2 text-xs font-black text-slate-100">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                    className="px-2.5 py-1 text-slate-300 hover:text-cyan-400 font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.cartId)}
                  className="text-slate-500 hover:text-rose-400 p-1.5"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="md:col-span-5">
          <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-6 space-y-5 sticky top-24">
            <h3 className="text-base font-extrabold text-slate-100 border-b border-slate-800 pb-3">
              Order Summary
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Items Count</span>
                <span className="text-slate-200 font-bold">
                  {cart.reduce((sum, i) => sum + i.quantity, 0)} items
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Delivery Fee</span>
                <span className="text-emerald-400 font-bold">FREE (Instant Digital)</span>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-3 flex justify-between items-baseline">
              <span className="text-xs font-bold text-slate-300">Total Amount</span>
              <span className="text-2xl font-black text-cyan-400">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/50 transition-all cursor-pointer"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>Supported Manual Payments: FastPay, Korek, MasterCard</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
