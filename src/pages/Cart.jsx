import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-gray-900 border border-gray-800 mx-auto flex items-center justify-center text-gray-500">
          <ShoppingBag className="w-10 h-10 text-cyan-400" />
        </div>
        <h2 className="text-2xl font-black text-white">Your Cart is Empty</h2>
        <p className="text-xs md:text-sm text-gray-400">
          Browse our digital catalog for games, game top-ups, and gift cards to populate your order.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20"
        >
          <span>Explore Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-gray-800">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white">Shopping Cart</h1>
          <p className="text-xs text-gray-400">Review your selected items before proceeding to manual checkout</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="p-4 rounded-2xl bg-[#090d18] border border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className="w-16 h-16 rounded-xl bg-gray-900 overflow-hidden shrink-0 border border-gray-800">
                  <img
                    src={item.product.image || undefined}
                    alt={item.product.name}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-white truncate">
                    {item.product.name}
                  </h3>
                  {item.selectedPackage && (
                    <span className="text-[10px] font-bold text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30 inline-block mt-0.5">
                      {item.selectedPackage.name}
                    </span>
                  )}
                  <div className="text-xs font-semibold text-gray-400 mt-1">
                    Platform: <span className="text-gray-200">{item.product.platform}</span>
                  </div>
                </div>
              </div>

              {/* Price & Quantity Adjuster */}
              <div className="flex items-center justify-between sm:justify-end space-x-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-800">
                <div className="text-right">
                  <span className="text-sm font-extrabold text-white block">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                  <span className="text-[10px] text-gray-500">
                    {formatPrice(item.unitPrice)} each
                  </span>
                </div>

                <div className="flex items-center space-x-2 bg-[#050811] rounded-xl border border-gray-800 p-1">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="w-6 h-6 rounded-lg bg-gray-800 text-gray-300 hover:text-white flex items-center justify-center cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold text-white px-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="w-6 h-6 rounded-lg bg-gray-800 text-gray-300 hover:text-white flex items-center justify-center cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="text-gray-500 hover:text-red-400 p-1 cursor-pointer"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <Link
            to="/products"
            className="inline-flex items-center space-x-2 text-xs font-bold text-gray-400 hover:text-cyan-400 transition-colors pt-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-4">
          <div className="p-6 rounded-3xl bg-[#090d18] border border-gray-800 space-y-5 sticky top-24">
            <h3 className="text-base font-bold text-white pb-3 border-b border-gray-800">
              Order Summary
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Items Subtotal</span>
                <span className="text-white font-semibold">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Delivery Fee</span>
                <span className="text-emerald-400 font-bold">FREE (Digital)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800 flex justify-between items-baseline">
              <span className="text-sm font-bold text-white">Total Amount</span>
              <span className="text-xl font-black text-cyan-400">{formatPrice(cartTotal)}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
