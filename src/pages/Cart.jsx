import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="py-20 max-w-lg mx-auto text-center bg-[#090e1c] border border-slate-800 rounded-3xl p-8 shadow-2xl my-8">
        <ShoppingBag className="w-16 h-16 text-slate-700 mx-auto mb-4" />
        <h2 className="text-2xl font-black text-white font-['Rajdhani',sans-serif]">Your Cart is Empty</h2>
        <p className="text-sm text-slate-400 mt-2 mb-6">
          Looks like you haven't added any game keys, UC, or subscriptions yet.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-950"
        >
          <span>Browse Digital Store</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-['Rajdhani',sans-serif]">
            Shopping Cart ({totalItems} items)
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Review your selected digital packages before proceeding to manual payment.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-400 hover:text-red-300 font-semibold"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Item List */}
        <div className="lg:col-span-8 space-y-3">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="p-4 rounded-2xl bg-[#090e1c] border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg hover:border-slate-700 transition-all"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-slate-800">
                  <ProductImage
                    image={item.image}
                    name={item.name}
                    category={item.category}
                    platform={item.platform}
                    type={item.type}
                    height="h-full"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                    {item.platform} • {item.type}
                  </span>
                  <h3 className="font-bold text-white text-sm sm:text-base">{item.name}</h3>
                  <p className="text-xs text-slate-300 font-medium">
                    Package: {item.selectedPackage ? item.selectedPackage.name : 'Standard'}
                  </p>
                  <p className="text-xs font-black text-cyan-400 mt-1">
                    {formatPrice(item.price)} each
                  </p>
                </div>
              </div>

              {/* Counter & Subtotal */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                <div className="flex items-center border border-slate-700 bg-slate-900 rounded-xl p-1">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="p-1 text-slate-300 hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="p-1 text-slate-300 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-[5rem]">
                  <span className="text-sm font-extrabold text-white block">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="text-[11px] text-red-400 hover:text-red-300 inline-flex items-center gap-1 mt-0.5"
                  >
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold pt-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Order Summary Card */}
        <div className="lg:col-span-4 bg-[#090e1c] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-white font-['Rajdhani',sans-serif]">
            Order Summary
          </h3>

          <div className="space-y-2.5 text-xs text-slate-300 border-b border-slate-800 pb-4">
            <div className="flex justify-between">
              <span>Items Total:</span>
              <span className="text-white font-semibold">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span>Digital Key Transfer:</span>
              <span className="text-emerald-400 font-semibold">FREE (Manual Online)</span>
            </div>
            <div className="flex justify-between">
              <span>Service Fee:</span>
              <span className="text-white font-semibold">0 IQD</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-base font-black text-white">
            <span>Total Payable:</span>
            <span className="text-cyan-400 text-xl font-black">
              {formatPrice(totalPrice)}
            </span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/60 transition-all active:scale-95"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-slate-500 text-center">
            🔒 Kurdistan & Iraq Manual Transfer: FastPay, Korek, or MasterCard.
          </p>
        </div>
      </div>
    </div>
  );
}
