import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Zap } from 'lucide-react';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto space-y-4">
        <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-600">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-white">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400">
          Browse our extensive catalog of mobile top-ups, paid Steam games, gift cards, and premium subscriptions.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs transition-colors"
        >
          <span>Explore Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Shopping Cart</h1>
          <p className="text-xs text-slate-400 mt-1">
            Review your digital items before proceeding to manual checkout.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-400 hover:text-red-300 font-bold self-start sm:self-auto cursor-pointer flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All Items</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Item Listing */}
        <div className="lg:col-span-8 space-y-3">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="p-4 rounded-2xl bg-[#090d1a] border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-20 h-20 shrink-0">
                  <ProductImage
                    image={item.image}
                    name={item.name}
                    category={item.category}
                    platform={item.platform}
                    heightClass="h-20"
                  />
                </div>

                <div className="min-w-0">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                    {item.platform}
                  </span>
                  <h3 className="font-bold text-white text-base mt-1 truncate">
                    {item.name}
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Package: <strong className="text-slate-200">{item.packageName}</strong>
                  </div>
                  <div className="text-xs text-cyan-400 font-extrabold mt-1">
                    {formatPrice(item.unitPrice)} each
                  </div>
                </div>
              </div>

              {/* Controls & Price */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-slate-700 rounded-lg bg-slate-900">
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      className="p-1.5 hover:text-cyan-400 text-slate-400 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2 text-xs font-bold text-white min-w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      className="p-1.5 hover:text-cyan-400 text-slate-400 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="p-1.5 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <span className="font-black text-base text-white">
                  {formatPrice(item.unitPrice * item.quantity)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-4 bg-[#090d1a] border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-black text-white text-lg">Order Summary</h3>

          <div className="space-y-2.5 text-xs border-b border-slate-800 pb-4">
            <div className="flex justify-between text-slate-400">
              <span>Total Items</span>
              <span className="font-bold text-white">{totalItems}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Delivery Fee</span>
              <span className="font-bold text-emerald-400">FREE (Instant Digital)</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Currency</span>
              <span className="font-bold text-cyan-400">IQD</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-base">
            <span className="font-bold text-slate-300">Total Price</span>
            <span className="font-black text-xl text-cyan-400">
              {formatPrice(totalPrice)}
            </span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-black font-extrabold text-sm transition-all shadow-lg shadow-cyan-950/40 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>

          <div className="pt-2 text-[11px] text-slate-500 space-y-1">
            <p className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Manual payment via FastPay, Korek, or MasterCard</span>
            </p>
            <p className="flex items-center gap-1 text-slate-400">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Instant order verification upon WhatsApp/Discord confirmation</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
