import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-navy-900 border-l border-white/10 shadow-2xl flex flex-col">
          <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <ShoppingBag size={20} className="text-accent-cyan" />
              Your Cart
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-gray-500">
                  <ShoppingBag size={32} />
                </div>
                <h3 className="text-white font-bold mb-1">Your cart is empty</h3>
                <p className="text-gray-500 text-sm mb-6">Looks like you haven't added any games yet.</p>
                <button
                  onClick={onClose}
                  className="bg-accent-blue hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-all"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.selectedPackage.name}`} className="flex gap-4">
                    <div className="w-20 h-20 bg-dark-700 rounded-lg overflow-hidden flex-shrink-0 border border-white/5">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-bold text-sm truncate">{item.name}</h4>
                      <p className="text-accent-cyan text-xs font-medium mb-2">{item.selectedPackage.name}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-white/5 rounded-md px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.selectedPackage.name, -1)}
                            className="text-gray-400 hover:text-white"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-white text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.selectedPackage.name, 1)}
                            className="text-gray-400 hover:text-white"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-white font-bold text-sm">{formatPrice(item.selectedPackage.price * item.quantity)}</span>
                          <button
                            onClick={() => removeFromCart(item.id, item.selectedPackage.name)}
                            className="text-red-500 hover:text-red-400 mt-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="px-6 py-6 border-t border-white/10 bg-dark-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 font-medium">Subtotal</span>
                <span className="text-white font-bold text-xl">{formatPrice(cartTotal)}</span>
              </div>
              <Link
                to="/checkout"
                onClick={onClose}
                className="block w-full bg-accent-blue hover:bg-blue-600 text-white text-center font-bold py-4 rounded-xl shadow-lg shadow-accent-blue/20 transition-all"
              >
                Checkout Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
