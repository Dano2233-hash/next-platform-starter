import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';

export function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">Your Cart is Empty</h2>
        <p className="text-sm text-slate-400">
          Looks like you haven’t added any games or top-up packages to your cart yet.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-bold text-sm shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Start Shopping</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">

      {/* Title */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Shopping Cart</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review your digital items before proceeding to checkout ({totalItems} items).
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-rose-400 hover:text-rose-300 transition-colors"
        >
          Clear all items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Cart items list */}
        <div className="lg:col-span-8 space-y-3">
          {cart.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center gap-4 justify-between"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-slate-950">
                  <ProductImage
                    image={item.product.image}
                    name={item.product.name}
                    category={item.product.category}
                    platform={item.product.platform}
                    containerClassName="w-full h-full"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400 uppercase">
                      {item.product.platform}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-purple-400 uppercase">
                      {item.product.type}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-white">{item.product.name}</h3>
                  {item.selectedPackage && (
                    <span className="text-xs text-cyan-400 font-semibold block mt-0.5">
                      Edition: {item.selectedPackage.name}
                    </span>
                  )}
                  <span className="text-xs text-slate-400 mt-1 block">
                    Unit: {formatPrice(item.price)}
                  </span>
                </div>
              </div>

              {/* Controls & Price */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                {/* Quantity */}
                <div className="flex items-center bg-slate-950 rounded-lg border border-slate-800 p-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 hover:text-cyan-400 text-slate-400"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold px-3 text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 hover:text-cyan-400 text-slate-400"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[90px]">
                  <span className="font-extrabold text-sm text-white block">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <h3 className="font-bold text-base text-white border-b border-slate-800 pb-3">
            Order Summary
          </h3>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-semibold">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="text-emerald-400 font-semibold">Free (Digital Delivery)</span>
            </div>
            <div className="flex justify-between">
              <span>Currency</span>
              <span className="font-semibold text-slate-200">IQD Only</span>
            </div>
            <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline text-sm">
              <span className="font-bold text-white">Estimated Total</span>
              <span className="text-xl font-black text-cyan-400">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400 justify-center">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>FastPay • Korek • MasterCard Supported</span>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Cart;
