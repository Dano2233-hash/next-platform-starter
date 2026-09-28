import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';

export const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {cartItems.length} unique items in your cart
          </p>
        </div>

        {cartItems.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs font-bold text-red-400 hover:underline flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear Cart
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-[#090d1a] border border-slate-800 rounded-3xl">
          <ShoppingBag className="w-16 h-16 text-slate-600 mx-auto" />
          <h3 className="text-lg font-extrabold text-white">Your cart is empty</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Explore our store catalog to add game top-ups, Steam keys, gift cards, and subscriptions.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20"
          >
            <ArrowLeft className="w-4 h-4" /> Browse Catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.cartKey}
                className="bg-[#090d1a] border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <ProductImage
                    src={item.product?.image}
                    alt={item.product?.name}
                    category={item.product?.category}
                    platform={item.product?.platform}
                    className="w-20 h-20 shrink-0"
                  />

                  <div className="space-y-1">
                    <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase bg-slate-800 text-cyan-400 rounded">
                      {item.product?.platform || 'Digital'}
                    </span>
                    <h3 className="font-extrabold text-sm text-white">{item.product?.name}</h3>
                    <p className="text-xs text-slate-400 font-semibold">{item.packageName}</p>
                    <p className="text-xs font-black text-cyan-400 sm:hidden">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  {/* Quantity adjustment */}
                  <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
                    <button
                      onClick={() => updateQuantity(item.cartKey, -1)}
                      className="p-1.5 text-slate-400 hover:text-white"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-extrabold text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.cartKey, 1)}
                      className="p-1.5 text-slate-400 hover:text-white"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="hidden sm:block text-right min-w-[100px]">
                    <p className="text-sm font-black text-cyan-400">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {item.quantity} x {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.cartKey)}
                    className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Box */}
          <div className="lg:col-span-4">
            <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 space-y-6 sticky top-24 shadow-xl">
              <h3 className="font-extrabold text-base text-white border-b border-slate-800 pb-3">
                Order Summary
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Service Fee</span>
                  <span className="font-bold text-emerald-400">0 IQD (Free)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Estimated Delivery</span>
                  <span className="font-bold text-cyan-400">Instant (5-15 mins)</span>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                  <span className="font-extrabold text-sm text-white">Total Amount</span>
                  <span className="font-black text-xl text-cyan-400">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 px-6 rounded-2xl font-extrabold text-xs bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:opacity-95 text-white flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 active:scale-[0.99] transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Manual Payment via FastPay, Korek, MasterCard</span>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;
