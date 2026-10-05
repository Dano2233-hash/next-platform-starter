import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="py-16 text-center space-y-4 max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-100">Your Cart is Empty</h2>
        <p className="text-slate-400 text-xs">
          Explore our collection of games, PUBG UC, top-ups, and gift cards to add items to your cart.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse All Products</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <ShoppingBag className="w-6 h-6 text-cyan-400" />
          <h1 className="text-2xl font-extrabold text-slate-100">Shopping Cart</h1>
          <span className="text-xs bg-cyan-950 text-cyan-300 font-bold px-2.5 py-1 rounded-full border border-cyan-500/30">
            {cart.length} {cart.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-semibold text-slate-400 hover:text-red-400 transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-3">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden border border-slate-800">
                  <ProductImage
                    src={item.image}
                    alt={item.productName}
                    category={item.category}
                    platform={item.platform}
                    type={item.type}
                    className="h-20"
                  />
                </div>

                <div>
                  <h3 className="font-bold text-slate-100 text-sm">{item.productName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-semibold text-cyan-400">{item.packageName}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-[11px] text-slate-400">{item.platform}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-400 mt-1">
                    Unit Price: {formatPrice(item.price)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
                {/* Quantity Control */}
                <div className="flex items-center gap-1 bg-slate-950 rounded-xl border border-slate-800 px-2 py-1">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, -1)}
                    className="text-slate-400 hover:text-cyan-400 p-1"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold text-slate-100 px-2 min-w-[24px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, 1)}
                    className="text-slate-400 hover:text-cyan-400 p-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <span className="font-extrabold text-base text-cyan-300 min-w-[90px] text-right">
                  {formatPrice(item.price * item.quantity)}
                </span>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="text-slate-500 hover:text-red-400 transition-colors p-1"
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
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="font-extrabold text-slate-100 text-base pb-3 border-b border-slate-800">
              Order Summary
            </h3>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-slate-100">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Digital Delivery Fee</span>
                <span className="font-bold text-emerald-400">FREE (Instant)</span>
              </div>
              <div className="flex justify-between">
                <span>Accepted Payment</span>
                <span className="font-semibold text-cyan-400">FastPay / Korek / MasterCard</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
              <span className="font-bold text-slate-200 text-sm">Total Amount</span>
              <span className="font-black text-2xl text-cyan-400">{formatPrice(cartTotal)}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Safe & Manual Local Payment Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
