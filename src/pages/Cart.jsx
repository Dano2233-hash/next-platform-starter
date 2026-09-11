import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck, Gamepad2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto my-16 text-center space-y-6 bg-[#0b0f19] border border-slate-800 rounded-3xl p-10 shadow-2xl">
        <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-600">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-white">Your Shopping Cart is Empty</h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            You haven't added any games, PUBG UC, gift cards, or subscriptions to your cart yet.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 text-slate-950 font-black text-sm shadow-lg shadow-cyan-500/20"
        >
          <Gamepad2 className="w-5 h-5 fill-slate-950" />
          <span>Explore Store Products</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">

      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Shopping <span className="text-cyan-400">Cart</span>
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Review your selected digital items before proceeding to instant payment.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-400 hover:text-rose-300 self-start sm:self-auto"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-3">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                    {item.platform}
                  </span>
                  <span className="text-xs text-slate-400 font-medium capitalize">{item.type}</span>
                </div>
                <Link to={`/product/${item.productId}`}>
                  <h3 className="font-bold text-white text-base hover:text-cyan-400 transition-colors">
                    {item.name}
                  </h3>
                </Link>
                {item.selectedPackage && (
                  <p className="text-xs text-cyan-300 font-bold">
                    Package: {item.selectedPackage}
                  </p>
                )}
                <p className="text-sm font-black text-cyan-400 pt-1">
                  {formatPrice(item.unitPrice)}
                </p>
              </div>

              {/* Quantity Controls & Line Total */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 border-slate-800/80 pt-3 sm:pt-0">
                <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, -1)}
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 text-xs font-bold text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, 1)}
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Total</span>
                  <span className="font-black text-sm text-white">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-slate-900 transition-colors"
                  title="Remove Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors pt-2"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 space-y-6 h-fit">
          <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3">
            Order Summary
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span>Total Items</span>
              <span className="font-bold text-white">{totalItems}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Delivery Fee</span>
              <span className="font-bold text-emerald-400">FREE (Digital)</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Payment Processing</span>
              <span className="font-bold text-slate-200">Local Transfer</span>
            </div>
            <div className="border-t border-slate-800 pt-3 flex items-center justify-between text-base">
              <span className="font-bold text-white">Total Amount</span>
              <span className="font-black text-cyan-400 text-xl">{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Fast, safe manual transfer via FastPay, Korek, and MasterCard.</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Cart;
