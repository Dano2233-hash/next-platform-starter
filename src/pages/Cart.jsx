import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="py-16 text-center space-y-4 max-w-md mx-auto">
        <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600 mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-black text-white">Your Shopping Cart is Empty</h2>
        <p className="text-xs text-slate-400">
          You have not added any digital games, top-ups, or gift cards to your cart yet.
        </p>
        <Link
          to="/products"
          className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:from-cyan-500 hover:to-blue-500 transition-all"
        >
          Explore Store
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-cyan-400" /> Shopping Cart
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Review your selected digital items before proceeding to instant checkout.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-semibold text-slate-500 hover:text-red-400 flex items-center gap-1 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item, idx) => (
            <div
              key={`${item.product.id}-${item.selectedPackage?.name}-${idx}`}
              className="bg-[#090e1a] border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                  <ProductImage product={item.product} heightClass="h-16" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-100 truncate">
                    {item.product.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-cyan-400 font-semibold">
                      Package: {item.selectedPackage?.name}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase px-1.5 py-0.5 bg-slate-900 rounded border border-slate-800">
                      {item.product.platform}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-300 block mt-1">
                    Unit Price: {formatPrice(item.unitPrice)}
                  </span>
                </div>
              </div>

              {/* Quantity Controls & Remove */}
              <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-0 border-slate-800/80 pt-3 sm:pt-0">
                <div className="flex items-center border border-slate-700 bg-slate-950 rounded-lg">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.selectedPackage?.name, -1)}
                    className="px-2.5 py-1 text-slate-400 hover:text-white font-bold text-xs"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-black text-cyan-300">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.selectedPackage?.name, 1)}
                    className="px-2.5 py-1 text-slate-400 hover:text-white font-bold text-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-sm font-black text-white block">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedPackage?.name)}
                    className="text-[11px] text-slate-500 hover:text-red-400 transition-colors mt-0.5"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-4">
          <div className="bg-[#090e1a] border border-slate-800 rounded-2xl p-6 space-y-5 sticky top-24">
            <h2 className="font-extrabold text-slate-100 text-base border-b border-slate-800 pb-3">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Items Subtotal</span>
                <span className="font-semibold text-slate-200">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Digital Delivery Fee</span>
                <span className="font-semibold text-emerald-400">FREE</span>
              </div>
              <div className="border-t border-slate-800 pt-3 flex justify-between items-baseline">
                <span className="font-bold text-slate-200 text-sm">Total Amount</span>
                <span className="text-xl font-black text-cyan-400">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-cyan-950/50 flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </button>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-cyan-300">
                <ShieldCheck className="w-3.5 h-3.5" /> Instant Delivery Guaranteed
              </div>
              <p>Manual payment verification via FastPay, Korek, and MasterCard.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
