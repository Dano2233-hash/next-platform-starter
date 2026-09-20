import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-24 space-y-4">
        <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center text-slate-500">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-100">Your Shopping Cart is Empty</h2>
        <p className="text-slate-400 text-sm max-w-sm mx-auto">
          Explore our store catalog for PUBG UC, Free Fire Diamonds, Steam games, gift cards, and subscriptions.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-slate-950 font-black text-xs shadow-lg shadow-cyan-950"
        >
          <ArrowLeft className="w-4 h-4" /> Start Shopping Now
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 pt-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Shopping Cart</h1>
            <p className="text-xs text-slate-400">{totalItems} items selected for checkout</p>
          </div>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1.5 self-start sm:self-auto px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-800/40 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear Cart
        </button>
      </div>

      {/* Cart Items & Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="p-4 sm:p-5 rounded-2xl bg-[#080d1a] border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 flex-1">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover bg-slate-900 border border-slate-800 flex-shrink-0"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-950 border border-cyan-800/40 px-2 py-0.5 rounded">
                    {item.platform}
                  </span>
                  <h3 className="font-extrabold text-slate-100 text-sm">{item.name}</h3>
                  <div className="text-xs text-slate-400 font-medium">
                    Package: <span className="text-cyan-300 font-bold">{item.selectedPackageName}</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    Unit Price: {formatPrice(item.unitPrice)}
                  </div>
                </div>
              </div>

              {/* Quantity Controls & Actions */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-slate-800/80 pt-3 sm:pt-0">
                <div className="flex items-center border border-slate-800 rounded-xl bg-slate-900 p-1">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-700"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-black text-slate-100">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-700"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <div className="text-sm font-black text-cyan-300">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                  title="Remove Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4">
            <h3 className="text-base font-extrabold text-slate-100 border-b border-slate-800 pb-3">
              Order Summary
            </h3>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Items</span>
                <span className="font-bold text-slate-200">{totalItems}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Delivery Method</span>
                <span className="font-bold text-emerald-400">Instant Automated</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800 text-sm font-black">
                <span className="text-slate-100">Grand Total</span>
                <span className="text-cyan-300 text-base">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-cyan-950 cursor-pointer"
            >
              Proceed To Checkout <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
