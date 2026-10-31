import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from './ProductImage';

export default function CartDrawer() {
  const {
    cart,
    isDrawerOpen,
    setIsDrawerOpen,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalItems
  } = useCart();
  const navigate = useNavigate();

  if (!isDrawerOpen) return null;

  const handleCheckoutClick = () => {
    setIsDrawerOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#080d1a] border-l border-slate-800 shadow-2xl flex flex-col justify-between">

          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white font-['Rajdhani',sans-serif] tracking-wider">
                Shopping Cart ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 py-12">
                <ShoppingBag className="w-16 h-16 text-slate-700 mb-3 stroke-[1.2]" />
                <p className="text-base font-semibold text-slate-300">Your cart is empty</p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Discover digital game keys, UC, V-Bucks, and subscriptions in our catalog.
                </p>
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate('/products');
                  }}
                  className="mt-6 px-4 py-2 rounded-xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/40 text-xs font-bold hover:bg-cyan-600/30 transition-all"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-3 bg-[#0c1222] border border-slate-800/80 rounded-xl flex gap-3 items-center group"
                >
                  <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-slate-800">
                    <ProductImage
                      image={item.image}
                      name={item.name}
                      category={item.category}
                      platform={item.platform}
                      type={item.type}
                      height="h-16"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-200 truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-cyan-400 font-medium truncate">
                      {item.selectedPackage ? item.selectedPackage.name : 'Standard'}
                    </p>
                    <p className="text-xs font-extrabold text-white mt-1">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-slate-500 hover:text-red-400 transition-colors p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center border border-slate-700 bg-slate-900 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="px-2 py-1 text-slate-300 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold text-cyan-300">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="px-2 py-1 text-slate-300 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-[#060a14] space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Manual Delivery Fee</span>
                <span className="text-emerald-400 font-semibold">FREE (Digital)</span>
              </div>
              <div className="flex items-center justify-between text-base font-bold text-white pt-2 border-t border-slate-800">
                <span>Total Amount:</span>
                <span className="text-cyan-400 text-lg font-black">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <button
                onClick={handleCheckoutClick}
                className="w-full mt-3 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/50 transition-all active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center">
                <Link
                  to="/cart"
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-xs text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  View Full Cart Page
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
