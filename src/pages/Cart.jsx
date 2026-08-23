import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export function Cart({ cartItems, onUpdateQuantity, onRemoveFromCart, onClearCart, totalPrice }) {
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="py-16 text-center max-w-md mx-auto space-y-4">
        <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold text-white">Your Shopping Cart is Empty</h2>
        <p className="text-xs text-slate-400">
          Looks like you haven't added any digital games or top-ups to your cart yet.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20"
        >
          <span>Explore Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white">Shopping Cart</h1>
          <p className="text-xs text-slate-400 mt-1">Review your items before proceeding to checkout.</p>
        </div>
        <button
          onClick={onClearCart}
          className="text-xs font-semibold text-slate-400 hover:text-red-400 flex items-center gap-1 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.cartItemId}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center gap-4 justify-between"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-16 h-16 rounded-xl bg-slate-950 overflow-hidden border border-slate-800 flex-shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-black text-cyan-400 text-sm bg-gradient-to-br from-slate-900 to-indigo-950">
                      DS
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white">{item.productName}</h3>
                  <p className="text-xs text-cyan-400 font-medium">{item.selectedPackage?.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{formatPrice(item.unitPrice)} each</p>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 border-slate-800 pt-3 sm:pt-0">
                <div className="flex items-center border border-slate-800 rounded-xl bg-slate-950">
                  <button
                    onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-white">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <span className="text-sm font-black text-white w-24 text-right">
                  {formatPrice(item.unitPrice * item.quantity)}
                </span>

                <button
                  onClick={() => onRemoveFromCart(item.cartItemId)}
                  className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl sticky top-24">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Cart Summary</h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Total Items</span>
                <span className="font-bold text-slate-200">{cartItems.reduce((s, i) => s + i.quantity, 0)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="font-bold text-slate-200">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-white pt-3 border-t border-slate-800">
                <span>Total Amount</span>
                <span className="text-cyan-400 text-base">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all uppercase tracking-wider"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-1.5 w-full text-center text-xs font-semibold text-slate-400 hover:text-white pt-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
