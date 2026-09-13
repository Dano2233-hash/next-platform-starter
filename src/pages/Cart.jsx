import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { ProductImage } from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto my-12 p-12 bg-[#090e1a] border border-slate-800 rounded-3xl text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
          <ShoppingBag className="w-10 h-10 text-slate-600" />
        </div>
        <h2 className="text-2xl font-black text-white">Your Cart is Currently Empty</h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          Add some PUBG UC, paid games, gift cards, or subscriptions to your cart to begin.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider"
        >
          <span>Explore Store Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-cyan-400" /> Shopping Cart
        </h1>
        <button
          onClick={clearCart}
          className="text-xs text-red-400 hover:text-red-300 font-semibold hover:underline"
        >
          Clear All Items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="bg-[#090e1a] border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0 w-full sm:w-auto">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                  <ProductImage
                    image={item.product?.image}
                    name={item.product?.name}
                    category={item.product?.category}
                    platform={item.product?.platform}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-extrabold text-white truncate">{item.product?.name}</h3>
                  <span className="text-xs font-bold text-cyan-400 block mt-0.5">
                    Package: {item.packageName}
                  </span>
                  {item.accountDetails && (
                    <span className="text-[11px] text-slate-400 block mt-0.5 font-mono">
                      ID: {item.accountDetails}
                    </span>
                  )}
                  <span className="text-xs text-slate-400 mt-1 block">
                    Unit Price: {formatPrice(item.price)}
                  </span>
                </div>
              </div>

              {/* Quantity Controls & Price */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/60">
                <div className="flex items-center gap-3 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="text-slate-400 hover:text-white text-xs font-bold"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold text-white min-w-[16px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="text-slate-400 hover:text-white text-xs font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-sm font-black text-cyan-400 block">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="text-[11px] text-slate-500 hover:text-red-400 flex items-center gap-1 justify-end mt-0.5"
                  >
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-[#090e1a] border border-slate-800 rounded-2xl p-6 space-y-4 sticky top-24">
            <h3 className="text-base font-extrabold text-white border-b border-slate-800/80 pb-3">
              Order Summary
            </h3>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Subtotal ({cart.length} items)</span>
                <span className="font-semibold text-slate-100">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Digital Delivery</span>
                <span className="text-emerald-400 font-semibold">FREE (Instant)</span>
              </div>
              <div className="flex justify-between text-base font-black text-white pt-3 border-t border-slate-800">
                <span>Total Amount</span>
                <span className="text-cyan-400">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Manual verification via FastPay / Korek / MasterCard</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
