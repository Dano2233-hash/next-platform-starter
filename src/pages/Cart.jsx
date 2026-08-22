import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, ArrowLeft, Plus, Minus, ShieldCheck } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';

export const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="py-16 max-w-lg mx-auto text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 shadow-2xl">
          <ShoppingBag className="w-10 h-10 text-cyan-400" />
        </div>
        <div className="space-y-2">
          <h2 className="font-heading font-extrabold text-2xl text-white">Your Shopping Cart is Empty</h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Explore our gaming catalog for PUBG Mobile UC, Steam Keys, PlayStation Cards, and Subscriptions.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-slate-950 font-black text-xs rounded-2xl shadow-xl shadow-cyan-500/20"
        >
          <span>Browse All Games</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Shopping Cart ({cartItems.length} items)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review your selected digital items before proceeding to manual payment.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-red-400 text-xs font-bold rounded-xl transition-colors self-start sm:self-auto"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.cartItemId}
              className="p-4 bg-[#090e21] border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-slate-800">
                  <ProductImage
                    image={item.productImage}
                    title={item.productName}
                    category={item.category}
                    platform={item.platform}
                    className="w-full h-full"
                  />
                </div>

                <div className="space-y-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                    {item.platform || 'Digital'}
                  </span>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-white truncate">
                    {item.productName}
                  </h3>
                  {item.selectedPackage && (
                    <p className="text-xs text-cyan-300 font-semibold">
                      Package: {item.selectedPackage}
                    </p>
                  )}
                  <span className="text-xs text-slate-400 block sm:hidden">
                    Unit: {formatPrice(item.unitPrice)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-slate-800/80 pt-3 sm:pt-0">
                {/* Quantity Controls */}
                <div className="flex items-center gap-2 bg-[#050813] border border-slate-700/80 rounded-xl px-3 py-1.5">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, -1)}
                    className="text-slate-400 hover:text-cyan-400 p-0.5"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold text-white px-2 min-w-[20px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, 1)}
                    className="text-slate-400 hover:text-cyan-400 p-0.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[90px]">
                  <span className="text-sm font-black text-white font-heading">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="p-2 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 pt-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#090e21] border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl sticky top-24">
            <h3 className="font-heading font-extrabold text-lg text-white border-b border-slate-800 pb-3">
              Order Summary
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Items Subtotal</span>
                <span className="text-slate-200 font-bold">{formatPrice(cartTotal)}</span>
              </div>

              <div className="flex items-center justify-between text-slate-400">
                <span>Digital Delivery Fee</span>
                <span className="text-emerald-400 font-bold">FREE (Instant)</span>
              </div>

              <div className="flex items-center justify-between text-slate-400">
                <span>Supported Currency</span>
                <span className="text-cyan-400 font-bold">IQD Only</span>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-3 flex items-baseline justify-between">
              <span className="text-sm font-bold text-white">Total Amount</span>
              <span className="text-2xl font-black text-cyan-400 font-heading">
                {formatPrice(cartTotal)}
              </span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Proceed To Checkout</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Safe &amp; Secure Direct Kurdistan Transfer</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Cart;
