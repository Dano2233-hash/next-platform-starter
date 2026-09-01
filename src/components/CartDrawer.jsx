import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import { ProductVisual } from './ProductVisual';

export const CartDrawer = () => {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartSubtotal, totalItemsCount } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#05091e] border-l border-cyan-900/40 text-slate-100 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-cyan-900/30 flex items-center justify-between bg-[#080e2b]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white">Your Cart</h2>
              <span className="text-xs bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/30 font-mono">
                {totalItemsCount} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-slate-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-200">Your cart is empty</h3>
                  <p className="text-xs text-slate-400 mt-1">Explore our catalog for top games and gift cards.</p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold hover:bg-cyan-500/20 transition-all"
                >
                  Browse Store
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.cartKey}
                  className="bg-[#091032] border border-cyan-900/30 rounded-xl p-3 flex gap-3 relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-[#05091c]">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <ProductVisual name={item.name} category={item.category} platform={item.platform} />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-100 truncate">{item.name}</h4>
                    <p className="text-[11px] text-cyan-400 font-medium">{item.selectedPackage.name}</p>
                    <div className="text-xs font-bold text-white mt-1">
                      {formatPrice(item.unitPrice)}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.cartKey, -1)}
                        className="w-6 h-6 rounded bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-700 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold font-mono px-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartKey, 1)}
                        className="w-6 h-6 rounded bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-700 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Trash */}
                  <button
                    onClick={() => removeFromCart(item.cartKey)}
                    className="text-slate-500 hover:text-rose-400 p-1 self-start transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout Button */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-cyan-900/30 bg-[#070c24] space-y-4">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-slate-300">Total Price:</span>
                <span className="text-lg text-cyan-400">{formatPrice(cartSubtotal)}</span>
              </div>
              <p className="text-[11px] text-slate-400 text-center">
                Manual local payment via FastPay, Korek, or MasterCard at checkout.
              </p>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="py-3 px-4 rounded-xl bg-slate-900 text-slate-200 text-xs font-bold text-center border border-slate-700 hover:bg-slate-800"
                >
                  View Full Cart
                </Link>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/checkout');
                  }}
                  className="py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
