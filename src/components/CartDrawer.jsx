import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from './ProductImage';

export default function CartDrawer() {
  const { cart, isDrawerOpen, setIsDrawerOpen, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();

  if (!isDrawerOpen) return null;

  const handleCheckout = () => {
    setIsDrawerOpen(false);
    navigate('/checkout');
  };

  const handleViewCart = () => {
    setIsDrawerOpen(false);
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#090d1a] border-l border-slate-800 flex flex-col shadow-2xl">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-cyan-400" />
              <h3 className="font-bold text-base text-white">Your Cart</h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400">
                {cartCount} items
              </span>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close cart drawer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-3 text-slate-600">
                  <ShoppingBag size={28} />
                </div>
                <h4 className="text-white font-semibold text-sm mb-1">Your cart is empty</h4>
                <p className="text-xs text-slate-400 max-w-xs mb-4">
                  Browse game top-ups, paid Steam keys, and gift cards to add items.
                </p>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex gap-3 items-center"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-950 border border-slate-800">
                    <ProductImage
                      product={{
                        name: item.name,
                        image: item.image,
                        category: item.category,
                        platform: item.platform,
                      }}
                      height="h-16"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-white truncate">{item.name}</h5>
                    <p className="text-[11px] text-cyan-400 font-semibold truncate">
                      {item.selectedPackage}
                    </p>
                    <span className="text-xs font-bold text-slate-300 font-mono">
                      {formatPrice(item.price)}
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-slate-400 hover:text-rose-400 transition-colors p-1"
                      title="Remove"
                    >
                      <Trash2 size={13} />
                    </button>
                    <div className="flex items-center gap-1.5 bg-slate-950 rounded-lg border border-slate-800 px-1 py-0.5">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="text-slate-400 hover:text-white p-0.5"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="text-xs font-bold text-slate-200 w-4 text-center font-mono">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="text-slate-400 hover:text-white p-0.5"
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#060a14] space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Subtotal</span>
                <span className="text-base font-bold text-white font-mono">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Estimated Processing</span>
                <span className="text-emerald-400 font-semibold">Instant / Free</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleViewCart}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 transition-colors text-center"
                >
                  View Full Cart
                </button>
                <button
                  onClick={handleCheckout}
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-950/50"
                >
                  <span>Checkout</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
