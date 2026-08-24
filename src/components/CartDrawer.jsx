import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/formatPrice';

export default function CartDrawer({ isOpen, onClose, cart = [], onUpdateQuantity, onRemoveFromCart, totalPrice = 0 }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCheckoutClick = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#090d16] border-l border-slate-800 text-slate-100 h-full flex flex-col justify-between z-10 shadow-2xl">

        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-cyan-400" />
            <h2 className="font-bold text-lg text-slate-100">Your Shopping Cart</h2>
            <span className="text-xs font-semibold bg-slate-800 text-cyan-400 px-2 py-0.5 rounded-full">
              {cart.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <p className="font-bold text-slate-200">Your cart is empty</p>
                <p className="text-xs text-slate-500 mt-1">Explore our games, top-ups and gift cards to add items.</p>
              </div>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartItemId}
                className="flex gap-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800 items-center justify-between"
              >
                {/* Product Thumbnail */}
                <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-slate-950 border border-slate-800">
                  <ProductImage
                    src={item.productImage}
                    name={item.productName}
                    category={item.category}
                    platform={item.platform}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-slate-100 line-clamp-1">{item.productName}</h4>
                  <p className="text-[11px] text-cyan-400 font-semibold mt-0.5">{item.selectedPackageName}</p>
                  <p className="text-xs font-extrabold text-slate-200 mt-1">{formatPrice(item.price)}</p>
                </div>

                {/* Controls & Actions */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    onClick={() => onRemoveFromCart(item.cartItemId)}
                    className="text-slate-500 hover:text-red-400 transition"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg">
                    <button
                      onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                      className="px-2 py-1 text-slate-400 hover:text-white transition"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 text-xs font-bold text-slate-100">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                      className="px-2 py-1 text-slate-400 hover:text-white transition"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer Summary */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-slate-800 bg-slate-950/80 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400 font-medium">Total Amount:</span>
              <span className="text-xl font-extrabold text-cyan-300">{formatPrice(totalPrice)}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onClose();
                  navigate('/cart');
                }}
                className="py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition"
              >
                View Full Cart
              </button>
              <button
                onClick={handleCheckoutClick}
                className="py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-1.5 transition"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
