import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { formatPrice } from '../utils/formatPrice';

export function CartDrawer({ isOpen, onClose, cartItems, onUpdateQty, onRemove, totalPrice }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCheckoutClick = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#090d16] border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl">

          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white">Your Cart</h2>
              <span className="text-xs bg-slate-800 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-full font-bold">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-slate-400 font-medium text-sm">Your shopping cart is empty.</p>
                <button
                  onClick={onClose}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800"
                >
                  Browse Store
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.cartItemId}
                  className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl flex gap-3 items-center"
                >
                  <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden">
                    <ProductImage
                      src={item.image}
                      alt={item.name}
                      category={item.category}
                      platform={item.platform}
                      heightClass="h-16"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                    <p className="text-[11px] text-cyan-400 font-medium truncate">
                      Pkg: {item.packageName}
                    </p>
                    <p className="text-xs font-black text-slate-200 mt-1">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Quantity Controls & Remove */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => onRemove(item.cartItemId)}
                      className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-lg p-0.5">
                      <button
                        onClick={() => onUpdateQty(item.cartItemId, item.quantity - 1)}
                        className="w-5 h-5 flex items-center justify-center text-slate-300 hover:bg-slate-800 rounded text-xs font-bold"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-extrabold w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.cartItemId, item.quantity + 1)}
                        className="w-5 h-5 flex items-center justify-center text-slate-300 hover:bg-slate-800 rounded text-xs font-bold"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout CTA */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-slate-800 bg-slate-900/80 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-medium">Total Amount</span>
                <span className="text-lg font-black text-cyan-400">{formatPrice(totalPrice)}</span>
              </div>

              <button
                onClick={handleCheckoutClick}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold py-3 rounded-xl shadow-lg shadow-cyan-950/50 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
