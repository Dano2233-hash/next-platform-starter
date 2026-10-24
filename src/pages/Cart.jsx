import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      <div>
        <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-100">
          Shopping Cart
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Review your selected digital packages before proceeding to local payment checkout.
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
            <ShoppingBag size={32} />
          </div>
          <h2 className="font-heading font-bold text-lg text-slate-200">Your cart is empty</h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            You haven't added any products to your cart yet. Explore our top-ups, Steam keys, and gift cards!
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-bold text-xs bg-cyan-500 text-slate-950 hover:bg-cyan-400"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-bold text-slate-400">
              <span>{cart.length} Item{cart.length !== 1 ? 's' : ''} in Cart</span>
              <button
                onClick={clearCart}
                className="text-red-400 hover:underline flex items-center gap-1"
              >
                <Trash2 size={12} /> Clear Cart
              </button>
            </div>

            {cart.map((item) => (
              <div
                key={item.cartItemId}
                className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <ProductImage
                    product={{
                      name: item.title,
                      image: item.image,
                      category: item.category,
                      platform: item.platform,
                      type: item.type
                    }}
                    className="w-20 h-20 shrink-0 rounded-xl"
                  />

                  <div>
                    <h3 className="font-heading font-bold text-slate-100 text-base">{item.title}</h3>
                    <p className="text-xs text-cyan-400 font-semibold mt-0.5">{item.packageName}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-slate-950 text-[10px] font-bold text-slate-400 border border-slate-800 rounded-md uppercase">
                      {item.platform} • {item.type}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-slate-800 pt-3 sm:pt-0">
                  {/* Quantity Controls */}
                  <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1">
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      className="p-1.5 text-slate-400 hover:text-white"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-3 text-xs font-bold text-slate-200">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      className="p-1.5 text-slate-400 hover:text-white"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <div className="font-heading font-black text-slate-100 text-base">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                    {item.quantity > 1 && (
                      <div className="text-[10px] text-slate-500">
                        {formatPrice(item.price)} each
                      </div>
                    )}
                  </div>

                  {/* Delete Item */}
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="font-heading font-extrabold text-lg text-slate-100">
                Order Summary
              </h3>

              <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="text-emerald-400 font-bold">FREE (Instant Digital)</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-slate-100 font-heading border-t border-slate-800 pt-4">
                <span className="font-bold text-sm">Total Amount</span>
                <span className="font-black text-xl text-cyan-400">{formatPrice(cartTotal)}</span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 px-4 rounded-xl font-heading font-extrabold text-sm bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400 flex items-center gap-3">
              <ShieldCheck className="text-emerald-400 shrink-0" size={20} />
              <span>Accepted manual payment methods: FastPay, Korek Cash & MasterCard.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
